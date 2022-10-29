import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 5000;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(port, () => console.log('Server running on port: ' + port)))
    .catch((error) => console.log(error.message));

