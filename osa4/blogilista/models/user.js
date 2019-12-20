const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    minlength: 3
  },
  passwordHash: { type: String },
  name: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }    
  ]
});


userSchema.options.toJSON = {
  transform: (document, returnedDocument) => {
    delete returnedDocument.passwordHash;
    return returnedDocument;
  },
  virtuals: true
}

userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);
module.exports = User;
