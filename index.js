const express = require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var indexRouter = require('./routes/index');


app.get('/', function (req, res) {
  res.send('Hello generator')
})

app.use('/generate', indexRouter);

const port = process.env.PORT

app.listen( port || 8000, ()=>{
    console.log('started at ' + port)
})