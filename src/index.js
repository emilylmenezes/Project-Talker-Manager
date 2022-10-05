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

  if (!filtered) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).send(filtered);
});

app.post('/login', (_req, res) => {
  const value = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token: value });
});

app.listen(PORT, () => {
  console.log('Online');
});
