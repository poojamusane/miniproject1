//import modules
const express = require('express')
let mongodb = require('mongodb')
//import url
let url = require('../url')
//create mongoclient
let mcl = mongodb.MongoClient
//create router instance
let router = express.Router()
//create rest api
router.post("/", (req, res) => {
    let obj = {
        "p_id": req.body.p_id,
        "p_name": req.body.p_name,
        "p_category": req.body.p_category,
        "p_cost":req.body.p_cost,
        "p_desc":req.body.p_desc,
        "p_url":req.body.p_url
        


    }
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db('miniproject')
            db.collection('products').insertOne(obj,(err)=>{
                if(err)
                    res.json({'insert':'Error '+err})
                else{
                    console.log('Data inserted')
                    res.json({'insert':'Success'})
                    conn.close()
                }
            })
        }
    })
})


// user insert api
router.post("/insertuser", (req, res) => {
    let obj = {
        "u_id": req.body.u_id,
        "u_name": req.body.u_name,
        "u_pwd": req.body.u_pwd,
        "u_mail":req.body.u_mail
    }
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db('miniproject')
            db.collection('user_login').insertOne(obj,(err)=>{
                if(err)
                    res.json({'insert':'Error '+err})
                else{
                    console.log('Data inserted')
                    res.json({'insert':'Success'})
                    conn.close()
                }
            })
        }
    })
})



//insert product into cart
router.post("/cartinsert", (req, res) => {
    let obj = {
        "u_name" : req.body.u_name,
        "p_id" : req.body.p_id,
        "p_cost" : req.body.p_cost,
        "p_qty" : req.body.p_quantity
    }
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db('miniproject')
            db.collection('cart').insertOne(obj,(err)=>{
                if(err)
                    res.json({'cartInsert':'Error '+err})
                else{
                    console.log('Product in cart inserted quantity:- ',obj.p_quantity)
                    res.json({'cartInsert':'Success'})
                    conn.close()
                }
            })
        }
    })
})
//export router
module.exports = router
