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

function Range (bus, appliance, base) {
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
    
    appliance.fctMode = appliance.command({
        command: 0xa0,
        readData: [ 0xff ],
        format: "UInt8"
    });
    
    appliance.doorLock = appliance.command({
        command: 0xa4,
        format: [
            "upperOvenDoorLock:UInt8",
            "lowerOvenDoorLock:UInt8",
        ]
    });
    
    appliance.resetEEPROM = function() {
        appliance.send(0xa5, []);
    };
    
    appliance.elementStatus = appliance.command({
        writeCommand: 0xa6,
        readCommand: 0xa7,
        format: [
            "upperOvenElementStatus:UInt8",
            "lowerOvenElementStatus:UInt8",
        ]
    });
    
    appliance.convectionFan = appliance.command({
        writeCommand: 0xa8,
        readCommand: 0xa9,
        format: [
            "upperOvenConvectionFanDrivePercentage:UInt8",
            "upperOvenConvectionFanRotation:UInt8",
            "lowerOvenConvectionFanDrivePercentage:UInt8",
            "lowerOvenConvectionFanRotation:UInt8",
        ]
    });
    
    appliance.coolingFan = appliance.command({
        writeCommand: 0xaa,
        readCommand: 0xab,
        format: [
            "upperOvenCoolingFan:UInt8",
            "lowerOvenCoolingFan:UInt8",
        ]
    });
    
    appliance.coolingFanRevolutionsPerMinute = appliance.command({
        command: 0xac,
        endian: "big",
        format: [
            "upperOvenCoolingFanRevolutionsPerMinute:UInt16",
            "lowerOvenCoolingFanRevolutionsPerMinute:UInt16",
        ]
    });
    
    appliance.mainControlModuleStatus = appliance.command({
        command: 0xae,
        format: [
            "upperOvenCookMode:UInt8",
            "upperOvenErrors:Bytes@3",
            "lowerOvenCookMode:UInt8",
            "lowerOvenErrors:Bytes@3"
        ]
    });
    
    appliance.analogInputs = appliance.command({
        command: 0xaf,
        endian: "big",
        format: [
            "upperOvenRtdFine:UInt16",
            "upperOvenRtd:UInt16",
            "upperOvenProbe:UInt16",
            "lowerOvenRtdFine:UInt16",
            "lowerOvenRtd:UInt16",
            "lowerOvenProbe:UInt16"
        ]
    });
    
    appliance.inputStatus = appliance.command({
        command: 0xb1,
        endian: "big",
        format: [
            "upperOvenInputStatus:UInt16",
            "lowerOvenInputStatus:UInt16"
        ]
    });
    
    var userInterfaceBoard = bus.endpoint(0xf4, appliance.address);
    
    appliance.keysCurrentlyPressed = userInterfaceBoard.command({
        command: 0xb3,
        readData: [0],
        format: [
            "keyStatus:UInt8",
            "keyBitmap:Bytes"
        ]
    });
    
    appliance.latchedKeyPresses = userInterfaceBoard.command({
        command: 0xb3,
        readData: [1],
        format: [
            "keyStatus:UInt8",
            "keyBitmap:Bytes"
        ]
    });
    
    appliance.clearLatchedKeyPresses = function() {
        userInterfaceBoard.send(0xb3, [2]);
    };
    
    appliance.glassTouchErrors = userInterfaceBoard.command({
        command: 0xb3,
        readData: [3],
        format: [
            "keyStatus:UInt8",
            "keyBitmap:Bytes"
        ]
    });
    
    appliance.leds = appliance.command({
        command: 0xb4,
        format: [
            "upperOvenLedStatus:Bytes@13",
            "lowerOvenLedStatus:Bytes@13"
        ]
    });
    
    appliance.buzzerTone = appliance.command({
        command: 0xb5,
        format: "UInt8"
    });
    
    return appliance;
}

exports.plugin = function (bus, configuration, callback) {
    bus.on("appliance", function (appliance) {
        appliance.read(RANGE_BASE, function (value) {
            bus.emit("range", Range(bus, appliance, RANGE_BASE));
        });
    });
    
    var create = bus.create;
    
    bus.create = function (name, callback) {
        create(name, function (appliance) {
            if (name == "range") {
                appliance.address = configuration.address;
                appliance.version = configuration.version;
                Range(bus, appliance, RANGE_BASE);
            }
            
            callback(appliance);
        });
    };
    
    callback(bus);
};
