const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const lib = require('./middlewares/lib');
const middlewareEmail = require('./middlewares/middlewareEmail');
const middlewarePassword = require('./middlewares/middlewarePassword');
const middlewareName = require('./middlewares/middlewareName');
const middlewareAge = require('./middlewares/middlewareAge');
const middlewareTalk = require('./middlewares/middlewareTalk');
const middlewareRate = require('./middlewares/middlewareRate');
const middlewareWatchedAt = require('./middlewares/middlewareWatchedAt');
const middlewareToken = require('./middlewares/middlewareToken');

const { responseDados } = require('./utils/utilsService');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

const talkerJSON = path.resolve(__dirname, './talker.json');

app.get('/talker', async (_req, res) => {
  const allTalkers = JSON.parse(await fs.readFile(talkerJSON, 'utf8'));
  return res.status(200).json(allTalkers);
});

app.get('/talker/search', middlewareToken, async (req, res) => {
  const allTalkers = JSON.parse(await fs.readFile(talkerJSON, 'utf8'));
  const { q } = req.query;
  const searchTalkers = allTalkers.filter((acc) => acc.name.includes(q));
    res.status(200).json(searchTalkers);
  });

app.get('/talker/:id', async (req, res) => {
  const allTalkers = JSON.parse(await fs.readFile(talkerJSON, 'utf8'));
  const flag = allTalkers.find(({ id }) => id === Number(req.params.id));
  if (!flag) {
    return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(flag);
});

app.post('/login', middlewareEmail, middlewarePassword,
  (_req, res) => {
  const token = lib();
  res.status(200).json({ token });
});

app.post('/talker', middlewareToken, middlewareName, middlewareAge,
  middlewareTalk, middlewareWatchedAt, middlewareRate,
  async (req, res) => {
  const allTalkers = JSON.parse(await fs.readFile(talkerJSON, 'utf-8'));
  const addId = allTalkers.length + 1;
  const reqBody = { id: addId, ...req.body };
  allTalkers.push(reqBody);
  await fs.writeFile(talkerJSON, JSON.stringify(allTalkers));
  res.status(201).json(reqBody);
});

app.put('/talker/:id', middlewareToken, middlewareName, middlewareAge,
  middlewareTalk, middlewareWatchedAt, middlewareRate,
  async (req, res) => {
  const { id } = req.params;
  const talker = req.body;
  const dado = await responseDados(Number(id), talker);

  return res.status(200).json(dado);
});

app.delete('/talker/:id', middlewareToken, async (req, res) => {
  const getId = Number(req.params.id);
  const allTalkers = JSON.parse(await fs.readFile(talkerJSON, 'utf-8'));
  const flag = allTalkers.findIndex((acc) => acc.id === Number(getId));
  allTalkers.splice(flag, 1);
  await fs.writeFile(talkerJSON, JSON.stringify(allTalkers));
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log('Online');
});
