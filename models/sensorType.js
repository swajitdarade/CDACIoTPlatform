const mongoose = require('mongoose');

// Defining the schema for Users
const SensorTypeSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
        unique:true
    },
    latestversion: {
        type: String,
        default : "v0.0"
    },
    versions: [
        new mongoose.Schema({
            version:{
                type: String,
                required: true,
                default : "v0.0"
            },
            fields: [new mongoose.Schema({
                field: {
                    type: String,
                    required: true
                },
                title: {
                    type: String,
                    required: true
                },
                type: {
                    type: String,
                    enum: ["integer", "string", "boolean"],
                    required: true
                },
                default: {
                    type: String,
                    required: true
                },
                required: {
                    type: Boolean,
                    default: false
                }
            })],
            actions: [new mongoose.Schema({
                type: {
                    type: String,
                    required: true
                },
                fields: [{
                    type: String
                }]
            })],
            events: [new mongoose.Schema({
                type: {
                    type: String,
                    required: true
                },
                fields: [{
                    type: String
                }]
            })],
            date: {
                type: Number,
                default: new Date()
            },
            deprecated: {
                type: Boolean,
                default: false
            }
        })
    ]

});

// SensorTypeSchema.index({
//     type: 1,
//     version: 1
// }, {
//     unique: true
// });

// Naming and exporting  the user mongoose model
const SensorType = module.exports = mongoose.model('SensorType', SensorTypeSchema);

module.exports.getAllSensorType = function (callback) {
    SensorType.find(callback);
};

module.exports.addSensorType = function (Sensortype, callback) {
    SensorType.create(Sensortype, callback);
};

module.exports.findSensorByID = function(sensorID,callback){
    SensorType.findById(sensorID,callback)
};

module.exports.updateSensorByID = function(sensorDetails,callback){
    let query = {
        version:sensorDetails.version,
        fields:sensorDetails.fields,
        events:sensorDetails.events,
        actions:sensorDetails.actions,
        deprecated:sensorDetails.deprecated
    }
    SensorType.findByIdAndUpdate(sensorDetails.ID,query,callback);
}

module.exports.getBySensorType = function (Sensortype,callback) {
    SensorType.find({'type':Sensortype},callback);
};

module.exports.getSensorType = function (callback) {
    SensorType.find(callback);
};

