import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/authroute.js';
import fileRoutes from './routes/fileroute.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(express.json());
connectDB();

app.use('/api', authRoutes);
app.use('/', fileRoutes);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Hello World!');
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
