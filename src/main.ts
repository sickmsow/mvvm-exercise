// src/main.ts

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';  

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
