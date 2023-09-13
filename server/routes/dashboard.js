const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get('/', authorization, async(req, res) => {
    try {
        
        //req.user has the payload
        const user = await pool.query("SELECT email FROM users WHERE user_id = $1", [req.user]);
        res.json(user.rows[0]);

    } catch (err) {
        res.status(500).json('Server Error');
    }
});
module.exports = router;