/* code from functions/todos-update.js */
import faunadb from 'faunadb'


const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = (event, context, callback) => {
  const data = JSON.parse(event.body)
  
  
  return client.query(
    q.Update(q.Ref(q.Collection("todos"), data.id), {
      data: { message: data.message },
    })
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