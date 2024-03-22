import express from 'express';

const Vigenere = require('caesar-salad').Vigenere;
const encryptionRouter = express.Router();

encryptionRouter.post('/encode', (req, res) => {
    const { password, message } = req.body;
    const encoded = Vigenere.Cipher(password).crypt(message);
    res.json({ encoded });
});
  
encryptionRouter.post('/decode', (req, res) => {
    const { password, message } = req.body;
    const decoded = Vigenere.Decipher(password).crypt(message);
    res.json({ decoded });
});

export default encryptionRouter;