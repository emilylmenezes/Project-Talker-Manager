const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

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
  const results = JSON.parse(await fs.readFile(pathDirname, 'utf-8'));
  return results;
};

app.get('/talker', async (_request, response) => {
  const results = await onRequestTalkers();

  if (!results) { 
    return response.status(HTTP_OK_STATUS).send([]);
  } 
  response.status(HTTP_OK_STATUS).json(results);
});

app.listen(PORT, () => {
  console.log('Online');
});