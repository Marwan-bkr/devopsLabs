const express = require('express')
const userRouter = require('./routes/user')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

import('@scalar/express-api-reference').then((scalar) => {
  app.use(
    '/reference',
    scalar.apiReference({
      spec: {
        content: {
          openapi: '3.1.0',
          info: { title: 'ECE Redis API', version: '1.0.0' },
          paths: {
            '/user': {
              get: {
                summary: 'Get all users',
                responses: { '200': { description: 'OK' } },
              },
            },
          },
        },
      },
    })
  );
}).catch(err => {
  console.error('Failed to load Scalar:', err);
});

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

const server = app.listen(port, (err) => {
  if (err) throw err
  console.log("Server listening the port " + port)
})

module.exports = server
