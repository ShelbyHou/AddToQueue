var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const layouts = require("express-ejs-layouts");
const axios = require('axios');
const session = require("express-session"); 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(layouts);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



const kpopGenre = [
  {genre:'Synthpop',
   url:'<iframe width="1368" height="793" src="https://www.youtube.com/embed/TNWMZIf7eSg" title="[MV] SUNMI(선미) _ Siren(사이렌)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
   song:'Siren',artist:'Sunmi',
   intro:'Synth-pop is a subgenre of new wave music that first became prominent in the late 1970s and features the synthesizer as the dominant musical instrument.',
  },
  {genre:'Rock',
   url:'<iframe width="1352" height="624" src="https://www.youtube.com/embed/dwywhL1PenQ" title="DAY6 "How Can I Say(어떻게 말해)" M/V" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
   song:'How Can I Say',artist:'Day6',
   intro:'Rock music is a broad genre of popular music that originated as "rock and roll" in the United States in the late 1940s and early 1950s, developing into a range of different styles in the mid-1960s and later, particularly in the United States and the United Kingdom. It has its roots in 1940s and 1950s rock and roll, a style that drew directly from the blues and rhythm and blues genres of African-American music and from country music. Rock music also drew strongly from a number of other genres such as electric blues and folk, and incorporated influences from jazz, classical, and other musical styles. For instrumentation, rock has centered on the electric guitar, usually as part of a rock group with electric bass, drums, and one or more singers.',
  },
  {genre:'K-Hip Hop',
   url:'<iframe width="1352" height="624" src="https://www.youtube.com/embed/O6hIkekUMNM" title="[SMTM4] Song Minho with ZICO – ′Okey Dokey ‘ @Final Round 1 EP.10" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
   song:'Okey Dokey',artist:'Mino, Zico',
   intro:'It is widely considered to have originated in the late 1980s and early 1990s, and has since become increasingly popular, both in Korea and abroad. While Korea\'s hip hop culture includes various elements including rap, graffiti, DJing, Turntablism, and b-boying, rapping takes up a big part of the culture and the term "hip hop" is largely recognized and understood as "rap" in Korea.',
  },
  {genre:'Smooth Jazz',
   url:'<iframe width="1352" height="624" src="https://www.youtube.com/embed/WfYgbFBFe1E" title="[MV] 수지(Suzy), 백현(BAEKHYUN) - Dream" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
   song:'Dream',artist:'Suzy, Baekhyun',
   intro:'Smooth Jazz is a genre of commercially-oriented crossover jazz and easy listening music that became dominant in the mid 1970s to the early 1990s.'
  },
  {genre:'Electronic',
   url:'<iframe width="1352" height="624" src="https://www.youtube.com/embed/d1D1SJ-KqaQ" title="WINNER - \'EVERYDAY\' M/V" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
   song:'Everyday',artist:'WINNER',
   intro:'Electronic music is a genre of music that employs electronic musical instruments, digital instruments, or circuitry-based music technology in its creation. It includes both music made using electronic and electromechanical means. Pure electronic instruments depended entirely on circuitry-based sound generation, for instance using devices such as an electronic oscillator, theremin, or synthesizer. Electromechanical instruments can have mechanical parts such as strings, hammers, and electric elements including magnetic pickups, power amplifiers and loudspeakers. Such electromechanical devices include the telharmonium, Hammond organ, electric piano and the electric guitar.',
  },
  {genre:'90s Hip Hop',
   url:'<iframe width="1352" height="624" src="https://www.youtube.com/embed/A5H8zBb3iao" title="NCT U 엔시티 유 \'90\'s Love\' MV\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>',
   song:'90s Love',artist:'NCT U',
   intro:'From the \'80s to \'90s, hip hop experienced its Golden Age where innovative artists were changing the genre with every release.',
  },
  {genre:'Electronic',
   url:'<iframe width="1352" height="624" src="https://www.youtube.com/embed/X-iJZ0gfKPo" title="NCT DREAM 엔시티 드림 \'BOOM\' MV" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>',
   song:'Contemporary R&B',artist:'NCT Dream',
   intro:'Contemporary R&B is a popular music genre that combines rhythm and blues with elements of pop, soul, funk, hip hop, and electronic music. The genre features a distinctive record production style, drum machine-backed rhythms, pitch corrected vocals, and a smooth, lush style of vocal arrangement. Electronic influences are becoming an increasing trend and the use of hip hop or dance-inspired beats are typical, although the roughness and grit inherent in hip hop may be reduced and smoothed out.',
  },
];


app.get('/genre',
  (req,res,next) => {
    res.locals.kpopGenre = kpopGenre;
    res.render('genre');
})

app.post('/genre',
  async (req,res,next) => {
    res.locals.choosegenre = req.body.choosegenre;
    res.locals.kpopGenre = kpopGenre;
    res.locals.version = '1.0.0';
    res.render('playVideo');
});


const idols = require('./public/data/idols.json')






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
