import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth';
import connect from './config/connect'
const app = express();

require('dotenv').config();
connect()

app.use('user/', authRoutes)
app.use(express.json());
app.use(cors());

app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
});