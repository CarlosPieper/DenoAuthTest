import { MongoClient } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

const client = new MongoClient();

client.connectWithUri("mongodb+srv://dba:RD2T<Qje@cluster0.rloqj.gcp.mongodb.net/talktome?retryWrites=true&w=majority");

const db = client.database('talktome');

export default db;