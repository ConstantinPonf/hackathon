var cors = require('cors');
var express = require('express');
var fs = require('fs')
var app = express();
app.use(cors())


  // opens express listener
  app.listen(8081, function () {
    console.log('App listening on port 8081!');
  });

  app.get("/test", (req, res) => {
    console.log(req.query)
    res.send("11")
  });



