var express = require('express');
var router = express.Router();

router.get('/list', function(req, res) {
  res.json(require('../mock/index-list.json'));
});

module.exports = router;
