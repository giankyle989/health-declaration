const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport')

const HealthRouter = require('./routes/health');
const UserRouter = require('./routes/userAuth')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


// mogodb connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', ()=> {
    console.log("MongoDB database connection is established.");
});

// Model Routes
app.use('/health', HealthRouter);
app.use('/user', UserRouter)
app.use(passport.initialize())

app.listen(port, ()=> {
    console.log(`Server is running in port : ${port}`);
})