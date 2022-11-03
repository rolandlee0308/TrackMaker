const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function (pwd) {
  return new Promise((res, rej) => {
    bcrypt.compare(pwd, this.password, (err, isMatch) => {
      if (err || !isMatch) return rej(err);

      res(true);
    });
  });
};

module.exports = mongoose.model("User", userSchema);
/*
Whenever a schema is modified, make sure to:
1. drop collection & database
2. restart backend server (close existing and open a new one)
*/
