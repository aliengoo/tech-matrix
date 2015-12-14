"use strict";

let router = require('express').Router();
let UserAdapter = require('../pg-db/adapters/UserAdapter');
let models = require('../pg-db/models');

let userAdapter = new UserAdapter(models);

router.post('/api/registration/register', (req, res) => {
  userAdapter.create(req.body).then(user => res.json({
    success: true
  })).catch(error => res.status(500).json({
    success: false,
    error
  }));
});

module.exports = router;