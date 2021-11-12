const {response} = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const {generateJWT} = require("../helpers/jwt");
const {googleVerify} = require("../helpers/google-verify");


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

        response.status(200).json({
            ok: true,
            jwt: token
        });
    } catch (e) {
        response.status(500).json({
            ok: false,
            msh: 'Internal server error'
        });
    }
}

const googleSignIn = async (req, response = response) => {
    const token = req.body.token;
    try {
        const {name, email, picture} = await googleVerify(token);

        // Verify email exists
        const userExists = await User.findOne({email});

        let user;
        if (!userExists) {
            user = new User({
                name,
                email,
                picture,
                password: 'empty',
                google: true
            });
        } else {
            user = userExists;
            user.google = true;
            user.password = 'empty';
        }

        // Save user

        await user.save();
        // Generate jwt
        const generatedToken = await generateJWT(user.id);


        response.status(200).json({
            ok: true,
            msg: 'OK',
            token: generatedToken
        });
    } catch (e) {
        response.status(402).json({
            ok: false,
            msg: 'Invalid token',
            e
        });
    }
}

const renewToken = async (req, resp = response) => {

    const {uid} = req.uid
    const token = await generateJWT(uid);

    resp.json({
        ok: true,
        token
    });
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}
