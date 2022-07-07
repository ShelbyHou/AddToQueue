'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

var newsongSchema = Schema( {
  userId: {type:Schema.Types.ObjectId, ref:'User'},
  songName: String,
  genre: String,
  artist: String,
} );

module.exports = mongoose.model( 'SongItem', newsongSchema );