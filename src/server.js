import express from 'express';
import bodyParser from 'body-parser';
import initWebRoutes from './routes/routes';
import connectDB from './config/connectDB';
import cors from 'cors';

require('dotenv').config();

const app = express();
app.use(cors({ credentials: true, origin: process.env.URL_REACT }));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

initWebRoutes(app);

connectDB();

const port = process.env.PORT || 6969;

app.listen(port, () => {
	console.log(`Backend is running on the port: http://localhost:${port}`);
});