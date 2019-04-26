const express = require('express')
const router = express.Router()
const userCtrl = require('../controller/userCtrl')

router.post('/login.do',userCtrl.loginDo)
router.get('/home',userCtrl.home)
router.post('/userName.do',userCtrl.userNameDo)
router.post('/cheshi',function(req,resp){
    resp.send(req.body)
})
router.post('/details.do',userCtrl.detailsDo)

module.exports = router