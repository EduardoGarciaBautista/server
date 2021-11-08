const {response} = require('express');

const Medico = require('../models/medico.model');

const getMedico = async (req, resp = response) => {
    try {
        const medicos = await  Medico.find()
            .populate('user', 'name img')
            .populate('hospital', 'name');

        resp.status(200).json({
            ok: false,
            medicos
        });
    } catch (e) {
        console.log(e);
        resp.status(500).json({
            ok: false,
            msg: 'Internal Server Error'
        });
    }
}

const createMedico = async (req, resp = response) => {
    try {
        const uid = req.uid;
        const medico = await new Medico({...req.body, user: uid}).save();
        resp.status(200).json({
            ok: true,
            medico
        });
    } catch (e) {
        console.log(e);
        resp.status(500).json({
            ok: false,
            msg: 'Internal Server Error'
        });
    }
}

const updateMedico = (req, resp = response) => {
    resp.json({
        ok: true,
        msg: 'getHospitals'
    });
}

const deleteMedico = (req, resp = response) => {
    resp.json({
        ok: true,
        msg: 'getHospitals'
    });
}


module.exports = {
    getMedico,
    createMedico,
    updateMedico,
    deleteMedico
}
