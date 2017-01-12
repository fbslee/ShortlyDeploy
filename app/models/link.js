var crypto = require('crypto');
var mongoose = require('mongoose');

// var Link = db.model('Link', linkSchema);

var linkSchema = new mongoose.Schema({
      url: String,
      baseUrl: String,
      code: String,
      title: String,
      visits: Number
    });

mongoose.model('Link', linkSchema);

// module.exports = Link;
  // tableName: 'urls',
  // hasTimestamps: true,
  // defaults: {
  //   visits: 0
  // },
  // initialize: function() {
  //   this.on('creating', function(model, attrs, options) {
  //     var shasum = crypto.createHash('sha1');
  //     shasum.update(model.get('url'));
  //     model.set('code', shasum.digest('hex').slice(0, 5));
  //   });
  // }
module.exports = linkSchema
