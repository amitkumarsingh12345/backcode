const router = require('express').Router();
const { addOrder, deleteOrder, orderGet } = require('../controler/order');

//-----------------------ORDER ROUTER---------------------------

router.post('/order/create', addOrder);
router.get('/order/search', orderGet);
router.delete('/order/delete/:id', deleteOrder);

module.exports = router;