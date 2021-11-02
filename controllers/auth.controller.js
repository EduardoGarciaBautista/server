const  {response} = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const {generateJWT} = require("../helpers/jwt");


const login = async (req, response = response) => {
    const {email, password} = req.body;

    try {

        const user = await User.findOne({email});
        // verify email
        if (!user) {
            return response.status(404).json({
                ok: false,
                msg: `User or password not found.`
            });
        }

        // verify password
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return response.status(400).json({
                ok: false,
                msg: `User or password not found.`
            });
        }

        // Generate jwt


        const token = await generateJWT(user.id);

        response.status(500).json({
            ok: true,
            jwt: token
        });
    } catch (e) {
        console.log(e);
        response.status(500).json({
            ok: false,
            msh: 'Internal server error'
        });
    }
}


module.exports = {
    login
}
