import { MongoClient } from "mongodb";

export const client = new MongoClient(`mongodb://root:root@localhost:27017`);
client.connect().catch(process.exit);
export const db = client.db();
