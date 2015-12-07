let router = require('express').Router();

router.get('/api/product/:id', (req, res) => {
  res.send({
    name: "GBS",
    description: "General Business System",
    created: Date.now(),
    updated: Date.now(),
    vendor: "Homebrew"
  });

});

module.exports = router;
