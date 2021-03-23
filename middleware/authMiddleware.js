const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  // check json token exists and is verified
  if (token) {
    jwt.verify(token, "vaibhav varunkar secret", (err, decodeToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decodeToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

//check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if(token){
    jwt.verify(token, "vaibhav varunkar secret", async (err, decodeToken) => {
        if (err) {
          console.log(err.message);
          next();
          res.locals.user = null;
        } else {
        //   console.log(decodeToken);
          let user = await User.findById(decodeToken.id);
          res.locals.user = user;
          next();
        }
      });
    }
    else{
        res.locals.user = null;
        next();
    }
  }
  

module.exports = { requireAuth, checkUser };
