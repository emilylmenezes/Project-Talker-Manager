const fs = require('fs').promises;
const path = require('path');

const talkersJSON = 'src/talker.json';

async function requestTalkers() {
    try {
      const response = await fs.readFile(path.resolve(talkersJSON));
      const list = JSON.parse(response);
      return list;
    } catch (error) {
        return [];
}
}

async function responseDados(id, parametro) {
    try {
        const previousTalkers = await requestTalkers();
        const alterationTalker = { id, ...parametro };
        const newTalkers = previousTalkers.reduce((acc, index) => {
        if (index.id === alterationTalker.id) return [...acc, alterationTalker];
        return [...acc, index];
        }, []);

      const dado = JSON.stringify(newTalkers);
      await fs.writeFile(path.resolve(talkersJSON), dado);
      return alterationTalker;
    } catch (error) {
        return error;
    }
}

module.exports = {
    requestTalkers,
    responseDados,
};