import express from "express";
import getRoutes from "./src/routes/getRoutes/getRoutes.js";
import postRoutes from "./src/routes/postRoutes/postRoutes.js";
import path from 'path'
import http from "http";
import os from 'os';
import cors from 'cors'
import bodyParser from "body-parser";

import dotenv from 'dotenv';
import startRequests from "./startRequests.js";
import { GetCommentsOfCommits } from "./src/collector/Requests/requestsTest/requestsTest.js";
import collectInformation from "./src/collector/GetInfo/collectInformation.js";
dotenv.config();

const app = express();

const port = process.env.PORT || 9901;
const host = os.hostname();

const __dirname = path.resolve(path.dirname(''));
const viewsDir = path.join(__dirname, 'views');
const staticDir = path.join(__dirname, 'public');

app.use(cors());
app.use(express.static(staticDir));
app.use(bodyParser.json());

app.set('views', viewsDir);
app.set("view engine", 'hbs');

getRoutes(app);
postRoutes(app);

collectInformation();
// startRequests();

const server = http.createServer(app).listen(port, () => {
    console.log('server running at http://' + host + ':' + port);
}) ;

// app.listen(port, () => {
//     console.log(`Server has been runing on ${port} port`);
// })