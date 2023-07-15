const express = require('express');
const { findIntersectingPoints } = require('../controllers/points');
const { checkHeaders, validateSchema } = require('../controllers/auth');
const router = express.Router();

router.post('/points',checkHeaders,validateSchema,findIntersectingPoints);


module.exports = router;