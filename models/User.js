'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

var userSchema = Schema( {
  username: String,
  passphrase: String,
  email: String,
} );

module.exports = mongoose.model( 'User', userSchema );
//'User' the name to appear on Compass