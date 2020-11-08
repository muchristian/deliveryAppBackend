import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import allroutes from "./routes/index";
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(allroutes);

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`server port is running on ${server.address().port}`);
});
let io = require('socket.io').listen(server);
app.set('socketio', io);
io.sockets.on('connection', socket => {
  console.log("new client connected");
  socket.on("new del req", data => {
    socket.emit("deliver request list", "request list")
  })
  socket.emit('message', "new message")
});
