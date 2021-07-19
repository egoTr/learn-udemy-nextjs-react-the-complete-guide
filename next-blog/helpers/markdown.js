import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import _ from 'lodash/collection';

const MARKDOWN_PATH = path.join(process.cwd(), '/_markdown-posts');
const POSTS_PER_PAGE = 3;

//* 2021.07.18
// Try-catch to handle in case file not exists or failed to read file
export function getPostData(filename) {
    const filePath = path.join(MARKDOWN_PATH, filename);
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        // data is meta-data
        const { data, content } = matter(fileContent);

        // get the alias
        const alias = filename.replace(/\.md$/, '');

        return {
            meta: data,
            content,
            alias,
            date: data.date // duplicated listing for _.orderBy()
        }
    } catch (err) {
        console.log(err.message);
        return null;
    } // catch
}

// Get all posts
// Show latest posts on top
export function getAllPosts() {
    const files = fs.readdirSync(MARKDOWN_PATH);

    const posts = files.map(file => getPostData(file));

    // sort posts by date DESC
    return _.orderBy(posts, ['date'], ['desc']);
}

// Get posts by page
// 10 posts per page
// Show latest posts on top
export function getPostsByPage(pageNumber = 1) {
    const posts = getAllPosts();
    const from = (pageNumber - 1) * POSTS_PER_PAGE;

    return posts.slice(from, POSTS_PER_PAGE);
}

export function getLatestPosts() {
    return getPostsByPage(1);
}
