// const express = require('express')
// const aplicationRouter = require('./src/aplications/router');
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.use('/api/v1/app', aplicationRouter)

// app.listen(port, () => {
//   console.log(`app running at http://localhost:${port}`)
// })

import express from 'express';
import authRoutes from './src/authRoutes.js';
import aplicationRouter from './src/aplications/router.js';
import errorHandler from './src/middleware/errorHandle.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(errorHandler);

//buat login & register
app.use('/auth', authRoutes); 

//buat Controller
app.use('/app', aplicationRouter); 

app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`);
});
