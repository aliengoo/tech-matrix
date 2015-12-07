"use strict";

let router = require('express').Router();

router.get('/api/hello-world', (req, res) => {

  res.send({
    message: "Hello, World!"
  });
});

module.exports = router;
