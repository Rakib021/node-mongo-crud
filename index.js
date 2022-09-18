const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT ||4000;
const { MongoClient, ServerApiVersion } = require('mongodb');


//middleware
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("running my node mongo crud server");

})







const uri = "mongodb+srv://dbUser:FSekc8HCslB70PsB@cluster0.rjgygoo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
      await client.connect();
      const usersCollection = client.db("foodExpress").collection("user");
    
      app.POST('/user',(req,res)=>{
        const newUser = req.body;
    
        console.log("Adding new User" , newUser);
        res.send({result : 'success'});
    
    });
    }
    finally{

    }
}
run().catch(console.dir);


app.listen(port,()=>{
    console.log("crud server is running");
})