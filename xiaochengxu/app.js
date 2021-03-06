const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')


//创建router变量
const userRouter = require('./routers/userRouter')
const xiaochengxuRouter = require('./routers/xiaochengxuRouter')
const pageRouter = require('./routers/pageRouter')

const app = express()

//日志
app.use(logger('dev'))

//post传递
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//router引入
app.use(userRouter)
app.use(xiaochengxuRouter)
app.use(pageRouter)

//页面拦截
app.use(express.static(__dirname+'/src'))


//配置网页小icon
app.listen(9999,()=>{
    console.log('9999服务器已启动')
})
