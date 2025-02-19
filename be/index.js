const express = require('express')
const app = express()
const requestLogger = require('./middlewares/requestlogger');
const routes = require('./routes/v1');
const cors=require('cors')
app.use(requestLogger);

app.use(cors())
app.use(express.json());
  
app.use(express.urlencoded({ extended: true }));

app.use('/v1', routes);

// app.get('/', function (req, res) {
//   res.send('Hello World')
// })


console.log("server started @ 3000")
app.listen(5000)