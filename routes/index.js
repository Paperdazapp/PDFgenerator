var express = require('express');
var router = express.Router();
var controllers = require('../controllers');

/* GET home page. */
router.get('/', controllers.fillForm);
router.post('/', controllers.fillForm);

module.exports = router;
