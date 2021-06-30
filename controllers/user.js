
  const bcrypt = require('bcrypt');
  const User = require('../models/user');
  const sequelize = require('../util/database');
  const jwt = require('jsonwebtoken');
  const dotenv = require('dotenv');

  dotenv.config();

  function generateAccessToken(id) {
    console.log(process.env.TOKEN_SECRET);
    return jwt.sign(id,process.env.TOKEN_SECRET);
  };

  exports.postSignin = (req, res, next) => {
    //console.log(req);
    //res.send("hiiiiiiiiiiiiii");
    //console.log(req.body);
    const {email,password}=req.body;
    User.findAll({where:{email}}).then((users)=>{
      if(users.length>0){
        bcrypt.compare(password,users[0].password,function(err,response){
          if(err){
            console.log(err);
            return res.json({success:false,message:'Something went wrong'});
          }
          if(response){
            const jwttoken=generateAccessToken(users[0].id);
            return res.json({token:jwttoken,success:true,message:'Successfully logged in'});
          }
          else{
            return res.status(401).json({success:false,message:'Password do not match'});
          }

        });
      }
      else{
        return res.status(404).json({success:false,message:'User not found'});
      }
    });
   
  };
  exports.postSignup = (req, res, next) => {
      
    const { name, email, contact, password }=req.body;
    const saltRounds=10;
    //console.log(name);
   //res.send("hiiiiiiiiiiiiii");
   bcrypt.genSalt(saltRounds,function(err,salt){
       bcrypt.hash(password,salt,function(err,hash){
           if(err){
               console.log('err');
               return res.json({message:'unable to creat new user'});
           }
           else{
           User.create({name,email,contact,password: hash }).then(()=>{
               res.status(201).json({message:'successfuly created new user'});
           }).catch(err=>res.status(403).json({success:false,error:err}))}
       });
   });
 
   
  };