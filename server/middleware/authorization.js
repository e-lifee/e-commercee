const jwt = require('jsonwebtoken');
require('dotenv').config(); 

module.exports = function (req, res, next) {
    try {
        const jwtToken = req.header('token');
        
        // If no token returned, decline authorization
        if(!jwtToken) {

            return res.status(403).json('Not authorized');
        }

        // verify token, get user id
        const payload = jwt.verify(jwtToken, process.env.jwtSecret);

        req.user = payload.user;

        next();

        
    } catch (err) {
        return res.status(403).json('Not authorized');   
    }
};