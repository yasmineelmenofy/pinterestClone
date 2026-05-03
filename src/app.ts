import express from 'express'
import cookieParser from 'cookie-parser'




const app = express();

//middlewares 
app.use(cookieParser());
app.use(express.json());



export default app;

