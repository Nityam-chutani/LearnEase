import { configDotenv } from 'dotenv';
configDotenv();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import userRoutes from './routes/user.routes.js'; 
import courseRoutes from './routes/course.routes.js'; 
import paymentRoutes from './routes/payment.routes.js';
import miscellaneousRoutes from './routes/miscellaneous.routes.js';
import express from 'express';
import connectToDb from './config/db.config.js';
import errorMiddleware from './middleware/error.middleware.js';

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
// app.use(cors())


app.use('/api/v1/user', userRoutes); 
app.use('/api/v1/courses', courseRoutes); 
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/', miscellaneousRoutes);
 

app.all('*', (req, res) => {
    res.status(404).send('OOPS!! 404 page not found');
})

app.options("*", cors())

app.use(errorMiddleware);

// db init
connectToDb();

export default app;