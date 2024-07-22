const router = require('express').Router();
const { 
    createAdminAcount, 
    adminLogin, 
    findAdmin, 
    deleteAdmin, 
    updateAdmin 
} = require('../controler/admin')

//-----------------------ADMIN ROUTER---------------------------

router.post('/admin/create', createAdminAcount);
router.post('/admin/login', adminLogin);
router.get('/admin/search', findAdmin);
router.delete('/admin/delete', deleteAdmin);
router.put('/admin/update', updateAdmin);

module.exports = router;
