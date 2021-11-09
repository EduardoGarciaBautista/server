const User = require('../models/user.model');
const {response} = require('express');
const bcrypt = require('bcryptjs');
const {generateJWT} = require("../helpers/jwt");
const {use} = require("express/lib/router");



const getUsers = async (req, res = response) => {

    const from = Number(req.query.from || 0);

    const [users, total] = await Promise.all([
        User.find({}, 'name email role google img')
            .skip(from)
            .limit(5),
        User.count()
    ]);



    res.json({
        msg: 'ok',
        users,
        uid: req.uid,
        total
    });
}


const createUser = async (req, res = response) => {
    const {email, password} = req.body;

    try {

        const existEmail = await User.findOne({email});

        if (existEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Email is already registered'
            });
        }

        const user = new User(req.body);

        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            user,
            jwt: token
        });

    } catch (e) {
        console.log(e);
        response.status(500).json({
            ok: false,
            msg: 'Internal server error'
        });
    }
}

const updateUser = async (req, resp = response) => {
    const {uid} = req.params;

    try {
        const userExists = await User.findById(uid);
        if (!userExists) {
            return resp.status(404).json({
                ok: false,
                msg: `User with uid ${uid} does not exists`
            });
        }
        const {password, google, email, ...fields} = req.body;

        // Update user
        if (userExists.email !== email) {
            const emailExists = await User.findOne({email});
            if (emailExists) {
                return resp.status(400).json({
                    ok: false,
                    msg: `The email ${email} is already in use.`
                });
            }
        }
        fields.email = email;

        const updatedUser = await User.findByIdAndUpdate(uid, fields, {new: true});

        return resp.status(200).json({
            ok: true,
            updatedUser
        });
        
    } catch (e) {
        console.log(e);
        resp.status(500).json({
            ok: false,
            msg: 'Internal server error'
        });
    }
}

const deleteUser = async  (req, resp = response) => {
    try {
        const {uid} = req.params;
        const userExists = await User.findById(uid);

        if (!userExists) {
            return resp.status(400).json({
                ok: false,
                msg: 'User does not exists'
            });
        }

        return resp.status(200).json({
            ok: false,
            msg: 'User deleted',
            uid
        });
    } catch (e) {
        console.log(e);
        return resp.status(500).json({
            ok: false,
            msg: 'Internal server error'
        });
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}
