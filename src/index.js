const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const lib = require('../middlewares/lib');
const middlewareEmail = require('../middlewares/middlewareEmail');
const middlewarePassword = require('../middlewares/middlewarePassword');
const middlewareName = require('../middlewares/middlewareName');
const middlewareAge = require('../middlewares/middlewareAge');
const middlewareTalk = require('../middlewares/middlewareTalk');
const middlewareRate = require('../middlewares/middlewareRate');
const middlewareWatchedAt = require('../middlewares/middlewareWatchedAt');
const middlewareToken = require('../middlewares/middlewareToken');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

const talkerJSON = path.resolve(__dirname, './talker.json');

app.get('/talker', async (_req, res) => {
  const allTalkers = JSON.parse(await fs.readFile(talkerJSON, 'utf8'));
  return res.status(200).json(allTalkers);
});

app.get('/talker/search', middlewareToken, async (req, res) => {
  const allTalkers = JSON.parse(await fs.readFile(talkerJSON, 'utf8'));
  const { q } = req.query;
  const searchTalker = allTalkers.filter((talk) => talk.name.includes(q));
    res.status(200).json(searchTalker);
  });

app.get('/talker/:id', async (req, res) => {
  const allTalkers = JSON.parse(await fs.readFile(talkerJSON, 'utf8'));
  const flag = allTalkers.find(({ id }) => id === Number(req.params.id));
  if (!flag) {
    return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(flag);
});

app.post('/login', middlewareEmail, middlewarePassword, (_req, res) => {
  const libCrypto = lib();
  res.status(200).json({ libCrypto });
});

app.post('/talker', middlewareToken, middlewareName, middlewareAge,
  middlewareTalk, middlewareWatchedAt, middlewareRate,
  async (req, res) => {
  const allTalkers = JSON.parse(await fs.readFile(talkerJSON, 'utf-8'));
  const addTalker = { id: allTalkers.length + 1, ...req.body };
  allTalkers.push(addTalker);
  await fs.writeFile(talkerJSON, JSON.stringify(allTalkers));
  res.status(201).json(addTalker);
});

app.put('/talker/:id', middlewareToken, middlewareName, middlewareAge,
  middlewareTalk, middlewareWatchedAt, middlewareRate,
  async (req, res) => {
  const flag = Number(req.params.id);
  const newTalker = { flag, ...req.body };
  const allTalkers = JSON.parse(await fs.readFile(talkerJSON, 'utf-8'));
  const alertFind = allTalkers.findIndex((acc) => acc.id === Number(flag));
  allTalkers[alertFind] = newTalker;
  await fs.writeFile(talkerJSON, JSON.stringify(allTalkers));
  res.status(200).json(newTalker);
});

app.delete('/talker/:id', middlewareToken, async (req, res) => {
  const flag = Number(req.params.id);
  const allTalkers = JSON.parse(await fs.readFile(talkerJSON, 'utf-8'));
  const alert = allTalkers.findIndex((acc) => acc.id === Number(flag));
  allTalkers.splice(alert, 1);
  await fs.writeFile(talkerJSON, JSON.stringify(allTalkers));
  res.sendStatus(204);
  });
