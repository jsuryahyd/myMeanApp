const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.send('not allowed directly\nGo to <a href="users/user-register">Registeration</a>');

})

//Register page
router.get('/user-register', (req, res, next) => {
	res.send('user registeration here');
});

//authentication
router.post('/authenticate', (req, res, next) => {
	res.send('authenticate here by passport!?');
})

module.exports = router;