var mongoose = require('mongoose');

var RecommendUser = mongoose.model('RecommendUser',{
  username:{
    type: String,
    require: true,
    trim: true,
    minlength: 1
  },
  favoriteMovie1:{
    type: String,
    require: true,
    trim:true,
    minlength:1
  },
  favoriteMovie2:{
    type: String,
    require: true,
    trim:true,
    minlength:1
  },
  favoriteMovie3:{
    type: String,
    require: true,
    trim:true,
    minlength:1
  }

});

 module.exports = {
   RecommendUser:RecommendUser
 };
