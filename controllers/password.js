const User = require('../models/user');


exports.postforgot = (req, res, next) => {
    console.log(req.body);
    res.json({success:true});
  };