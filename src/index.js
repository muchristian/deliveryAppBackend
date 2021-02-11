import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import allroutes from "./routes/index";
import apikeyMiddleware from "./middlewares/apiKeyMiddleware";
const { monthlyApi } = apikeyMiddleware;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(allroutes);

// const publicOptions = {
//   origin: true,
//   methods: ["GET"]
// };

// app.use('/public', cors(publicOptions))

// app.post('/', monthlyApi, (req, res) => {
//   console.log(req.body)
//   //health check route
//   console.log('Everything is just cheesy.');
//   res.status(200).send({ data: { message: 'Everything is just cheesy.' } });
// });
app.get('/', (req, res) => {
  //health check route
  console.log('Everything is just cheesy.');
  res.status(200).send({ data: { message: 'Everything is just cheesy.' } });
});

const hostname = "192.168.43.154";
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`server port is running on ${server.address().port}`);
});
// let io = require('socket.io').listen(server);
// app.set('socketio', io);
// io.sockets.on('connection', socket => {
//   console.log("new client connected");
//   socket.on("new del req", data => {
//     socket.emit("deliver request list", "request list")
//   })
//   socket.emit('message', "new message")
// });
