if(process.env.NODE_ENV != "production") {
require ("dotenv").config();
}

//dependencies

const express = require('express')
const cors = require('cors');
const connectToDb = require('./config/connectToDb');
const notesController = require("./controllers/notesController");
const usersController = require('./controllers/UsersController');
const requireAuth = require('./middleware/requireAuth');

//create express app
const app = express()

//configure express
app.use(cors());
app.use(express.json()); // Enable JSON parsing middleware

//connect to db
connectToDb()

//Routing
app.post("/signup", usersController.signup);
app.post("/login", usersController.login);
app.get("/logout", usersController.logout);

app.get("/check-auth", requireAuth, usersController.checkAuth);

app.get('/notes', notesController.fetchNotes);
app.get('/notes/:_id', notesController.fetchNote);
app.post('/notes', notesController.createNote);
app.put('/notes/:_id', notesController.updateNote);
app.delete('/notes/:_id', notesController.deleteNote);

app.listen(process.env.PORT, () =>{
    console.log(`server started at ${process.env.PORT}`)
})