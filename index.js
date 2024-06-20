const express = require("express");
const cors = require("cors");
const app = express();
const User = require('./models/User')
require('dotenv').config()
const { mongoose } = require('mongoose');


app.use(express.json())
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("Test Works");
});

// Register Route
app.post('/register', async (req, res) => {
    const { username, email, password, firstName, lastName, address, phone, food} = req.body
    try {
        const userInfo = await User.create({
            username,
            email,
            password,
            firstName,
            lastName,
            address,
            phone, 
            food
        })
        res.json(userInfo)
    } catch (error) {
        res.status(422).json(error)
    }
})


app.get('/users', async (req, res) => {
  try {
      const users = await User.find();
      res.json(users);
  } catch (error) {
      res.status(500).json(error);
  }
});

app.get('/users/:id', async (req, res) => {
  try {
      const user = await User.findById(req.params.id);
      if (user) {
          res.json(user);
      } else {
          res.status(404).json({ error: 'User not found' });
      }
  } catch (error) {
      res.status(500).json(error);
  }
});




app.put('/users/:id', async (req, res) => {
    const { data } = req.body;
    try {
      const user = await User.findByIdAndUpdate(req.params.id, data, { new: true });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  });
  

app.delete('/users/:id', async (req, res) => {
  try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (user) {
          res.json({ message: 'User deleted successfully' });
      } else {
          res.status(404).json({ error: 'User not found' });
      }
  } catch (error) {
      res.status(500).json(error);
  }
});


app.listen(4000,()=>{
  console.log("server is running .......")
});
