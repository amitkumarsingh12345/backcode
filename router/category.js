const router = require('express').Router();

const { 
    addCategory, 
    findCategory, 
    searchCategory, 
    deleteCategory, 
    updateCategory 
} = require('../controler/category');

//-----------------------CATEGORY ROUTER---------------------------

router.post('/category/create', addCategory);
router.get('/category/find', findCategory);
router.get('/category/search/:key', searchCategory);
router.delete('/category/delete/:id', deleteCategory);
router.put('/category/update/:id', updateCategory);

module.exports = router;