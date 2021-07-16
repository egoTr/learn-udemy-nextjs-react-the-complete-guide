import { MongoClient } from "mongodb";
const MONGO_CONNECTION_OPTIONS = {
    useUnifiedTopology: true
}

export default async function handler(req, res) {
    const { url, method, query, body, headers } = req;

    if (method === 'POST')
        register(res, body);
}

async function register(res, contactData) {
    const client = await MongoClient.connect(process.env.MONGO_URL, MONGO_CONNECTION_OPTIONS);
    const db = client.db();
    try {
        await db.collection('contacts').insertOne(contactData);
        return res.status(200).json({ msg: 'Success' });
    } catch(err) {
        console.log(err.message);
        return res.status(500).send('Internal server error');
    } finally {
        client.close();
    } // finally
}