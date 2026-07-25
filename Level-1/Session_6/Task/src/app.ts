import express from 'express'
import * as mongoose from 'mongoose'
import { log } from 'node:console';
const app = express();

const mongoDB_URI = "mongodb+srv://<ymad88679_db_user>:qNnbNv1uhRvGgHAb@cluster0.4okl6px.mongodb.net/?appName=Cluster0"
 mongoose.connect(mongoDB_URI).then(
    (ohYeah)=>{
        console.log(ohYeah);
    }
).catch((err) => console.error(err))

app.listen(3000, ()=> {
console.log("Server is listening on port 3000")
});




