const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  usertype: {
    type: String,
    required: true
  },
  phonenumber: {
    type: String,
    required: true
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
    date: {
    type: Date,
    default: Date.now
  }
});
UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex")
  
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest("hex")

  this.resetPasswordExpire =Date.now()+ 10 *(60 * 1000)

  return resetToken
}


const User = mongoose.model('User', UserSchema);

module.exports = User;