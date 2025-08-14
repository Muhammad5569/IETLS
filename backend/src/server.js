require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const testRoutes = require('./routes/test')
const userRoutes = require('./routes/users')    
const listeningRoutes = require('./routes/sections/listening')
const listeningAttemptRoutes = require('./routes/attempts/listening')
const app = express()


mongoose.connect('mongodb://localhost:27017/techquest')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(express.json())

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Welcome to the IELTS API')
})
app.use(userRoutes)
app.use(testRoutes)
app.use(listeningRoutes)
app.use(listeningAttemptRoutes)

app.listen(port, ()=>{
    console.log(`Server is up to ${port}`)
})