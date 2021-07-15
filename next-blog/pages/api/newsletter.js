import { MongoClient } from "mongodb";
const MONGO_CONNECTION_OPTIONS = {
    useUnifiedTopology: true
}

export default async function handler(req, res) {
    const { url, method, query, body, headers } = req;

    if (method === 'POST')
        register(res, body);
}

async function register(res, email) {
    const client = await MongoClient.connect(process.env.MONGO_URL, MONGO_CONNECTION_OPTIONS);
    const db = client.db();
    try {
        await db.collection('newsletters').insertOne(email);
        return res.status(200).json({ msg: 'Registered successfully.' });
    } catch(err) {
        if (err.code === 11000) // unique index
            return res.status(422).json({ msg: 'Email existed.' });
        
        console.log(err.message);
        return res.status(500).send('Internal server error');
    } finally {
        client.close();
    } // finally
}