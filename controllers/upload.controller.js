const {response} = require('express');
const {v4: uuidV4} = require('uuid');
const {updateImg} = require("../helpers/update-img");
const path = require('path');
const fs = require('fs');

const fileUpload = (req, res = response) => {

    const {type, id} = req.params;

    const validTypes = ['hospitals', 'medicos', 'users'];

    if (!validTypes.includes(type)) {
        res.status(404).json({
            ok: false,
            msg: 'Invalid type'
        });
    }
    // validate file
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({
            ok: false,
            msg: 'No files were uploaded.'
        });
    }

    // Process image...
    const file = req.files.image;

    const name = file.name.split('.');
    const ext = name[name.length - 1];

    // Validate ext
    const extensions = ['png', 'jpg', 'jpeg', 'gif'];

    if (!extensions.includes(ext)) {
        res.status(404).json({
            ok: false,
            msg: 'Invalid extension'
        });
    }

    // Generate file name
    const fileName = `${uuidV4()}.${ext}`;

    // Path to save file
    const path = `./uploads/${type}/${fileName}`;

    // Move image
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error moving file'
            });
        }
        // Update db
        updateImg(type, id, fileName);


        res.json({
            ok: true,
            msg: `File uploaded! ${fileName}`
        });
    });
}


const listFiles = (req, resp) => {
    const {type, file} = req.params;

    const pathImg = path.join(__dirname, `../uploads/${type}/${file}`);

    // Default image
    if (fs.existsSync(pathImg)) {
        resp.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/empty.jpg`);
        resp.sendFile(pathImg);
    }

}

module.exports = {
    fileUpload,
    listFiles
}
