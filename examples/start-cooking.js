/*
 * This application will attempt to start a cook mode on the upper oven. If
 * remote control is disabled on the oven, an error is printed and the user
 * is asked to press the remote enable button on the range. Once remote
 * control is enabled, the cook mode is started.
 *
 * Copyright (c) 2014 General Electric
 *  
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *  
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
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

