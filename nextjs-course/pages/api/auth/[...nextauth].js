import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { MongoClient } from "mongodb";
const MONGO_CONNECTION_OPTIONS = {
    useUnifiedTopology: true
}

export default NextAuth({
    session: {
        jwt: true
    },
    providers: [
        Providers.Credentials({
            async authorize(credentials) {
                const { usernameOrEmail, password } = credentials;

                const client = await MongoClient.connect(process.env.MONGO_URL, MONGO_CONNECTION_OPTIONS);
                const tblUsers = client.db().collection('users');

                // Find if username / email exists
                const user = await tblUsers.findOne({
                    $or: [
                        { username: usernameOrEmail },
                        { email: usernameOrEmail }
                    ]
                }, {
                    password: 0
                });

                client.close();

                // Check if user exists 
                if (!user)
                    throw new Error('User not found');

                // Check password
                if (user.password !== password)
                    throw new Error('Invalid password');

                // This really sucks :))))
                // next-auth fixes the return statement !!!!
                return {
                    name: user.username,
                    email: user.email,
                    image: null
                }
            } // authorize
        }) // Providers.Credentials
    ] // providers
})