const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const saltRounds = 10;
const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'vql',
    database : 'smart-brain'
  }
});

const app = express();

app.use(cors());

app.use(express.json());


app.get('/users', (req,res) => {
	db.select('*').from('users')
	.then(data => {
		res.json(data)
	})
});

app.post('/signin', (req, res) => {signIn.handleSignIn(req, res, db, bcrypt)});

app.post('/reg', (req, res) => {register.handleRegister(req, res, db, bcrypt, saltRounds)});

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});

app.put('/image', (req, res) => {image.handleImage(req, res, db)});

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

app.listen(3001, () => {
	console.log('FaceApi Running-')
});



/*
/ --> res = it's working
/Sign in --> post = success/fail
/register --> post = user
/profile/:userid --> Get = user
/image --> PUT = user
*/