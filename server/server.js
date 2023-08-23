import express from 'express';
import bodyParser from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const server = express();
const env = dotenv.config();

env.error &&
(
    console.error("Error loading .env file:", env.error),
        process.exit(1)
);

server
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())

    .get("/health", (req, res) =>
        res.json({ "ServerHealth": "Server is up and running!" }))

    .listen(parseInt(process.env.PORT), () => console.log(`Listening : ${ process.env.PORT }`));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB is ready to serve."))
    .catch(err => console.error("MongoDB connection error:", err));
