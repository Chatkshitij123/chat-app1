const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//Add the functionality to match the password
userSchema.methods.matchPassword = async function (enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
  //this is showing here which object is calling this function
}
//function for encrypting the password
//pre- before saving check the password or run this function 
//it is taking next as a parameter because it is a middleware
userSchema.pre("save", async function (next) {
  if(!this.isModified("password")){
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  //before adding the user to the we have to encrypt the passoword
});



const User = mongoose.model("User", userSchema);
module.exports = User;
