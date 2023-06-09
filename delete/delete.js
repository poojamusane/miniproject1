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
        "p_id": req.body.p_id
       
    }
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db('miniproject')
            db.collection('products').deleteOne(obj,(err)=>{
                if(err)
                    res.json({'delete':'Error '+err})
                else{
                    console.log('Data deleted')
                    res.json({'delete':'Success'})
                    conn.close()
                }
            })
        }
    })
})

// Delete user api
router.post("/deleteuser", (req, res) => {
  
    let obj = {
        "u_id": req.body.u_id
       
    }
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db('miniproject')
            db.collection('user_login').deleteOne(obj,(err)=>{
                if(err)
                    res.json({'delete':'Error '+err})
                else{
                    console.log('Data deleted')
                    res.json({'delete':'Success'})
                    conn.close()
                }
            })
        }
    })
})



//Delete product from cart
router.post("/deletecart", (req, res) => {
    let obj = {
        "p_id": req.body.p_id,
        "u_name" : req.body.u_name
    }
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db('miniproject')
            db.collection('cart').deleteOne(obj, (err) => {
                if (err)
                    res.json({ 'cartDelete': 'Error ' + err })
                else {
                    console.log(`Cart data for ${obj.u_name} deleted`)
                    res.json({ 'cartDelete': 'Success' })
                    conn.close()
                }
            })
        }
    })
})
//export router
module.exports = router
