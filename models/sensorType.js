const mongoose = require('mongoose');

// Defining the schema for Users
const SensorTypeSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
        unique:true
    },
    version: {
        type: Number,
        required: true,
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

// Naming and exporting  the user mongoose model
const SensorType = module.exports = mongoose.model('SensorType', SensorTypeSchema);

module.exports.getAllSensorType = function (callback) {
    SensorType.find(callback);
};

module.exports.addSensorType = function (Sensortype, callback) {
    SensorType.create(Sensortype, callback);
};