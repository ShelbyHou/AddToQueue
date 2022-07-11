var express = require('express');
var router = express.Router();

const NewSong = require('../models/NewSong');

const isLoggedIn = (req,res,next) => {
  if (res.locals.loggedIn) {
    next()
  }
  else res.redirect('/login')
}

/* GET users listing. */
router.get('/queue', 
  isLoggedIn,
  async (req, res, next)  => {
    const userId = res.locals.user._id;
    res.locals.songs= await NewSong.find({userId});
    res.render('queue');
});

router.post('/queue',
  isLoggedIn,
  async (req,res,next) => {
    try{
        const {songName,genre,artist} = req.body;
        const userId = res.locals.user._id;
        const song = 
          new NewSong(
            {songName,genre,artist,userId});
        await song.save();
        res.redirect('/queue')

    } catch(e){
        next(e)
    }
  })

module.exports = router;