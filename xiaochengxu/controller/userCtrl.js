const userDao = require('../dao/userDao')

const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
//生成token的方法
function  generateToken(data){
    let created = Math.floor(Date.now() / 1000);
    let secretOrPrivateKey="jwt"
    let token = jwt.sign({
        data,
        exp: created + 60
    }, secretOrPrivateKey);
    return token;
}

module.exports = {
    loginDo(req,resp){
        let {user,password}= req.body
        console.log(user,password)
        userDao.userDao().then(function(connection){
            connection.query('SELECT u_id FROM t_user WHERE u_phone = ? AND u_pwd =?',[user,password])
            .then(function(data){
                if(data.length>0){
                    let val = data[0];
                    console.log(val)
                    let uid = val['u_id'];
                    console.log(uid)
                    let token = generateToken({uid});
                    console.log(data)
                    console.log(token)
                    resp.send({token,data})
                }else{
                    resp.send('0')
                }
            })
        })
        
    },
    home(req,resp){
        resp.redirect('home.html')
    },
    userNameDo(req,resp){
        
        let token = req.body.currentCookie
        let secretOrPrivateKey="jwt"
        console.log(token)
        jwt.verify(token,secretOrPrivateKey,function(err,data){
            if(err){
                console.log(err)
                resp.send('0')
            }else{
                console.log('1')
                userDao.userDao().then(function(connection){
                    connection.query('SELECT u_nickname FROM t_user WHERE u_id=4',[])
                        .then(function(data){
                            if(data.length>0){
                                resp.send(data)
                            }else{
                                resp.send('0')
                            }
                            
                        })
                })
            }
        })
    },
    getTokenDo(req,resp){
        let {user}=req.body
        console.log(user)
        let token = generateToken({user});
        resp.send(token)
    },
    detailsDo(req,resp){
        console.log(req.body)
        let src = "http://172.17.4.251:9999/images/3.jpg"
        resp.send(src)
    }
}
