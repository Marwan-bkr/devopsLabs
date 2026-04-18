const express = require('express')
const userRouter = require('./routes/user')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

const redoc = require('redoc-express');

const db = require('./dbClient')
db.on("error", (err) => {
  console.error(err)
})

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Marwan and Hubert say "Hello World!"'))

app.use('/user', userRouter)

app.get('/docs/openapi.json', (req, res) => {
  res.json({
    openapi: '3.1.0',
    info: { title: 'ECE Redis API', version: '1.0.0' },
    paths: {
      '/user': {
        get: {
          summary: 'Get all users',
          responses: { '200': { description: 'OK' } }
        }
      }
    }
  });
});

app.get(
  '/reference',
  redoc({
    title: 'API Docs',
    specUrl: '/docs/openapi.json'
  })
);

const server = app.listen(port, (err) => {
  if (err) throw err
  console.log("Server listening the port " + port)
})

module.exports = server
