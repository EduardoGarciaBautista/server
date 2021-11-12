const {Router} = require('express');
const {getMedico, createMedico, updateMedico, deleteMedico} = require("../controllers/medicos.controller");
const {validateJwt} = require("../middlewares/validate-jwt");
const {check} = require("express-validator");
const {validateFields} = require("../middlewares/validate-fields");

const router = Router();

router.get('/', getMedico);

router.post('/', [
    validateJwt,
    check('name', 'Name is required').not().isEmpty(),
    check('hospital', 'Hospital must be valid').isMongoId(),
    validateFields
], createMedico);

router.put('/:id', [
    validateJwt,
    check('name', 'Name is required').not().isEmpty(),
    check('hospital', 'Hospital must be valid').isMongoId(),
    validateFields
], updateMedico);

router.delete('/:id', deleteMedico);


module.exports = router;
