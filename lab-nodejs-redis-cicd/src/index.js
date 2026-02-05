const express = require('express')
const userRouter = require('./routes/user')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

const { apiReference } = require('@scalar/express-api-reference');

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

const server = app.listen(port, (err) => {
  if (err) throw err
  console.log("Server listening the port " + port)
})


module.exports = server

app.use(
  '/reference',
  apiReference({
    theme: 'purple',
    spec: {
      content: {
        openapi: '3.1.0',
        info: {
          title: 'ECE Redis API',
          version: '1.0.0',
        },
        paths: {
          '/data': {
            get: {
              summary: 'Get data from Redis',
              responses: {
                '200': { description: 'OK' },
              },
            },
          },
        },
      },
    },
  }),
);
