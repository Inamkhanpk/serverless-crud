/* code from functions/todos-read.js */
const faunadb = require('faunadb')


const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = (event, context, callback) => {
  
  return client.query(
    q.Map(
      q.Paginate(q.Match(q.Index("readData"))),
     // q.Paginate(q.Documents(q.Collection("todos"))),
      q.Lambda(x => q.Get(x))
    )
  )
  .then((response) => {
    console.log("success", response.data)
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(response.data)
    })
  }).catch((error) => {
    console.log("error", error)
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    })
  })
}