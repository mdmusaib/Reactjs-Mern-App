var mongojs = require('mongojs');
const express = require("express");
const bodyParser = require("body-parser");
const assert = require('assert');
var userlist = mongojs('userlist', ['user']);
var cors = require('cors')
const app=express();
var obj_id = mongojs.ObjectId;
// Connection URL
// const router = express.Router();
app.use(cors())
// allow-cors
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/delete',function(req,res){
  if(req.body.id._id == "") return res.sendStatus(400)
userlist.user.remove({_id:obj_id(req.body.id._id)},function(err,result){
if(err) throw err
  res.status(200).send(result)
});
});


app.post('/api/update',function(req,res){
if(req.body.id == "") return res.sendStatus(400)
  userlist.user.findAndModify({
    query: { _id: obj_id(req.body.id) },
    update: { $set: {
            "username": req.body.username,
            "address": req.body.address,
            "contact":req.body.contact,
            "email":req.body.email
          }
        },
         upsert: true,
         new:true,
  },function(err,result){
    if(err) throw err
      res.status(200).send(result)
  }); 

});

app.post('/api/add',function(req,res){
  if (req.body.username == "" && req.body.email == "") return res.sendStatus(400)
  	var username=req.body.username;
  	var address=req.body.address;
  	var contact=req.body.contact;
  	var email=req.body.email;
	userlist.user.insert({ 
		username,
		address,
		contact,
		email
    }, function (err, data) {
        if (err) {
            throw err;
        }
        insertedData = data;
        console.log(insertedData);
        res.status(200).send(insertedData);
});

});

app.post('/api/allUser',function(req,res){
userlist.user.find({}).toArray(function(err,result){
if(err) throw err;
res.status(200).send(result);
});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
