const express = require('express')
require('./db/mongoose')
const router = require('./router')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(router)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})