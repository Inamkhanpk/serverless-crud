/* code from functions/todos-read.js */
import faunadb from 'faunadb'


const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = (event, context, callback) => {
  
  return client.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection("todos"))),
      q.Lambda(x => q.Get(x))
    )
  )
  .then((response) => {
    console.log("success", response)
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(response)
    })
  }).catch((error) => {
    console.log("error", error)
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    })
  })
}