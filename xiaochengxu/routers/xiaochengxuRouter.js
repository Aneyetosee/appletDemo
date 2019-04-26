const express = require('express')
const router = express.Router()
const xiaochengxuCtrl = require('../controller/xiaochengxuCtrl')

router.post('/index/shouye',xiaochengxuCtrl.shouye)
router.post('/setOrder/setOrder',xiaochengxuCtrl.setOrder)
router.post('/order/order',xiaochengxuCtrl.order)
router.post('/delCart/delCart',xiaochengxuCtrl.delCart)

module.exports = router