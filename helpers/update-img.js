const User = require('../models/user.model');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');
const fs = require('fs');

const deleteImage = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path)
    }
}

const updateImg = async (type, id, fileName) => {
    let oldPath = '';
    switch (type) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                return false;
            }
            oldPath = `./uploads/medicos/${medico.img}`;
            deleteImage(oldPath);
            medico.img = fileName;
            await medico.save();
            return true;

        case 'hospitals':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                return false;
            }
            oldPath = `./uploads/hospitals/${hospital.img}`;
            deleteImage(oldPath);
            hospital.img = fileName;
            await hospital.save();
            return true;
        case 'users':
            const user = await User.findById(id);
            if (!user) {
                return false;
            }
            oldPath = `./uploads/hospitals/${user.img}`;
            deleteImage(oldPath);
            user.img = fileName;
            await user.save();
            return true;
        default:
            break;
    }
}


module.exports = {
    updateImg
}
