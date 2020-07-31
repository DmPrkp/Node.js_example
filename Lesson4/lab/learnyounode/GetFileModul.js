var fs = require('fs');
var path = require('path');

module.exports = function (directory, extension, callback) {
    fs.readdir(directory, function (err, list) {
        if (err) return callback(err);
        else {
            list = list.filter(function (file) {
                if(path.extname(file) === '.' + extension) return true;
            })
            return callback(null, list);
        }
    })
}

//answer of autor///////////////////////////////////////////////////////////////////////

'use strict'
const fs = require('fs')
const path = require('path')

module.exports = function (dir, filterStr, callback) {
  fs.readdir(dir, function (err, list) {
    if (err) {
      return callback(err)
    }

    list = list.filter(function (file) {
      return path.extname(file) === '.' + filterStr
    })

    callback(null, list)
  })
}
