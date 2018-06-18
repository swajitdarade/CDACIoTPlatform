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
        if (e.type in rslt) {
          rslt[e.type].push(e.version)
        }
        else {
          rslt[e.type] = [e.version]
        }
      });
      res.json({
        success: true,
        msg: rslt
      });
    }

  })
});


router.post('/updateSensorType', (req, res) => {
  if (!req.body._id || !req.body.versionType) {
    res.json({
      success: false,
      msg: 'Insuficient data'
    });
  }
  else {
    SensorType.findSensorByID(req.body._id, (err, reqSensor) => {
      if (err) {
        res.json({
          success: false,
          msg: err
        });
      }
      else {
        if (req.body.versionType == 'major') {
          let STData = {
            ID: reqSensor._id,
            version: Math.floor(reqSensor.version + 1.0),
            fields: req.body.fields,
            events: req.body.events,
            actions: req.body.actions,
            depricated: reqSensor.depricated
          }
          SensorType.updateSensorByID(STData, (err) => {
            if (err) {
              res.json({
                success: false,
                msg: err
              });
            }
            else {
              res.json({
                success: true,
                msg: 'details sucessfully updated'
              });
            }
          })
        }
        else if (req.body.versionType == 'minor') {
          let STData = {
            ID: reqSensor._id,
            version: reqSensor.version + 0.1,
            fields: req.body.fields,
            events: req.body.events,
            actions: req.body.actions,
            depricated: reqSensor.depricated
          }
          SensorType.updateSensorByID(STData, (err) => {
            if (err) {
              res.json({
                success: false,
                msg: err
              });
            }
            else {
              res.json({
                success: true,
                msg: 'details sucessfully updated'
              });
            }
          })
        }
      }
    });
  }
});
router.post('/isdepricated', (req, res) => {
  if (!req.body._id || !req.body.depStatus) {
    res.json({
      success: false,
      msg: "Insufficient data"
    });
  }
  else {
    SensorType.findSensorByID(req.body._id, (err, reqSensor) => {
      if (err) {
        res.json({
          success: false,
          msg: err
        });
      }
      else {
        let STData = {
          ID: reqSensor._id,
          fields: reqSensor.fields,
          events: reqSensor.events,
          actions: reqSensor.actions,
          depricated: req.body.depStatus
        }
        SensorType.updateSensorByID(STData, (err) => {
          if (err) {
            res.json({
              success: false,
              msg: err
            });
          }
          else {
            res.json({
              success: true,
              msg: 'Deprication status sucessfully depricated'
            });
          }
        });
      }
    });
  }
});

module.exports = router;
