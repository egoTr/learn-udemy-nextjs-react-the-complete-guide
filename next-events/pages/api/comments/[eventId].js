import { MongoClient } from "mongodb";

const MONGO_CONNECTION_OPTIONS = {
    useUnifiedTopology: true
}

export default async function handler(req, res) {
    const { url, method, query, body, headers } = req;

    if (method === 'GET') {
        const { eventId } = query;

        getComments(res, eventId);
    } // if

    else if (method === 'POST')
        addComment(res, body);
}

async function getComments(res, eventId) {
    const client = await MongoClient.connect(process.env.MONGO_URL, MONGO_CONNECTION_OPTIONS);
    const db = client.db();

    try {
        const comments = await db.collection('comments')
            .find({ event: eventId })
            .sort({ id: -1 }) // show latest comments on top
            .toArray();

        return res.status(200).json({ comments });
    } catch(err) {
        console.log(err.message);
        return res.status(500).send('Internal server error');
    } finally {
        client.close();
    } // finally
}

async function addComment(res, comment) {
    const client = await MongoClient.connect(process.env.MONGO_URL, MONGO_CONNECTION_OPTIONS);
    const db = client.db();
    try {
        await db.collection('comments').insertOne(comment);
        return res.status(200).send('200');
    } catch(err) {
        console.log(err.message);
        return res.status(500).send('Internal server error');
    } finally {
        client.close();
    } // finally
}