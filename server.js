const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

//for postgres database 
const db =knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'admin',
      database : 'smart-brain'
    }
  });

const app = express();
app.use(bodyParser.json());
app.use(cors())

app.get('/',(req,res)=>{res.send(database.users)})
app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})
app.post('/register', (req,res)=>{register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,db)})
app.put('/image',(req,res)=> {image.handleImage(req,res,db)})
app.post('/imageUrl',(req,res)=>{image.handleApiCall(req,res)})
const PORT = process.env.PORT
app.listen(PORT,()=> {
    console.log(`Server is running at port ${PORT}`);
})
console.log(PORT)

/*
/* --> res = this is working 
/signin --> a post req respond = a success or fail
/register -> a post req  = new user object
/profile/:userId --> GET request = returns user
/image --> PUT updates the user profile -> returns updated user
*/