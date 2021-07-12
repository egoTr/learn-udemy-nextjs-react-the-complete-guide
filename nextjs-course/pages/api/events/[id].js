import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'db', 'events.json');

export default async function handler(req, res) {
    const { url, method, query, body, headers } = req;

    if (req.method === 'GET') {
        const event = getEventDetails(query.id);

        res.status(200).json({
            event
        });
    } // if
    else 
        res.status(200).json({ msg: `Response from ${url}` });
}

function getEventDetails(id) {
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    
    return data.find(event => event.id === id);
}