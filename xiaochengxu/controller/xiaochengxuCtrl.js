const shipping = require('./data').shipping
const order = require('./data').order
const orderDetails = require('./data').orderDetails
const shoppingCart = require('./data').shoppingCart

module.exports = {
    shouye(req, resp) {
        let src = ['/images/banner1.jpg', '/images/banner2.jpg', '/images/banner3.jpg', '/images/banner4.jpg']
        // console.log(shipping)
        data = {
            data: [src, shipping],
            msg: '获取轮播成功',
            returnCode: 200
        }
        data = JSON.stringify(data)
        resp.send(data)
    },
    setOrder(req, resp) {
        let { user, shippingID, shippingNum, shippingPrice } = req.body
        let time = new Date()
        let thisOrder = {
            orderNum: time.getTime(),
            user: user,
            shippingID: shippingID,
            shippingNum: shippingNum,
            orderTime: time.getTime()
        }
        let thisOrderDetails = {
            orderNum: time.getTime(),
            user: user,
            address: '',
            phone: '',
            name: '',
            money: shippingPrice * shippingNum,
            payTime: '',
            payMoney: '',
            state: '10'
        }
        order.push(thisOrder)
        orderDetails.push(thisOrderDetails)
        let data = {
            returnCode: 200,
            msg: '加入订单成功',
            data: {
                orderNum: time.getTime()
            }
        }
        data = JSON.stringify(data)
        resp.send(data)
    },
    order(req, resp) {
        let thisOrderNum = req.body.orderNum
        let thisOrderData =[]
        let shippingData =[]
        for (let i = 0; i < order.length; i++) {
            if (order[i] && order[i].orderNum == thisOrderNum) {
                thisOrderData.push(order[i])
            }
        }
        for (let i = 0; i < shipping.length; i++) {
            for(let j = 0; j < shipping.length; j++){
                if (thisOrderData[j] && shipping[i].shippingId == thisOrderData[j].shippingID) {
                    shippingData.push(shipping[i])
                }
            }
            
        }
        if (thisOrderData[0]) {
            var data = {
                returnCode: 200,
                msg: '订单查询成功',
                data: []
            }
            for(let i=0;i<thisOrderData.length;i++){
                data.data.push(
                    {
                        shippingName: shippingData[i].shippingName,
                        shippingNum: thisOrderData[i].shippingNum,
                        shippingPrice: shippingData[i].shippingPrice,
                        shippingPic_one: shippingData[i].shippingPic_one,
                        orderNum: thisOrderData[i].orderNum,
                        orderTime: thisOrderData[i].orderTime,
                        shippingSp:shippingData[i].shippingSp
                    }
                )
            }
        } else {
            var data = {
                returnCode: -1,
                msg: '订单查询失败',
                data: []
            }
        }
        data = JSON.stringify(data)
        resp.send(data)
    },
    delCart(req,resp){
        let {shippingId,user}=req.body
        for(let i=0;i<shoppingCart.length;i++){
            if(shoppingCart[i].user===user&&shoppingCart[i].shippingId===shippingId){
                shoppingCart.splice(i,1)
            }
        }
        let data = {
            returnCode: 200,
            msg: '删除成功'
        }
        data = JSON.stringify(data)
        resp.send(data)
    }
}