import { MongoClient } from "mongodb";
const MONGO_CONNECTION_OPTIONS = {
    useUnifiedTopology: true
}

import { getSession } from 'next-auth/client';

export default async function handler(req, res) {
    const { url, method, query, body, headers } = req;

    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
    // The PATCH method is used to apply partial modifications to a resource.
    if (method !== 'PATCH')
        return res.status(400).send('Bad request');

    const session = await getSession({ req });
    if (!session)
        return res.status(401).send('Unauthorized');

    changePassword(res, session.user.name, body); // user's name is unique
}

async function changePassword(res, username, cred) {
    const client = await MongoClient.connect(process.env.MONGO_URL, MONGO_CONNECTION_OPTIONS);
    const db = client.db();

    const user = await db.collection('users').findOne({ username });

    // If user not existed (ANYMORE), really ???
    if (!user) {
        client.close();
        return res.status(400).send('User not found');
    } // if

    // Check if current password is correct
    // TODO: implement using bcrypt
    if (user.password !== cred.passwordCurrent) {
        client.close();
        return res.status(400).send('Invalid password');
    } // if

    // Update new password
    await db.collection('users').findOneAndUpdate(
        { username },
        { $set: { password: cred.password } }
    );

    client.close();

    return res.status(200).send('Password updated successfully');
}