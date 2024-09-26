import express from 'express'
import cors from 'cors'
// import bodyParser from 'body-parser';
import authRoutes from './routes/auth';
import connect from './config/connect'
const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());
connect()
app.use('/user', authRoutes)
// app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
});