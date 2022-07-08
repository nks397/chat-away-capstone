const express = require("express")
const app = express()
require("dotenv").config()
const mongoose = require("mongoose")
const morgan = require("morgan")

const PORT = process.env.PORT || 7000

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
app.use("/api/users", require("./routes/userRouter"))

app.use((err, req, res, next) => {
  console.log(err, "err")
  if(err.name === "UnauthorizedError"){
    res.status(err.status)
  }
  return res.send({errMsg: err.message})
})

app.listen(PORT, ()=>{
    console.log("Server is running on local port 7000.")
})
