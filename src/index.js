const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs').promises;

const serviceCrypto = require('./service/serviceCrypto');
const middlewareEmail = require('./middlewares/validateEmail/middlewareEmail');
const middlewarePassword = require('./middlewares/validatePassword/middlewarePassword');
const middlewareAge = require('./middlewares/validateAge/middlewareAge');
const middlewareName = require('./middlewares/validateName/middlewareName');
const middlewareRate = require('./middlewares/validateRate/middlewareRate');
const middlewareTalk = require('./middlewares/validateTalk/middlewareTalk');
const middlewareToken = require('./middlewares/validateToken/middlewareToken');
const middlewareWatchedAt = require('./middlewares/validateWatchedAt/middlewareWatchedAt');

const { responseDados, requestTalkers } = require('./utils/requestAllTalkers');

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

app.get('/talker/search', middlewareToken, async (req, res) => {
  const allTalkers = await requestTalkers();
  const allTalkers = JSON.parse(await fs.readFile(talkerJSON, 'utf8'));
  const { q } = req.query;
  const searchTalkers = allTalkers.filter((acc) => acc.name.includes(q));
    res.status(200).json(searchTalkers);
  });
  
  app.get('/talker/:id', async (req, res) => {
  const allTalkers = JSON.parse(await fs.readFile(pathname, 'utf8'));
  const flag = allTalkers.find(({ id }) => id === Number(req.params.id));
  if (!flag) {
    return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(flag);
});

app.post('/login', middlewareEmail, middlewarePassword,
  (_req, res) => {
  const token = serviceCrypto();
  console.log(token);
  res.status(200).json({ token });
});

app.post('/talker', middlewareToken, middlewareName, middlewareAge,
  middlewareTalk, middlewareWatchedAt, middlewareRate,
  async (req, res) => {
  const allTalkers = JSON.parse(await fs.readFile(pathname, 'utf-8'));
  const addId = allTalkers.length + 1;
  const reqBody = { id: addId, ...req.body };
  allTalkers.push(reqBody);
  await fs.writeFile(pathname, JSON.stringify(allTalkers));
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
  const allTalkers = JSON.parse(await fs.readFile(pathname, 'utf-8'));
  const flag = allTalkers.findIndex((acc) => acc.id === Number(getId));
  allTalkers.splice(flag, 1);
  await fs.writeFile(pathname, JSON.stringify(allTalkers));
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log('Online');
});
