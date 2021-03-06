const express = require('express')
const router = express.Router()
const pageCtrl=require("../controller/pageCtrl")

router.post('/details/details',pageCtrl.details)
router.post('/inShoppingCart/inShoppingCart',pageCtrl.shoppingCart)
router.post('/shoppingCart/shoppingCart',pageCtrl.shoppingCartData)
router.post('/delshoppingCart/delshoppingCart',pageCtrl.delshoppingCart)
router.post('/setorderData/setorderData',pageCtrl.setorderData)
router.post('/getorderData/getorderData',pageCtrl.getorderData)

module.exports = router