import React, { useEffect, useState } from "react"
import { Form, Formik, Field } from "formik"
import TextField from "@material-ui/core/TextField"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import CircularProgress from "@material-ui/core/CircularProgress"

function rand() {
  return Math.round(Math.random() * 20) - 10
}




export default function Home() {
  //const classes = useStyles()
  const [data, setData] = useState()
  const [fetchData, setFetchData] = useState(false)
  const [updatingData, setUpdatingData] = useState(undefined)
  const [update, setUpdate] = useState(false)
  const [loading, setLoading] = useState(false)
  //const [modalStyle] = useState(getModalStyle)
  const [openCreate, setOpenCreate] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)

  

  // useEffect(() => {
  //   ;(async () => {
  //     await fetch("/.netlify/functions/todos-read")
  //       .then(res => res.json())
  //       .then(data => {
  //         setData(data)
  //       })
  //   })()
  // }, [fetchData])



  const updateMessage = (id) => {
    var updateData = data.find(mes => mes.ref["@ref"].id === id)
    setUpdatingData(updateData)
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
          fetch("/.netlify/functions/todos-create", {
            body: JSON.stringify(value),
            method: 'POST'
          }).then(response => {
            console.log('data sent',response)
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
              rowsMax={4}
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
            }),
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
              rowMax={4}
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
    <div className="main">

      <div className="head">
        <h3>CURD APP</h3>
      </div>

      <div className="create-btn">
        <button onClick={handleOpenCreate}>Create Message</button>
      </div>

      <div>
        <Modal
          open={openCreate}
          onClose={handleCloseCreate}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {bodyCreate}
        </Modal>
      </div>


      <div>
        <Modal
          open={openUpdate}
          onClose={handleCloseUpdated}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {bodyUpdate}
        </Modal>
      </div>



      {data === null || data === undefined ? (
        <div className="loader">
          <CircularProgress />
        </div>
      ) : data.length >= 1 ? (
        <div className="data-display">
          <div className="data-div">
            {data.map((mes, i) => (
              <div key={i}>
                <p>{mes.data.message}</p>

                <button
                  onClick={() => {
                    handleOpenUpdated()
                    updateMessage(mes.ref["@ref"].id)
                  }}
                >
                  update
                </button>

                <button
                  onClick={() => {
                    deleteMessage(mes)
                  }}
                >
                  delete
                </button>

              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="no-task">
          <h4>No Task for today</h4>
        </div>
      )}
    </div>
  )
}