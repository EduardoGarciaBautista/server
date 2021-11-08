const {Router} = require('express');
const {validateJwt} = require('../middlewares/validate-jwt');
const {searchAny} = require('../controllers/search.controller');


const router = Router();


router.get('/:searchParam', validateJwt, searchAny);

module.exports = router;
