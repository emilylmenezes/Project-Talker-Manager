const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const serviceAge = require('../service/serviceAge');
const middlewareEmail = require('../middlewares/middlewareEmail');
const lib = require('../utils/lib');
const serviceName = require('../service/serviceName');
const middlewarePassword = require('../middlewares/middlewarePassword');
const serviceRate = require('../service/serviceRate');
const serviceTalk = require('../service/serviceTalk');
const serviceToken = require('../service/serviceToken');
const serviceWatchedAt = require('../service/serviceWatchedAt');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

const talkersJSON = path.resolve(__dirname, './talker.json');

app.get('/talker', async (_req, res) => {
  const allTalkers = JSON.parse(await fs.readFile(talkersJSON, 'utf8'));
  return res.status(200).json(allTalkers);
});

app.get('/talker/search', serviceToken, async (req, res) => {
  const allTalkers = JSON.parse(await fs.readFile(talkersJSON, 'utf8'));
  const { q } = req.query;
  const searchFiltered = allTalkers.filter((acc) => acc.name.includes(q));
    res.status(200).json(searchFiltered);
  });

app.get('/talker/:id', async (req, res) => {
  const allTalkers = JSON.parse(await fs.readFile(talkersJSON, 'utf8'));
  const flag = allTalkers.find(({ id }) => id === Number(req.params.id));
  if (!flag) {
    return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(flag);
});

app.post('/login', middlewareEmail, middlewarePassword, (_req, res) => {
  const token = lib();
  res.status(200).json({ token });
});

app.post('/talker', serviceToken, serviceName, serviceAge, serviceTalk, serviceWatchedAt,
  serviceRate,
  async (req, res) => {
  const allTalkers = JSON.parse(await fs.readFile(talkersJSON, 'utf-8'));
  const numberId = allTalkers.length + 1;
  const addTalker = { id: numberId, ...req.body };
  allTalkers.push(addTalker);
  await fs.writeFile(talkersJSON, JSON.stringify(allTalkers));
  res.status(201).json(addTalker);
});

app.put('/talker/:id', serviceToken, serviceName, serviceAge, serviceTalk, serviceWatchedAt,
  serviceRate,
  async (req, res) => {
  const numberId = Number(req.params.id);
  const talk = { numberId, ...req.body };
  const allTalkers = JSON.parse(await fs.readFile(talkersJSON, 'utf-8'));
  const acc = allTalkers.findIndex((i) => i.id === Number(numberId));
  allTalkers[acc] = talk;
  await fs.writeFile(talkersJSON, JSON.stringify(allTalkers));
  res.status(200).json(talk);
});

app.delete('/talker/:id', serviceToken, async (req, res) => {
  const numberId = Number(req.params.id);
  const allTalkers = JSON.parse(await fs.readFile(talkersJSON, 'utf-8'));
  const acc = allTalkers.findIndex((i) => i.id === Number(numberId));
  allTalkers.splice(acc, 1);
  await fs.writeFile(talkersJSON, JSON.stringify(allTalkers));
  res.sendStatus(204);
  });

  app.listen(PORT, () => {
  console.log('Online');
});