ipfsService = require('./services/ipfsService');
contractService = require('./services/contractService');
var cors = require('cors');
var express = require('express');
var multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
var app = express();
app.use(cors())


// opens IPFS node
ipfsService.node.on('ready', () => {

  // opens express listener
  app.listen(8080, function () {
    console.log('App listening on port 8080!');
  });

  // sets http post listen
  app.post("/data", upload.single("file"), (req, res) => {
    ipfsService.uploadFile(req.file).then(result => {
      //console.log(result)
      dataJSON = JSON.parse(req.body.data)
      let data = {
        hash: result[0].hash,
        name: dataJSON.fileName,
        description: dataJSON.description,
      }
      console.log(data)
      contractService.writeData(data).then(resolve => { res.send(resolve) }, err => { res.send(err) })
    })
  });


  // sets http post listen
  app.get("/filelist", (req, res) => {
    contractService.getFileList().then(result => { res.send(result) })
  });

  app.get("/file", (req, res) => {
    contractService.getFileHash(req.query.id).then(hashName => {
      console.log(hashName)
      ipfsService.downloadFile(hashName[0]).then(file => {
        res.set('Content-disposition', 'attachment; filename=' + hashName[1]);
        res.send(file)
      })
    })
  });

  app.delete("/file", (req, res) => {
    console.log(req.query.id)
    contractService.deleteElement(req.query.id).then(result => {
      res.send(result);
    })
  });

})
