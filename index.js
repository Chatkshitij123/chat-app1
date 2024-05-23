const express = require("express");
// const chats = require("./data/db");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const path = require('path');
const cors = require('cors');


dotenv.config();

connectDB();
const app = express();
//to accept the json data
app.use(express.json());
// Enable CORS for all routes with specific origins
const allowedOrigins = ['http://localhost:8000'];
app.use(cors());
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use("/api/user",userRoutes);
app.use("/api/chat",chatRoutes);
app.use("/api/message",messageRoutes);

// -----------------------Deployment-------------------------------------

// const __dirname1 = path.resolve();
// console.log(__dirname1);
if (process.env.NODE_ENV === 'production') {
app.use(express.static(path.join(__dirname,"/client/build")));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,"/client/build/index.html"));
});
} else {
  app.get('/', (req, res) => {
    res.send("API is Running");
  });
}



//middleware for error Handler
app.use(notFound);
app.use(errorHandler);

// app.get('/api/chat', (req,res) => {
//     res.send(chats);
// });
// app.get('/api/chat/:id', (req,res)=> {
//     // console.log(req.params.id);
//     const singleChat = chats.find((c) => c._id === req.params.id);
//     res.send(singleChat);
// });

const PORT = process.env.PORT || 8000; 

//not here we get the server listen

const server = app.listen(8000,
    console.log(`Server started on port ${PORT}`.yellow.bold)
);

const io = require("socket.io")(server, {
    //the amount of time it will wait 60 second and if user not being active it disconnected it and saves the bandwith
    pingTimeout: 60000,
    //for cross-origin errors i use cors
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
      credentials: true
    },
});
//for making the connection
io.on("connection", (socket) => {
console.log("connected to socket.io");

// WHENVER USER OPEN THE APP HE/SHE WILL BE CONNECTED TO HIS/HER PERSONAL SOCKET

    //we are creating a new socket where client send the data we are joining a new room
    socket.on("setup", (userData) => {
        //we are creating a new room with the id of the user
        socket.join(userData._id);
        // console.log(userData._id);
        socket.emit("connected");
    });
        socket.on("join chat", (room) => {
            socket.join(room);
            console.log("User Joined Room:" + room);
        });
        socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
    
    socket.on("new message", (newMessageReceived) => {
        var chat = newMessageReceived.chat;

        if(!chat.users) return console.log("chat users not defined");

        chat.users.forEach(user => {
            if (user._id == newMessageReceived.sender._id) return;

            socket.in(user._id).emit("message received", newMessageReceived);
        });

    });
    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
      });
});
