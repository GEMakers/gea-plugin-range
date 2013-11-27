/*
 * Copyright (c) 2013 - General Electric - Confidential - All Rights Reserved
 * 
 * Author: Christopher Baker <christopher.baker2@ge.com>
 *  
 */

const RANGE_BASE = 0x5000;
const UPPER_OVEN_BASE = 0x5100;
const LOWER_OVEN_BASE = 0x5200;

function Oven (appliance, base) {
    this.cookMode = appliance.erd({
        erd: base++,
        endian: "big",
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
    });
    
    this.currentState = appliance.erd({
        erd: base++,
        format: "UInt8"
    });
    
    this.delayTimeRemaining = appliance.erd({
        erd: base++,
        endian: "big",
        format: "UInt16"
    });
    
    this.probeDisplayTemperature = appliance.erd({
        erd: base++,
        endian: "big",
        format: "Int16"
    });
    
    this.cookTimeRemaining = appliance.erd({
        erd: base++,
        endian: "big",
        format: "UInt16"
    });
    
    this.displayTimer = appliance.erd({
        erd: base++,
        endian: "big",
        format: "UInt16"
    });
    
    this.userTemperatureOffset = appliance.erd({
        erd: base++,
        format: "Int8"
    });
    
    this.probePresent = appliance.erd({
        erd: base++,
        format: "UInt8"
    });
    
    this.elapsedCookTime = appliance.erd({
        erd: base++,
        endian: "big",
        format: "UInt32"
    });
    
    this.displayTemperature = appliance.erd({
        erd: base++,
        endian: "big",
        format: "UInt16"
    });
    
    this.remoteEnable = appliance.erd({
        erd: base++,
        format: "UInt8"
    });
}

function Range (appliance, base) {
    appliance.twelveHourShutoff = appliance.erd({
        erd: base++,
        format: "UInt8"
    });
    
    appliance.endTone = appliance.erd({
        erd: base++,
        format: "UInt8"
    });
    
    appliance.lightBar = appliance.erd({
        erd: base++,
        format: "UInt8"
    });
    
    appliance.convectionConversion = appliance.erd({
        erd: base++,
        format: "UInt8"
    });
    
    appliance.elapsedOnTime = appliance.erd({
        erd: base++,
        endian: "big",
        format: "UInt32"
    });
    
    appliance.activeFaultCodeStatus = appliance.erd({
        erd: base++,
        format: "Bytes@10"
    });
    
    appliance.keyPressed = appliance.erd({
        erd: base++,
        format: "UInt8"
    });
    
    appliance.ovenConfiguration = appliance.erd({
        erd: base++,
        endian: "big",
        format: "UInt16"
    });
    
    appliance.ovenModeMinMaxTemperature = appliance.erd({
        erd: base++,
        endian: "big",
        format: [
            "maxTemperature:UInt16",
            "minTemperature:UInt16",
        ]
    });
    
    appliance.warmingDrawerState = appliance.erd({
        erd: base++,
        format: "UInt8"
    });
    
    appliance.upperOven = new Oven(appliance, UPPER_OVEN_BASE);
    appliance.lowerOven = new Oven(appliance, LOWER_OVEN_BASE);
    
    return appliance;
}

exports.plugin = function (bus, configuration, callback) {
    bus.on("appliance", function (appliance) {
        appliance.read(RANGE_BASE, function (value) {
            bus.emit("range", Range(appliance, RANGE_BASE));
        });
    });
    
    var create = bus.create;
    
    bus.create = function (name, callback) {
        create(name, function (appliance) {
            if (name == "range") {
                Range(appliance, RANGE_BASE);
            }
            
            callback(appliance);
        });
    };
    
    callback(bus);
};
