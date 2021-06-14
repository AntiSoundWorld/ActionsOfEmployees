import express from "express";
import routes from "./src/routes/routes.js";
import path from 'path'
import http from "http";
import os from 'os';

const app = express();

const port = process.env.PORT || 9900;
const host = os.hostname();

const __dirname = path.resolve(path.dirname(''));
const viewsDir = path.join(__dirname, 'views');
const staticDir = path.join(__dirname, 'public');

app.use(express.static(staticDir));

app.set('views', viewsDir);
app.set("view engine", 'hbs');

routes(app);


// const server = http.createServer(app).listen(port, () => {
//     console.log('server running at http://' + host + ':' + port);
// }) ;

app.listen(port, () => {
    console.log(`Server has been runing on ${port} port`);
})