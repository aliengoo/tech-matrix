var express = require('express');

function errorHandlerFn(res) {
  return function(err) {
    res.status(500).send(err);
  }
}

function modelRouter(Model, modelName) {
  var router = express.Router();

  const modelPath = `/api/${modelName}`;

  // CRUD

  // create
  router.post(modelPath, (req, res) => {
    var model = new Model(req.body);
    model.$save().then(
      () => res.send(model),
      errorHandlerFn(res));
  });

  // find by id
  router.get(`${modelPath}/:id`, (req, res) => {
    Model.$findById(req.params.id).then(
      (model) => {
        if (model) {
          res.send(model);
        } else {
          res.status(404).send({
            message: `${modelPath}/${req.params.id} not found`
          });
        }
      },
      errorHandlerFn(res));
  });

  // paged query
  router.post(`${modelPath}/paged-query`, (req, res) => {
    Model.$pagedQuery(res.body.page, res.body.query).then(
      (results) => res.send(results),
      errorHandlerFn(res));
  });

  // update
  router.put(modelPath, (req, res) => {
    Model.$findOneAndUpdate(req.body).then(
      (model) => res.send(model),
      errorHandlerFn(res));
  });

  router.delete(`${modelPath}/:id`, (req, res) => {
    Model.$findByIdAndRemove(req.params.id).then(
      () => res.send({ok: true}),
      errorHandlerFn(res));
  });

  router.get(`${modelPath}/meta/names`, (req, res) => {
    Model.$getNames().then(
      (names) => res.send(names),
      errorHandlerFn(res));
  });

  return router;
}

module.exports = modelRouter;
