const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const OrderControler = require('../controllers/orders');

//Handle incoming GET requests
router.get('/', checkAuth, OrderControler.orders_get_all);

router.post('/', checkAuth, OrderControler.orders_create_order);

router.get('/:orderId', checkAuth, OrderControler.orders_get_order);


router.delete('/:orderId', checkAuth, OrderControler.orders_delete);

module.exports = router;
