const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

const onRequestTalkers = async () => {
  const pathDirname = path.resolve(__dirname, 'talker.json');
  const data = JSON.parse(await fs.readFile(pathDirname, 'utf-8'));
  return data;
};

app.get('/talker', async (_req, res) => {
  const data = await onRequestTalkers();

  if (!data) { 
    return res.status(HTTP_OK_STATUS).send([]);
  } 
  res.status(HTTP_OK_STATUS).json(data);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const data = await onRequestTalkers();
  const filtered = data.find((talker) => Number(talker.id) === Number(id));

  if (!filtered) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  
  return res.status(200).send(filtered);
});

app.post('/login', (req, res) => {
  const value = crypto.randomBytes(8).toString('hex');
  const validate = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  const messageEmailNull = 'O campo "email" é obrigatório';
  const messageEmailFormat = 'O "email" deve ter o formato "email@email.com"';
  const messagePasswordNull = 'O campo "password" é obrigatório';
  const messagePasswordValidate = 'O "password" deve ter pelo menos 6 caracteres';

  const { email, password } = req.body;

  if (!email) return res.status(400).json({ message: messageEmailNull });
  if (!validate.test(email)) return res.status(400).json({ message: messageEmailFormat });
  if (!password) return res.status(400).json({ message: messagePasswordNull });
  if (password.length < 6) return res.status(400).json({ message: messagePasswordValidate });
  return res.status(200).json({ token: value });
});

app.listen(PORT, () => {
  console.log('Online');
});
