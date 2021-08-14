import express from "express";
import path from "path";
import dotenv from "dotenv"
import http from "http";
import os from 'os';
import cors from 'cors'

const port = process.env.PORT || 9900;
const host = os.hostname();

const __dirname = path.resolve(path.dirname(''));

const corsOptions = {
    origin: "https://antisoundworld.atlassian.net"
}
  
const app = express();
app.use(cors());

app.use(express.static(__dirname + "/dist/"));

app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
});

// app.listen(port, () => {
//     console.log("server running on " + port);
// });

const server = http.createServer(app).listen(port, () => {
    console.log('server running at http://' + host + ':' + port);
}) ;
