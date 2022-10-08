function serviceWatchedAt(req, res, next) {
  const getRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    const { watchedAt } = req.body.talk;
    if (!watchedAt) {
        return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    if (!getRegex.test(watchedAt)) {
        return res.status(400).json({ message:
          'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next(); 
}

module.exports = serviceWatchedAt;
