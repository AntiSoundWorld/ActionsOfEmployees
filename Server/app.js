import express from "express";
import getRoutes from "./src/routes/getRoutes/getRoutes.js";
import postRoutes from "./src/routes/postRoutes/postRoutes.js";
import path from 'path'
import http from "http";
import os from 'os';
import cors from 'cors'
import bodyParser from "body-parser";

import dotenv from 'dotenv';
dotenv.config();

const app = express();

const port = process.env.PORT || 9900;
const host = os.hostname();

const __dirname = path.resolve(path.dirname(''));
const viewsDir = path.join(__dirname, 'views');
const staticDir = path.join(__dirname, 'public');

app.use(cors());
app.use(express.static(staticDir));
app.use(bodyParser.json());
// app.use(express.json({
//     type: ['application/json', 'text/plain']
// }))

app.set('views', viewsDir);
app.set("view engine", 'hbs');

getRoutes(app);
postRoutes(app);

// const server = http.createServer(app).listen(port, () => {
//     console.log('server running at http://' + host + ':' + port);
// }) ;

app.listen(port, () => {
    console.log(`Server has been runing on ${port} port`);
})