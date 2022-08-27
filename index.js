const dotenv = require('dotenv');
const cors = require('cors')
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const signup = require('./routes/signup');
const login = require('./routes/login');
const post = require('./routes/post');

dotenv.config({
    path: './.env'
});
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('connected to mongodb')).catch(error => console.log(error))


app.use('/signup', signup);
app.use('/login', login);
app.use('/post', post);

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

// "192.168.1.6"