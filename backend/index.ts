import express from 'express';
import mongoose from 'mongoose';
import env from './config/env';
import cookieParser from 'cookie-parser';

import doctorRoutes from './routes/doctorRoutes';
import programRoutes from './routes/programRoutes';
import clientRoutes from './routes/clientRoutes';

const app = express();
const db_conn_str = env.MONGO_URI;
const port = env.PORT;

// middleware to parse JSON request bodies
app.use(express.json());
app.use(cookieParser());

// program routes
app.use('/auth', doctorRoutes);
app.use('/program', programRoutes);
app.use('/client', clientRoutes);

mongoose.connect(db_conn_str)
.then(() => console.log('MongoDb connected successfully'))
.catch((err) => {
    console.log('MongoDb connection failed', err);
    process.exit(1);
})

app.get('/', (req, res) => {
    res.status(200).json('Welcome Home little one');
})

app.listen(port, () => {
    console.log(`Server running on Localhost: ${port}`);
})