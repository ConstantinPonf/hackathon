
var cors = require('cors');
var express = require('express');
var multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
var app = express();
app.use(cors())


// opens IPFS node


var cors = require('cors');
var express = require('express');
var multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
var app = express();
app.use(cors())


  // opens express listener
  app.listen(8080, function () {
    console.log('App listening on port 8080!');
  });

  app.get("/test", (req, res) => {
    console.log(req.query)
    res.send("Läuft")
  });



