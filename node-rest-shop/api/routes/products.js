const express = require('express');
const router = express.Router();

const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const ProductControler = require('../controllers/products');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');

    },
    filename: function(req, file, cb) {
        cb(null, new Date().getTime() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    //reject a file with some different extension
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 *1024 * 5
},
    fileFilter: fileFilter
});

router.get('/', ProductControler.products_get);

router.post('/', checkAuth, upload.single('productImage'), ProductControler.products_create_product);

router.get('/:productId', ProductControler.products_get_product);

router.patch('/:productId', checkAuth, ProductControler.products_update_product);

router.delete('/:productId', checkAuth, ProductControler.products_delete);

module.exports = router;
