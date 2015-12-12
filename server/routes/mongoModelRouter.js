var express = require('express');

function errorHandlerFn(res) {
  return function (err) {
    res.status(500).json({
      err
    });
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
      () => res.json(model),
      errorHandlerFn(res));
  });

  // find by id
  router.get(`${modelPath}/:id`, (req, res) => {
    Model.$findById(req.params.id).then(
      (model) => {
        if (model) {
          res.send(model);
        } else {
          res.status(404).json({
            message: `${modelPath}/${req.params.id} not found`
          });
        }
      },
      errorHandlerFn(res));
  });

  // paged query
  router.post(`${modelPath}/paged-query`, (req, res) => {
    Model.$pagedQuery(req.body.page, req.body.query).then(
      (results) => res.json(results),
      errorHandlerFn(res));
  });

  router.post(`${modelPath}/text-search`, (req, res) => {

    console.log(req.body);
    Model.$textSearch(req.body.query).then(
      (results) => res.json(results),
      errorHandlerFn(res));
  });

  // update
  router.put(modelPath, (req, res) => {
    Model.$findOneAndUpdate(req.body).then(
      (model) => res.json(model),
      errorHandlerFn(res));
  });

  router.delete(`${modelPath}/:id`, (req, res) => {
    Model.$findByIdAndRemove(req.params.id).then(
      () => res.json({ok: true}),
      errorHandlerFn(res));
  });

  router.get(`${modelPath}/meta/names`, (req, res) => {
    Model.$getNames().then(
      (names) => res.json(names),
      errorHandlerFn(res));
  });

  return router;
}

module.exports = modelRouter;
