const express = require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var indexRouter = require('./routes/index');


app.get('/', function (req, res) {
  res.send('Hello generator')
})

app.use('/generate', indexRouter);

app.listen(8000, ()=>{
    console.log('started at 8000')
})