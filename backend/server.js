const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session')

const HealthRouter = require('./routes/healthRoute');
const UserRouter = require('./routes/userRoute')

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
app.use('/api/user', UserRouter)


app.listen(port, ()=> {
    console.log(`Server is running in port : ${port}`);
})