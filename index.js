const express = require('express')
const aplicationRouter = require('./src/aplications/router');
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/v1/app', aplicationRouter)

app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`)
})
