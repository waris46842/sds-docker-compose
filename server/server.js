const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Data = require("./models/data");

app.use(cors());
app.use(express.json());

// mongoose.connect("mongodb://mongo:27017/server", {
//   useNewUrlParser: true,
// });

async function connectToMongoDB(){
    mongoose.connect("mongodb://mongo:27017/server", { useNewUrlParser: true }).then(
        () => {
          console.log("[success] task 2 : connected to the database ");
          clearInterval(db)
        },
        error => {
          console.log("[failed] task 2 " + error);
          //process.exit();
        }
      );
}

var db = setInterval(connectToMongoDB, 2000)

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.post("/command", async (req, res) => {
  console.log(req.body.cmd)
  console.log(req.body.name)
  const payload = req.body
  try{
    const command = new Data(payload)
    await command.save()
    console.log(55555)
    res.status(200).end()
  }catch(error){
    res.status(400).json(error)
  }
  
});

app.get('/check', async(req,res) => {
  try{
    var file = await Data.find({})
    res.json(file)
  }catch(error){
    res.status(400).json(error)
  }
  console.log(file)
})

app.listen(8000, () => {
  console.log("server running on 8000");
});
