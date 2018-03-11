var mongoose = require('mongoose');

var Favorite = mongoose.model('Favorite',{
  name:{
    type: String,
    require:true,
    trim:true,
    minlength:1
  }
});

 module.exports = {
   Favorite:Favorite
 };
