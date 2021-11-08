const {request, response} = require('express');
const User = require('../models/user.model');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');

const searchAny = async (req = request, resp = response) => {
    const {searchParam} = req.params;

    const regExp = new RegExp(searchParam, 'i');
    const [users, medicos, hospitals] = await Promise.all([
        await User.find({ name: regExp }),
        await Medico.find({ name: regExp }),
        await Hospital.find({ name: regExp }),
    ]);

    resp.status(200).json({
        ok: true,
        users,
        medicos,
        hospitals
    });
}

module.exports = {
    searchAny
}
