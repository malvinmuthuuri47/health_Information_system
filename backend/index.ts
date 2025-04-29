import express from 'express';
import mongoose from 'mongoose';
import env from './config/env';
import doctorRoutes from './routes/doctorRoutes';

const app = express();
const db_conn_str = env.MONGO_URI;
const port = env.PORT;

// middleware to parse JSON request bodies
app.use(express.json());
app.use('/api', doctorRoutes);

mongoose.connect(db_conn_str)
.then(() => console.log('MongoDb connected successfully'))
.catch((err) => {
    console.log('MongoDb connection failed', err);
    process.exit(1);
})

app.get('/', (req, res) => {
    res.json('Welcome Home little one');
})

app.listen(port, () => {
    console.log(`Server running on Localhost: ${port}`);
})