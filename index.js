const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ConnectionCheckedInEvent, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

// midleware use

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uuiry.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
      try {
            await client.connect();
            const serviceCollection = client.db('geniusCar').collection('service');
            app.get('/service', async (req, res) => {
                  const query = {};
                  const cursor = serviceCollection.find(query);
                  const services = await cursor.toArray();
                  res.send(services);

            
            })
            

            app.get('/service/:id', async(req, res)=>{
                  const id = req.params.id;
                  const query = {_id: ObjectId(id)} ;
                  const service = await serviceCollection.findOne(query);
                  res.send(service);


                  //post 
                  
            app.post('/service', async(req,res) =>{
                  const newService = req.body;
                  const result = await serviceCollection.insertOne(newService);
                  res.send(result);
            });

            // DeLETE

            app.delete('/service/:id', async(req, res) =>{
                  const id = req.params.id;
                  const query = {_id: ObjectId(id)};
                  const result = await serviceCollection.deleteOne(query);
                  res.send(result);
            })

            
            })
           
      }
      finally {

      }
}



run().catch(console.dir);

app.get('/', (req, res) => {
      res.send('running the genius mama');
});

app.listen(port, () => {
      console.log('listening to port', port);
})