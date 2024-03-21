'use strict';
const express     = require('express');
const bodyParser  = require('body-parser');
const fccTesting  = require('./freeCodeCamp/fcctesting.js');
const app         = express();
fccTesting(app);
const saltRounds = 12;
const myPlaintextPassword = 'sUperpassw0rd!';
const someOtherPlaintextPassword = 'pass123';
const bcrypt = require("bcrypt");

//START_ASYNC -do not remove notes, place code between correct pair of notes.
//requiring helmet
const helmet = require("helmet");
//let ninetyDaysInSeconds = 90*24*60*60;
//hiding powered by:
app.use(helmet.hidePoweredBy({setTo: "PHP 4.2.0" }));
/*app.use(helmet.frameguard({action: 'deny'}));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.use(helmet.hsts({maxAge: ninetyDaysInSeconds, force: true}));
app.use(helmet.dnsPrefetchControl());

app.use(helmet.contentSecurityPolicy({directives: {defaultSrc:(["'self'"]), scriptSrc:["'self'", 'trusted-cdn.com']}}));
*/
//simplifying the code above into a readable block, including all of the above
//app.use(helmet.noCache());
app.use (helmet({
  frameguard: {
    action: 'deny'
  },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", 'trusted-dcn.com'],
    }
  },
  dnsPrefetchControl: false,

}))

bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
    /*Store hash in your db*/
    console.log(hash);
    bcrypt.compare(myPlaintextPassword, hash, (err, res) => {
        console.log(res); //true
  });
});


//END_ASYNC

//START_SYNC
var hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
var result = bcrypt.compareSync(myPlaintextPassword, hash);


console.log(hash == result);
//END_SYNC





























const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Listening on port:", PORT)
});
