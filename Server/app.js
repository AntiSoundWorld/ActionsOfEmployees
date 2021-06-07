import express from "express";
import http from "http";
import os from 'os';
import routes from "./src/routes/routes.js";
import path from 'path'
import bodyParser from "body-parser";

const app = express();
const host = os.hostname();

const port = 8080;

const __dirname = path.resolve(path.dirname(''));
const viewsDir = path.join(__dirname, 'views');
const staticDir = path.join(__dirname, 'public');

app.use(express.static(staticDir));

app.set('views', viewsDir);
app.set("view engine", 'hbs');

routes(app);

const server = http.createServer(app).listen(port, () => {
    console.log('server running at http://' + host + ':' + port);
}) ;
