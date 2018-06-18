const mongoose = require('mongoose');

// Defining the schema for Users
const SensorTypeSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    version: {
        type: Number,
        default: 0.0
    },
    fields: {
        type: Array,
        default: []
    },
    actions: {
        type: Array,
        default: []
    },
    events: {
        type: Array,
        default: []
    },
    date: {
        type: Number,
        default: new Date()
    },
    deprecated: {
        type: Boolean,
        default:false
    }
});

SensorTypeSchema.index({ type: 1, version: 1 }, { unique: true });

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