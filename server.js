const express = require('express')
const expressGraphQL = require('express-graphql')
const schema = require('./schema.js')

const port = process.env.port || 4000

var app = express()

app.use('/graphiql', expressGraphQL({
  schema,
  graphiql: true
}))


app.listen(port, () => {
  console.log('The graphql server is up in port : 4000')
})