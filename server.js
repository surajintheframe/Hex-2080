//Socket io + server code

const app = require('./app');
const mongoose=require('mongoose');
const server = require('http').createServer(app);
const Socket = require('socket.io')


const users= [];
const dotenv = require('dotenv');

dotenv.config({path:'./config.env'});

const db_URL=process.env.DATABASE_URL.replace('<password>',process.env.DATABASE_PASSWORD);

mongoose.connect(db_URL,{
    useNewUrlParser : true,
    useUnifiedTopology: true
}).then(()=>console.log("DB connection was successful..!!"))
.catch((error)=>{
    console.log('   Error connecting to MongoDB:', error.message);
})




const port = process.env.PORT || 3678

const io = Socket(server,{
    cors:{
        origin:'*',
        methods:["Get" , "PO"]
    }
})


io.on("connection",(socket)=>{
   
      console.log("connected to",socket.id);
   //add new users to connection
      socket.on("adduser",(username)=>{
      socket.user=username;
      users.push(username);
      io.sockets.emit("users",users)//so io hold updated users list
       })


   // msg to connected all client  
   socket.on("message" ,(message)=>{
       io.sockets.emit("message_client", {
           message:message,
           user:socket.user
       })
     
      }) 

   //disconnect active user
   socket.on("disconnect",()=>{
       console.log("We are disconnecting:",socket.user);

       if(socket.user){
           users.splice(users.indexOf(socket.user),1);

        io.sockets.emit("users",users);   
       }
   })

})





server.listen(port,()=>{
    console.log(" Listening server port", port);
})



module.exports = server;