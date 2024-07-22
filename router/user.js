const router = require('express').Router();
const {
    createUserAcount,
    userLogin,
    findUser, 
    deleteUser,
    updataUser
} = require('../controler/user');

//-----------------------USER ROUTER---------------------------

router.post('/user/create', createUserAcount);
router.post('/user/login', userLogin);
router.get('/user/search/:id', findUser);
router.delete('/user/delete/:id', deleteUser);
router.put('/user/update', updataUser);

module.exports = router;