function messageRate(req, res, next) {
  const { rate } = req.body.talk;
  const validate = Number.isInteger(rate);

  if (rate === undefined) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' }); 
  } if (!validate || rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }); 
  }
  next();
}

module.exports = messageRate;