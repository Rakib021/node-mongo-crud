const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT ||4000;
const { MongoClient, ServerApiVersion, ObjectID } = require('mongodb');

const ObjectId = require('mongodb').ObjectId;


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

//using get for load data
      app.get('/user',async(req,res)=>{
          const query = {};
          const cursor = usersCollection.find(query);
          const users = await cursor.toArray();
          res.send(users);
      })
//updated user

app.put('/user/:id', async(req,res)=>{
    const id = req.params.id;
    const updateUser = req.body;
    const  filter ={_id : ObjectId(id)};
    const options = { upsert: true };

    const updateDoc ={
        $set:{
            name:updateUser.name,
            email :updateUser.email
        }
    }
    const result = await usersCollection.updateOne(filter,updateDoc,options);
    res.send(result);
})

})

//deleted user
      app.get('/user/:id' ,async(req,res) =>{
          const id = req.params.id;
          const  query ={_id : ObjectId(id)};
          const result = await usersCollection.findOne(query);
          res.send(result);
      })
    
      //POST user:add a new user
    app.post('/user',async(req,res)=>{
        const newUser = req.body;
        console.log(newUser);
        const result =await usersCollection.insertOne(newUser); 
    
        console.log("Adding new User" , result);
        res.send(result);

    
    });

//delete users

app.delete('/user/:id', async(req,res)=>{
    const id = req.params.id;
    const query = {_id:ObjectId(id)};
    const result=  await usersCollection.deleteOne(query);
    res.send(result);
})

    }
    finally{

    }
}
run().catch(console.dir);


app.listen(port,()=>{
    console.log("crud server is running");
})