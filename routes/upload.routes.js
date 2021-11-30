const {Router} = require('express');
const expressFileUpload = require('express-fileupload');
const {validateJwt} = require('../middlewares/validate-jwt');
const {fileUpload, listFiles} = require('../controllers/upload.controller');



const router = Router();

router.use(expressFileUpload());

router.put('/:type/:id', validateJwt, fileUpload);

router.get('/:type/:file', listFiles);


module.exports = router;
