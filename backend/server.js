const express = require ('express')
const cors = require ('cors')
const mongoose = require ('mongoose')
const HealthRouter = require('./routes/health')
require('dotenv').config()



const app = express()
const port = process.send.PORT || 5000

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection is established.')
})


app.use('/health', HealthRouter)

app.use(cors)
app.use(express.json())

app.listen(port, () =>{
    console.log(`Server is running on port : ${port}`)
})