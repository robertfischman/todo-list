import express, { Request, Response } from 'express';
import cors from 'cors';
const { PrismaClient } = require('@prisma/client');

const routes = require('./routes');

const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};


const app = express();

app.use(cors(options));

const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Define a route
app.use('/tasks', routes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});