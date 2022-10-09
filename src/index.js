const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

const pathname = path.resolve(__dirname, './talker.json');

app.get('/talker', async (_req, res) => {
  const allTalkers = JSON.parse(await fs.readFile(pathname, 'utf8'));
  return res.status(200).json(allTalkers);
});

app.get('/talker/:id', async (req, res) => {
  const allTalkers = JSON.parse(await fs.readFile(pathname, 'utf8'));
  const flag = allTalkers.find(({ id }) => id === Number(req.params.id));
  if (!flag) {
    return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(flag);
});

app.listen(PORT, () => {
  console.log('Online');
});
