function middlewareEmail(req, res, next) {
  const { email } = req.body;
  const regex = /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const format = email.match(regex);
  
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  
  if (!format) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
}

module.exports = middlewareEmail;