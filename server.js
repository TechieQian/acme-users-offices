const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const conn = require('./db/index')
const path = require('path')
const db = require('./db/index')
const { Office, User } = db.models

//Start server
const app = express()
app.listen(port, ()=> {
  db.sync({force : true})
  .then(()=> {
    db.seed()
  })
  console.log(`Listening on ${port}`)
})

app.set('view engine', 'html')
app.engine('html', require('swig').renderFile)

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Middleware
app.use(require('morgan')('dev'))
app.use(require('method-override')('_method'))
app.use('/offices',require('./routes/offices'))
app.use('/users',require('./routes/users'))


app.get('/', (req, res, next)=> {
  Promise.all([
    User.findAll(),
    Office.findAll()
  ])
  .then(([ users, offices ])=> {
    res.render('index', { users, offices });
  })
  .catch(next);
});

app.use((err, req, res, next)=> {
  res.status(err.status || 500).render('error', { error: err });
});

//Static
app.use('/source', express.static(path.join(__dirname, 'source')));
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
