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
    let p_id= req.body.p_id
    let obj = {
        
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
            db.collection('products').updateOne({p_id},{$set:obj},(err)=>{
                if(err)
                    res.json({'update':'Error '+err})
                else{
                    console.log('Data updated')
                    res.json({'update':'Success'})
                    conn.close()
                }
            })
        }
    })
})


// update user api

router.post("/updateuser", (req, res) => {
    let u_id= req.body.u_id
    let obj = {
        
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
            db.collection('user_login').updateOne({u_id},{$set:obj},(err)=>{
                if(err)
                    res.json({'update':'Error '+err})
                else{
                    console.log('Data updated')
                    res.json({'update':'Success'})
                    conn.close()
                }
            })
        }
    })
})


//Update product in cart
router.post("/updatecart", (req, res) => {
    let p_id = req.body.p_id
    let u_name = req.body.u_name
    let obj = { "p_quantity": req.body.p_quantity }
    //connect to mongodb
    mcl.connect(url, (err, conn) => {

        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db('miniproject')
            db.collection('cart').updateOne({ p_id, u_name }, { $set: obj }, (err) => {
                if (err)
                    res.json({ 'cartUpdate': 'Error ' + err })
                else {
                    console.log(`Cart Data for ${u_name} updated`)
                    
                    res.json({ 'cartUpdate': 'Success' })
                    conn.close()
                }
            })
        }
    })
})
//export router
module.exports = router
