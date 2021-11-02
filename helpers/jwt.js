const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {
    return new Promise((resolve, reject) => {
        jwt.sign({
            uid
        }, process.env.JWT_SECRETE, {
            expiresIn: '12h',
        }, (e, token) => {
            if (e) {
                console.log(e);
                reject('Can not generate jwt');
            } else {
                resolve(token);
            }
        })
    })
}

module.exports = {
    generateJWT
}
