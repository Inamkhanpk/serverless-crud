

// /* code from functions/todos-create.js */
//  /* Import faunaDB sdk */
//  const faunadb = require("faunadb")
// /* configure faunaDB Client with our secret */
// const q = faunadb.query
// const client = new faunadb.Client({
//   secret: process.env.FAUNADB_SECRET
// })

// /* export our lambda function as named "handler" export */
// exports.handler = (event, context, callback) => {
//   /* parse the string body into a useable JS object */
//   const data = JSON.parse(event.body)
//   console.log("Function `todo-create` invoked", data)
//   // const todoItem = {
//   //   data: data
//   // }
//   /* construct the fauna query */
//   return client.query(q.Create(q.Collection('todos'),
//   { data:  data }))
//   .then((response) => {
//     console.log("success", response)
//     /* Success! return the response with statusCode 200 */
//     return callback(null, {
//       statusCode: 200,
//       body: JSON.stringify(response)
//     })
//   }).catch((error) => {
//     console.log("error", error)
//     /* Error! return the error with statusCode 400 */
//     return callback(null, {
//       statusCode: 400,
//       body: JSON.stringify(error)
//     })
//   })
// }









const faunadb = require("faunadb")

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})
require("dotenv").config()

exports.handler = (event, context, callback) => {
  
  const data = JSON.parse(event.body)
  console.log("Function `todo-create` invoked", data)
  const todoItem = {
    data: data
  }
  
  return client.query(q.Create(q.Ref('todos'), todoItem
    ))
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











// const faunadb = require('faunadb')
// const q = faunadb.query

// /* export our lambda function as named "handler" export */
// exports.handler = async (event, context) => {
//   /* configure faunaDB Client with our secret */
//   const client = new faunadb.Client({
//     secret: process.env.FAUNADB_SECRET
//   })  
//   /* parse the string body into a useable JS object */
//   const data = JSON.parse(JSON.stringify(event))
  
//   console.log('Function `todo-create` invoked', data)
//   const todoItem = {
//     data: data
//   }
//   /* construct the fauna query */
//   return client.query(q.Create(
//     q.Collection('todos'),
//     {todoItem},
//   ))
//     .then((response) => {
//       console.log('success', response)
//       /* Success! return the response with statusCode 200 */
//       return {
//         statusCode: 200,
//         body: JSON.stringify(response)
//       }
//     }).catch((error) => {
//       console.log('error', error)
//       /* Error! return the error with statusCode 400 */
//       return {
//         statusCode: 400,
//         body: JSON.stringify(error)
//       }
//     })
// }





























// const faunadb = require("faunadb")
// q = faunadb.query
// require("dotenv").config()

// const handler = async event => {
//   console.log(event)
//   try {
//     if (event.httpMethod !== "POST") {
//       return { statusCode: 405, body: "Method Not Allowed" }
//     }
//     const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET })
//     const obj = JSON.parse(event.body)
//     let result = await client.query(
//       q.Create(q.Collection("todos"), { data: obj })
//     )
//     console.log("Entry Created and Inserted in Container: " + result.ref.id)

//     const subject = event.queryStringParameters.name || "World"
//     return {
//       statusCode: 200,
//       body: JSON.stringify({ id: `${result.ref.id}` }),
//     }
//   } catch (error) {
//     return { statusCode: 500, body: error.toString() }
//   }
// }

// module.exports = { handler }