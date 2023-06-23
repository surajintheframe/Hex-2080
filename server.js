
const app = require('./app');
const mongoose=require('mongoose');
const server = require('http').createServer(app);
;

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
// const server = app.listen(3005,()=>{
//              console.log(`Aplication running on port ${port}...`);
// })

server.listen(3005,()=>{
    console.log(" Listening server port", 3005);
})


module.exports = server;