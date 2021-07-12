import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'db', 'events.json');

export default async function handler(req, res) {
    const { url, method, query, body, headers } = req;
    console.log(
        'url =', url,
        '; method =', method,
        '; query =', query,
        //'; headers =', headers,
    ); // console.log

    if (req.method === 'GET') {
        const allEvents = getEvents();

        res.status(200).json({
            msg: `GET ${url}`,
            data: allEvents
        });
    } // if

    else if (req.method === 'POST') {
        console.log('; body =', body);
        
        saveEvent(body);
        
        res.status(200).json({ msg: `POST ${url}` });
    } // else

    else 
        res.status(200).json({ msg: `Response from ${url}` });
}

function getEvents() {
    const fileData = fs.readFileSync(filePath);
    return JSON.parse(fileData); 
}

function saveEvent(event) {
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    data.push(event);

    fs.writeFileSync( filePath, JSON.stringify(data) );
}