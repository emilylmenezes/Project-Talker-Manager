function serviceWatchedAt(req, res, next) {
  const { watchedAt } = req.body.talk;
  const regexOfDate = /^([1-9]|0[1-9]|[12][0-9]|3[0-1])\/([1-9]|0[1-9]|1[0-2])\/\d{4}$/;
  const format = watchedAt.match(regexOfDate);
  
  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' }); 
  }

  if (!format) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }); 
  }
  next();
}

module.exports = serviceWatchedAt;
