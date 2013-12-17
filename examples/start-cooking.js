/*
 * Copyright (c) 2013 - General Electric - Confidential - All Rights Reserved
 * 
 * Author: Christopher Baker <christopher.baker2@ge.com>
 *
 * This application will attempt to start a cook mode on the upper oven. If
 * remote control is disabled on the oven, an error is printed and the user
 * is asked to press the remote enable button on the range. Once remote
 * control is enabled, the cook mode is started.
 *
 */

var gea = require("gea-sdk");
var adapter = require("gea-adapter-usb");

var app = gea.configure({
    address: 0xcb
});

app.plugin(require("gea-plugin-range"));

app.bind(adapter, function (bus) {
    bus.once("range", function (range) {
        console.log("range version:", range.version.join("."));
        
        range.upperOven.remoteEnable.subscribe(function (enabled) {
            if (enabled) {
                console.log("remote control is enabled!");
                console.log("starting to cook.");
                console.log("press the cancel button to stop cooking.");
                
                range.upperOven.cookMode.write({
                    mode: 18,                    // convection bake no option
                    cookTemperature: 350,        // degrees in fahrenheit
                    cookHours: 1,                // number of hours
                    cookMinutes: 0               // number of minutes
                });
            }
            else {
                console.error("remote control is disabled!");
                console.error("press the remote enable button.");
            }
        });
    });
});

