
  const bcrypt = require('bcrypt');
  const User = require('../models/user');
  const Expense = require('../models/expense');
  const sequelize = require('../util/database');
  const jwt = require('jsonwebtoken');
  const dotenv = require('dotenv');

  dotenv.config();

  function generateAccessToken(id) {
    //console.log(process.env.TOKEN_SECRET);
    return jwt.sign(id,process.env.TOKEN_SECRET);
  };

  exports.postSignin = (req, res, next) => {
    //console.log(req);
    //res.send("hiiiiiiiiiiiiii");
    //console.log(req.body);
    const {email,password}=req.body;
    console.log(req.body);
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

  exports.authenticate = (req, res, next) => {
    
    //console.log(req.header('authorization'));
    try{
      const token =req.header('authorization');
      //console.log(token);
      const userid=Number(jwt.verify(token,process.env.TOKEN_SECRET));
      //console.log(userid);
      User.findAll({ where: { id: userid } }).then(users=>{
        const user=users[0];
        //console.log(user);
        //console.log(JSON.stringify(user));
        req.user=user;
       
        next();
      }).catch((err)=>{throw new Error(err)});
    }
    catch(err){
      console.log(err);
      return res.status(401).json({success:false});

    };   
  };

  exports.postaddexpense = (req, res, next) => {
    console.log(req.body);
    
    const {amount,description,category}=req.body;
    //console.log(typeof(amount));
    req.user.createExpense({amount,description,category}).then((expense)=> {
      return res.status(201).json({expense, success:true});
    }).catch((err)=>{
      return res.status(402).json({success:false,error:err});
    })
  };

  exports.getexpenses = (req, res)=> {
    //console.log(req.user.ispremiumuser);
    req.user.getExpenses().then(expenses => {
        return res.status(200).json({expenses,ispremiumuser:req.user.ispremiumuser, success: true})
    })
    .catch(err => {
        return res.status(402).json({ error: err, success: false})
    })
}

exports.deleteexpense = (req, res) => {
    const expenseid = req.params.expenseid;
    Expense.destroy({where: { id: expenseid }}).then(() => {
        return res.status(204).json({ success: true, message: "Deleted Successfuly"})
    }).catch(err => {
        console.log(err);
        return res.status(403).json({ success: true, message: "Failed"})
    })
}

