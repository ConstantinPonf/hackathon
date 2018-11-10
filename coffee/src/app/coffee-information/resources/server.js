var cors = require('cors');
var express = require('express');
var fs = require('fs')
var app = express();
var triggered = false;
app.use(cors())


  // opens express listener
  app.listen(8081, function () {
    console.log('App listening on port 8081!');
  });

  app.get("/test", (req, res) => {
    console.log(req.query)
    if(req.query["triggered"] == "1"){
      triggered= true;
      console.log("Send 1")
      res.send("1");
    }
    else{
      triggered = false;
      res.send("0")
    }
    
  });



