const {response} = require('express');
const Hospital = require('../models/hospital.model');

const getHospitals = async (req, resp = response) => {

    try {
    const hospitals = await Hospital.find()
        .populate('user', 'name img');
        resp.status(200).json({
            ok: true,
            hospitals
        });
    } catch (e) {
        console.log(e);
        resp.status(500).json({
            ok: false,
            msg: 'Internal server error'
        });
    }
}

const createHospital = async (req, resp = response) => {

    const uid = req.uid;
    try {
        const hospital = new Hospital({...req.body, user: uid});
        const savedHospital = await hospital.save();
        resp.status(200).json({
            ok: true,
            savedHospital
        });
    } catch (e) {
        console.log(e);
        resp.status(500).json({
            ok: false,
            msg: 'Internal server error'
        });
    }
}

const updateHospital = async (req, resp = response) => {

    try {

        const {id} = req.params;
        const {uid} = req;

        let hospital = Hospital.findById(id);
        if (!hospital) {
            resp.status(404).json({
                ok: false,
                msg: 'Invalid hospital'
            });
        }

        const changes = {
            ...req.body,
            user: uid
        }
        const updatedHospital = await Hospital.findByIdAndUpdate(id, changes, {new: true})
        resp.status(200).json({
            ok: true,
            msg: 'OK',
            updatedHospital
        });

    } catch (e) {
        resp.status(500).json({
            ok: false,
            msg: 'Internal server error'
        });
    }
}

const deleteHospital = async (req, resp = response) => {

    try {

        const {id} = req.params;
        const {uid} = req;

        let hospital = Hospital.findById(id);
        if (!hospital) {
            resp.status(404).json({
                ok: false,
                msg: 'Invalid hospital'
            });
        }

        await Hospital.findByIdAndDelete(id);

        resp.status(200).json({
            ok: true,
            msg: 'Hospital deleted',
        });

    } catch (e) {
        resp.status(500).json({
            ok: false,
            msg: 'Internal server error'
        });
    }
}


module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}
