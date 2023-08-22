import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const server = express();
const port = 5000;


server.get("/health", (req, res) => {
    res.json({ "ServerHealth": "Server is up and running!" });
});

mongoose.connect("mongodb://ivan:piper159951@127.0.0.1:27017")
    .then(() => {
        console.log("MongoDB is ready to serve.");
    });

server.listen(port, () => {
    console.log(`Listening : ${ port }`);
});
