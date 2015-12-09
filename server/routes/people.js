var router = require('express').Router();

router.get('/api/people', (req, res) => {
  res.send([
    'homer',
    'marge',
    'bart',
    'lisa',
    'maggie'
  ]);
});

module.exports = router;
