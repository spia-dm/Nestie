const mongoose = require('mongoose')
import { connect, Connection } from 'mongoose';

interface ConnectionState {
 isConnected: boolean;
}
const conn: ConnectionState = {
 isConnected: false,
};

export async function dbConnect(): Promise<void> {
 if (conn.isConnected) {
   return;
 }

 try {
   const db = await connect(process.env.MONGODB_URI);
   conn.isConnected = true;

   console.log('Mongodb connected to db');
 } catch (err) {
   console.error('Mongodb Error:', err.message);
 }
}

const connection: Connection = mongoose.connection;

connection.on('connected', () => console.log('Mongodb connected to db'));

connection.on('error', (err: any) => console.error('Mongodb Error:', err.message));
