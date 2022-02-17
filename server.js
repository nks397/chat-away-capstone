const express = require("express")
const app = express()
require("dotenv").config()
const mongoose = require("mongoose")
const morgan = require("morgan")

// const http = require("http")
// const socketio = require("socket.io")

const PORT = process.env.PORT || 7000

// http.createServer creates a new instance of my server
// created to get socket.io working
// const server = http.createServer(app)
// const io = socketio(server)

// io.on("connection", (socket) => {
//   socket.on("message", ({name, message}) => {
//     io.emit("message", {name, message})
//   })
//   console.log("We have a new connection!!!!")

//   // socket.on("disconnect", () => console.log("disconnected"))
// })

const expressJwt = require("express-jwt")

// middleware
app.use(express.json())
app.use(morgan("dev"))

// mongoose connect
mongoose.connect(
    process.env.MONGO_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      },
      () => console.log('Connected to the DB')
)

// routes
app.use("/auth", require("./routes/authRouter"))
app.use("/api", expressJwt({ secret: process.env.SECRET, algorithms: ['HS256'] }))
app.use("/api/message", require("./routes/messageRouter"))
app.use("/api/conversation", require("./routes/conversationRouter"))
app.use("/api/users", require("./routes/userRouter"))

app.use((err, req, res, next) => {
  console.log(err, "err")
  if(err.name === "UnauthorizedError"){
    res.status(err.status)
  }
  return res.send({errMsg: err.message})
})

// socket
// const io = require("socket.io")(7000)
  
//   let users = [];
  
//   const addUser = (userId, socketId) => {
//     !users.some((user) => user.userId === userId) &&
//       users.push({ userId, socketId });
//   };
  
//   const removeUser = (socketId) => {
//     users = users.filter((user) => user.socketId !== socketId);
//   };
  
//   const getUser = (userId) => {
//     return users.find((user) => user.userId === userId);
//   };
  
//   io.on("connection", (socket) => {
//     //when ceonnect
//     console.log("a user connected.");
  
//     //take userId and socketId from user
//     socket.on("addUser", (userId) => {
//       addUser(userId, socket.id);
//       io.emit("getUsers", users);
//     });
  
//     //send and get message
//     socket.on("sendMessage", ({ senderId, receiverId, text }) => {
//       const user = getUser(receiverId);
//       io.to(user.socketId).emit("getMessage", {
//         senderId,
//         text,
//       });
//     });
  
//     //when disconnect
//     socket.on("disconnect", () => {
//       console.log("a user disconnected!");
//       removeUser(socket.id);
//       io.emit("getUsers", users);
//     });
//   });

// server

// server.listen(PORT, () => console.log(`Server is running on local port ${7000}.`))
app.listen(PORT, ()=>{
    console.log("Server is running on local port 7000.")
})
