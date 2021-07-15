import _ from "lodash/collection";

const DUMMY_POSTS = [
    {
      alias: 'getting-started-with-nextjs',
      title: 'Getting Started with NextJS',
      image: 'getting-started-with-nextjs.png',
      excerpt:
        'NextJS is a the React framework for production - it makes building fullstack React apps and sites a breeze and ships with built-in SSR.',
      date: '2020-02-10',
      content: '# This is the first post'
    },
    {
      alias: 'getting-started-with-nextjs-2',
      title: 'Getting Started with NextJS',
      image: 'getting-started-with-nextjs-2.png',
      excerpt:
        'NextJS is a the React framework for production - it makes building fullstack React apps and sites a breeze and ships with built-in SSR.',
      date: '2020-06-05',
      content: '# This is the second post'
    },
    {
      alias: 'getting-started-with-nextjs-3',
      title: 'Getting Started with NextJS',
      image: 'getting-started-with-nextjs-3.png',
      excerpt:
        'NextJS is a the React framework for production - it makes building fullstack React apps and sites a breeze and ships with built-in SSR.',
      date: '2020-12-30',
      content: '# This is the third post'
    },
    {
      alias: 'getting-started-with-nextjs-4',
      title: 'Getting Started with NextJS',
      image: 'getting-started-with-nextjs-4.png',
      excerpt:
        'NextJS is a the React framework for production - it makes building fullstack React apps and sites a breeze and ships with built-in SSR.',
      date: '2021-02-14',
      content: '# This is the 4th post'
    },
  ];

  
  // Get all posts
  // Show latest posts on top
  export function getAllPosts() {
    return _.orderBy(DUMMY_POSTS, ['date'], ['desc']);
  } // getAllPosts

  // Get 10 latest posts
  // Show latest posts on top
  export function getLatestPosts() {
    const sortedDescPosts = _.orderBy(DUMMY_POSTS, ['date'], ['desc']);
    return sortedDescPosts.slice(0, 10);
  } // getLatestPosts

  export function getPostByAlias(alias) {
    return DUMMY_POSTS.find(post => post.alias === alias);
  }

  export default DUMMY_POSTS;