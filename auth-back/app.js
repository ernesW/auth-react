const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

async function connectDB() {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log('Connected to DB!');
}

connectDB().catch(console.error);

app.use('/api/signup', require('./routes/signup'));
app.use('/api/login', require('./routes/login'));
app.use('/api/user', require('./routes/user'));
app.use('/api/todos', require('./routes/todos'));
app.use('/api/refresh-token', require('./routes/refreshToken'));
app.use('/api/signout', require('./routes/signout'));


app.get('/', (req, res) => {
    res.send('Hello World');

});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

