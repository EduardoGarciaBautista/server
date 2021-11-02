
const jwt = require('jsonwebtoken');

const validateJwt = (req, response , next) => {

    const token = req.header('x-token');
    if (!token) {
        return response.status(401).json({
            ok: false,
            msg: 'Unauthorized'
        });
    }
    try {

        const {uid} = jwt.verify(token, process.env.JWT_SECRETE);
        req.uid = uid;
        next();

    } catch (e) {
        console.log(e);
        return response.status(401).json({
            ok: false,
            msg: 'Invalid token'
        });
    }
}


module.exports = {
    validateJwt
}
