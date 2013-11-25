/*
 * Copyright (c) 2013 - General Electric - Confidential - All Rights Reserved
 * 
 * Author: Christopher Baker <christopher.baker2@ge.com>
 *  
 */

var stream = require("binary-stream");

const MAX_ERD_LENGTH = 100;

var TWELVE_HOUR_SHUTOFF = {
    erd: 0x5000,
    endian: stream.BIG_ENDIAN,
    format: "UInt8"
};

var UPPER_OVEN_COOK_MODE = {
    erd: 0x5100,
    endian: stream.BIG_ENDIAN,
    format: [
        "mode:UInt8",
        "cookTemperature:UInt16",
        "cookHours:UInt8",
        "cookMinutes:UInt8",
        "probeTemperature:UInt16:0",
        "delayHours:UInt8:0",
        "delayMinutes:UInt8:0",
        "twoTempTemperature:UInt16:0",
        "twoTempHours:UInt8:0",
        "twoTempMinutes:UInt8:0"
    ]
};

function Range (appliance) {
    appliance.twelveHourShutoff = appliance.erd(TWELVE_HOUR_SHUTOFF);
    appliance.upperOvenCookMode = appliance.erd(UPPER_OVEN_COOK_MODE);
    
    return appliance;
}

exports.plugin = function (bus, configuration, callback) {
    bus.on("appliance", function (appliance) {
        appliance.erd(TWELVE_HOUR_SHUTOFF).read(function (value) {
            bus.emit("range", Range(appliance));
        });
    });
    
    callback(bus);
};

