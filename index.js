const express = require('express')
const app = express()
require('dotenv').config()

const medicineRoute = require('./routes/medicine-route')

// parse application/x-www-form-urlencoded
app.use(express.urlencoded())

// parse application/json
app.use(express.json())

app.use("/api/v1/medicines", medicineRoute)

app.listen(process.env.PORT || 3000, () => {
  console.log("Example app listening....")
})
