const {Router} = require('express');
const {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
} = require('../controllers/hospitals.controller');
const {validateJwt} = require('../middlewares/validate-jwt');
const {check} = require('express-validator');
const {validateFields} = require('../middlewares/validate-fields');

const router = Router();

router.get('/', getHospitals);

router.post('/', [
    validateJwt,
    check('name', 'Name is required').not().isEmpty(),
    validateFields
], createHospital);

router.put('/:id', [], updateHospital);

router.delete('/:id', deleteHospital);


module.exports = router;
