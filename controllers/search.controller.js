const {request, response} = require('express');
const User = require('../models/user.model');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');

const searchAny = async (req = request, resp = response) => {
    const {searchParam} = req.params;

    const regExp = new RegExp(searchParam, 'i');
    const [users, medicos, hospitals] = await Promise.all([
        await User.find({name: regExp}),
        await Medico.find({name: regExp}),
        await Hospital.find({name: regExp}),
    ]);

    resp.status(200).json({
        ok: true,
        users,
        medicos,
        hospitals
    });
}


const searchInCollection = async (req = request, resp = response) => {
    const {searchParam, tbl} = req.params;
    const regExp = new RegExp(searchParam, 'i');

    let results = null;

    switch (tbl) {
        case 'medicos':
            results = await Medico.find({name: regExp});
            break;
        case 'hospitals':
            results = await Hospital.find({name: regExp});
            break;
        case 'users':
            results = await User.find({name: regExp});
            break;
        default:
            return resp.status(400).json({
                ok: false,
                msg: 'Incorrect collection'
            });
    }

    resp.status(200).json({
        ok: true,
        results
    });
}

module.exports = {
    searchAny,
    searchInCollection
}
