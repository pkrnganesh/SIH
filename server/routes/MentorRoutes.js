const express = require('express');
const { getMentors} = require('../controllers/MentorController');

const router = express.Router();

router.get('/', getMentors);
// router.get('/search', searchMentorsByDomain);

module.exports = router;