const { Schema, model } = require("mongoose");


// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    unique: [true, 'Username already taken'],
    required: [true, 'Add an username'],
    trim: true
  },
  email: {
    type: String,
    unique: [true, 'An account with that email already exists'],
    required: [true, 'Add an email'],
    trim: true,
    lowecase: true
  },
  hashedPassword: {
    type: String,
    required: [true, 'Add an password'],
  }
});

const User = model("User", userSchema);

module.exports = User;
