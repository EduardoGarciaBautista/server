const {Router} = require('express');
const {check} = require('express-validator');
const {validateFields} = require("../middlewares/validate-fields");
const {
    getUsers,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/users.controller');
const {validateJwt} = require("../middlewares/validate-jwt");

const router = Router();

router.get('/', validateJwt, getUsers);


router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    validateFields,
] ,createUser);

router.put('/:uid', [
    validateJwt,
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('role', 'Role is required').not().isEmpty(),
    validateFields,
], updateUser);

router.delete('/:uid', validateJwt, deleteUser);


module.exports = router;
