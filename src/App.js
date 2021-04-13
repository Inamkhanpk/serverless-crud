import React, { useEffect, useState } from "react"
import { Form, Formik, Field } from "formik"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"

const useStyles = makeStyles((theme) => ({
 paper:{
   padding:theme.spacing(2),
   textAlign:'center',
   
   
   
   
 },
 container:{
  
   
  
 },
 
}));




export default function Home() {
  const classes = useStyles()
  const [contactData, setData] = useState([])
  const [fetchData, setFetchData] = useState(false)
  const [updatingData, setUpdatingData] = useState(undefined)
  const [update, setUpdate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openCreate, setOpenCreate] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)

  

  useEffect(() => {
    ;(async () => {
      await fetch(`/.netlify/functions/todos-read`)
        .then(res => res.json())
         
        .then(data => {
          console.log(data)
          setData(data)
        })
    })()
  }, [fetchData])



  


  const updateMessage = (id) => {
    var updateData = contactData.find(mes => mes.ref["@ref"].id === id)
    setUpdatingData(updateData)
    handleOpenUpdated() 
  }



  const deleteMessage = async message => {
    
    setLoading(true)
    await fetch("/.netlify/functions/todos-delete", {
      method: "post",
      body: JSON.stringify({ id: message.ref["@ref"].id }),
    })
    setFetchData(true)
  }

  
  const handleOpenCreate = () => {
    setOpenCreate(true)
  }


  const handleCloseCreate = () => {
    setOpenCreate(false)
  }

  
  const handleOpenUpdated = () => {
    setOpenUpdate(true)
  }


  const handleCloseUpdated = () => {
    setOpenUpdate(false)
  }

  
  const bodyCreate = (
    <div >
      <Formik
        onSubmit={(value, actions) => {
          console.log(value)
          fetch(`/.netlify/functions/todos-create`, {
            body: JSON.stringify(value),
            method: 'post'
          }).then(response => {
            return response.json()
          })
          setFetchData(true)
          actions.resetForm({
            values: {
              message: "",
            },
          })
          setFetchData(false)
          handleCloseCreate()
        }}
        initialValues={{
          message: "",
        }}
      >
        {formik => (
          <Form onSubmit={formik.handleSubmit}>
            <Field
              as={TextField}
              variant="outlined"
              //rowsMax={4}
              multiline
              type="text"
              name="message"
              label="Message"
              id="message"
              required
            />
            <div className="btn-form">
              <button type="submit">add</button>
              <button type="button" onClick={handleCloseCreate}>
                close
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )

  // body of update modal
  const bodyUpdate = (
    <div >
      <Formik
        onSubmit={(value, actions) => {
          fetch("/.netlify/functions/todos-update", {
            method: "put",
            body: JSON.stringify({
              message: value.message,
              id: updatingData.ref["@ref"].id,
            })
            ,
          })
          setFetchData(true)
          actions.resetForm({
            values: {
              message: "",
            },
          })
          setFetchData(false)
          handleCloseUpdated()
        }}
        initialValues={{
          message: updatingData !== undefined ? updatingData.data.message : "",
        }}
      >
        {formik => (
          <Form onSubmit={formik.handleSubmit} className="form">
            <Field
              as={TextField}
              multiline
              //rowMax={4}
              type="text"
              name="message"
              id="message"
              className="field"
            />
            <div className="btn-form">
              <button type="submit">update</button>
              <button type="button" onClick={handleCloseUpdated}>
                close
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )



          
  return (
    <Grid container
     className={classes.container}>

     <Grid item xs={12}>
        <Grid container justify="center" alignItems='center'>   

       <Paper className={classes.paper}>

      <Grid item xs={12} >
        <h3>CRUD APP</h3>
      </Grid>
      
      <Grid item xs={12} >
        <Button onClick={handleOpenCreate} variant="contained" color="primary">Create Message</Button>
      </Grid> 

      <Grid item xs={12} >
        <Modal
          open={openCreate}
          onClose={handleCloseCreate}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {bodyCreate}
        </Modal>
      </Grid> 


       <Grid item xs={12} >
        <Modal
          open={openUpdate}
          onClose={handleCloseUpdated}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {bodyUpdate}
        </Modal>
      </Grid>



      
       

      <Grid>
            
            <Grid>

              {contactData !== null ? (
                contactData.length === 0 ? (

                  <Grid container justify="center" >
                    <Grid item xs={12} >
                    You have no contacts stored...
                    </Grid>
                  </Grid>

                ) : (
                  contactData.map((contact, ind) => {
                    return (
                      <Grid key={ind}>
                        <Grid container >


                          <Grid item xs={12}>
                            <h3>{contact.data.message}</h3>
                          </Grid>

                          <Grid item xs={6}>
                            <Button 
                            variant="contained" color="primary"
                              onClick={() => {
                              handleOpenUpdated()
                              updateMessage(contact.ref["@ref"].id)
                            }}
                            >
                              
                              Update
                          
                            </Button>
                            </Grid>

                              <Grid item xs={6}>

                            <Button
                            variant="contained" color="primary"
                            
                              onClick={() => {
                                deleteMessage(contact)
                              }}>
                                Delete
                            </Button>
                          </Grid>


                        </Grid>
                      </Grid>
                    )
                  })
                )
              ) : (
                <Grid >
                 loading...
                </Grid>
              )}
            </Grid>
          </Grid>






          </Paper>

          </Grid>
      </Grid>

    </Grid>
  )
}