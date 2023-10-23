import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb';

export default async function handler(req: NextApiRequest,res: NextApiResponse) {


    if (req.method === 'POST') {
        const  data  = req.body;
    
        const client = new MongoClient(process.env.MONGODB_URI, {});
    
        try {
          await client.connect();
          const database = client.db('local'); // Choose a name for your database
          const collection = database.collection('form'); // Choose a name for your collection
          await collection.insertOne({ data });    
          res.status(201).json({ message: 'Data saved successfully!' });
        } catch (error) {
          res.status(500).json({ message: 'Something went wrong!' });
        } finally {
          await client.close();
        }
      } else {
        res.status(405).json({ message: 'Method not allowed!' });
      }

}