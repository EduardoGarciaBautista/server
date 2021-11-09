const {Router} = require('express');
const {validateJwt} = require('../middlewares/validate-jwt');
const {searchAny, searchInCollection} = require('../controllers/search.controller');


const router = Router();


router.get('/:searchParam', validateJwt, searchAny);

router.get('/collection/:tbl/:searchParam', validateJwt, searchInCollection);

module.exports = router;
