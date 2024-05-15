const router = require('express').Router();

router.post('/', (req, res) => {
    res.send('signout');
});

module.exports = router;