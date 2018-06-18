var express = require('express');
var router = express.Router();

const SensorType = require('../models/sensorType');

router.get("/", (req, res) => {
  SensorType.getAllSensorType((err, data) => {
      if (err)
          res.json({
              success: false,
              msg: err
          });
      else
          res.json({
              success: true,
              msg: data
          });
  })
});

router.get("/getAll", (req, res) => {
  SensorType.getAllSensorType((err, data) => {
      if (err)
          res.json({
              success: false,
              msg: err
          });
      else {
        var rslt = {}
        data.forEach(e => {
          if (e.type in rslt){
            rslt[e.type].push(e.version)
          }
          else {
            rslt[e.type]= [e.version]
          }
        });
        res.json({
          success: true,
          msg: rslt
        });
      }
          
  })
});


router.post('/createSensorType', function(req, res) {
  if (!req.body.type || !req.body.fields || !req.body.actions || !req.body.events){
    res.json({
      success: false,
      msg: 'Insuficient data'
    });
  }
  else if (req.body.fields.length == 0){
    res.json({
      success: false,
      msg: 'Fields should have atleast one value'
    });
  }
  else if (req.body.actions.length == 0){
    res.json({
      success: false,
      msg: 'Actions should have atleast one value'
    });
  }
  else if (req.body.events.length == 0){
    res.json({
      success: false,
      msg: 'Events should have atleast one value'
    });
  }
  else {
    let STData = {
      type : req.body.type,
      fields: req.body.fields,
      events: req.body.events,
      actions:req.body.actions,
    }
    SensorType.addSensorType(STData,(err,resp)=>{
      if (err)
          res.json({
              success: false,
              msg: err
          });
      else
          res.json({
              success: true,
              msg: 'Sensortype added successfully'
          });
    });
  }
  
});

module.exports = router;
