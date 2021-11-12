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

const updateMedico = async (req, resp = response) => {
    const {id} = req.params;
    try {
        const medico = await Medico.findById(id);

        if (!medico) {
            resp.status(404).json({
                ok: false,
                msg: 'Medico not found'
            });
        }

        const changes = {
            ...req.body,
        }
        const updatedMedico = await Medico.findByIdAndUpdate(id, changes, {new : true});
        resp.json({
            ok: true,
            updatedMedico
        });
    } catch (e) {
        resp.status(500).json({
            ok: false,
            msg: 'Internal server error',
            e
        });
    }
}

const deleteMedico = async (req, resp = response) => {
    const {id} = req.params;
    try {
        const medico = Medico.findById(id);

        if (!medico) {
            resp.status(404).json({
                ok: false,
                msg: 'Medico not found'
            });
        }

        await Medico.findByIdAndDelete(id);

        resp.status(200).json({
            ok: true,
            msg: 'Medico deleted'
        });
    } catch (e) {
        resp.status(500).json({
            ok: false,
            msg: 'Internal server error',
        });
    }
}


module.exports = {
    getMedico,
    createMedico,
    updateMedico,
    deleteMedico
}
