const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  comments: Array,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

blogSchema.set('toJSON', {
  transform: (document, returnedDocument) => {
    returnedDocument.kokeilu = "xxxxxx";
    return returnedDocument;
  },
  virtuals: true
});

module.exports = mongoose.model('Blog', blogSchema);

