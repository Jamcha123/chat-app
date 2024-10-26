import { Server } from 'socket.io';
import fs from 'fs';
import { createServer } from 'http';
import express from 'express';

const app = express()
app.use(express.static("web1"));
app.use(express.static("web2"));

app.get("/:file", (req, res) => {
    const {file} = req.params;
    fs.readFile(file, (err, data) => {
        if(err){
            res.writeHead(404, {'content-type': "text/html"});
            return res.end("404, not found");
        }        
        res.writeHead(200, {"content-type": "text/html"});
        res.write(data);
        res.end();
    })
})

const server = createServer(app);
server.listen(8080, () => console.log("http://127.0.0.1:8080/mess1.html"))

const io = new Server(server)
io.on("connect", (socket) => {
    socket.on("input", (msg) => {
        socket.emit("output", "" + msg + "");
    })
})