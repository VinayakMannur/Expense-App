const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/routes')

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(userRoutes);

app.listen(9000,()=>{
    console.log('connected to backend');
});

