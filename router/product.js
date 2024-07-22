const router = require('express').Router();

const { 
    addProduct, 
    getProduct, 
    productSearch, 
    productDelete, 
    productUpdate,
} = require('../controler/product');

//-----------------------CATEGORY ROUTER---------------------------

router.post('/product/create', addProduct);
router.get('/product/find', getProduct);
router.get('/product/search/:id', productSearch);
router.delete('/product/delete/:id', productDelete);
router.put('/product/update/:id', productUpdate);

module.exports = router;