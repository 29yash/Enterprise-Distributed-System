var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://admin:admin123@ds241133.mlab.com:41133/homeaway", {poolSize:100});
mongoose.connect("mongodb://admin:admin123@ds151853.mlab.com:51853/homeaway_prod", {poolSize:100});
module.exports = mongoose;