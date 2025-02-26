const JWT = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        // Get token
        const token = req.headers['authorization'].split(' ')[1];
        JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: 'Un-authorized user',
                })
            } else {
                req.body.id = decoded.id;
                next();
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'No auth token!',
            error
        })
    }
}
module.exports = { authMiddleware }