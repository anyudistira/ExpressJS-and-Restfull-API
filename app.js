const express = require('express')
const app = express()
const port = 3000
const router = require('./query')
const migrate = require('node-pg-migrate')

app.use(router)
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

