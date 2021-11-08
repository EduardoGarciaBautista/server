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

const updateHospital = (req, resp = response) => {
    resp.json({
        ok: true,
        msg: 'getHospitals'
    });
}

const deleteHospital = (req, resp = response) => {
    resp.json({
        ok: true,
        msg: 'getHospitals'
    });
}


module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}
