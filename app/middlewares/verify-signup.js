const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkEmailDuplicate = (req, res, next) => {
  User.findOne({
    email: req.body.email
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: "Email has already been taken." });
      return;
    }
    next();
  });
};

checkRoleExist = (req, res, next) => {
  if (req.body.roles) {
    for (var i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Role ${req.body.roles[i]} does not exist.`
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkEmailDuplicate,
  checkRoleExist,
};

module.exports = verifySignUp;
