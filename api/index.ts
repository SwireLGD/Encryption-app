import express from 'express';
import encryptionRouter from './routers/encryptionRouter';
import cors from 'cors';

const app = express();
const port = 8000;

const Vigenere = require('caesar-salad').Vigenere;

app.use(express.json());
app.use(cors());
app.use('/', encryptionRouter);

app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
});