/*
 * This application will start a web server that exposes the fields in a range.
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

var http = require("http");
var fs = require("fs");
var gea = require("gea-sdk");
var adapter = require("gea-adapter-usb");

var app = gea.configure({
    address: 0xcb,
    version: [ 0, 1, 0 ]
});

app.plugin(require("gea-plugin-range"));

function child(root, fields) {
    for (var i = 0; i < fields.length; i++) {
        if (root) {
            root = root[fields[i]];
        }
    }

    return root;
}

function startWebServer(appliance, port) {
    function handle(request, content, callback) {
        var item = child(appliance, request.url.substr(1).split("/"));
        
        if (item) {
            if (request.method == "GET" && item.read) {
                item.read(function (value) {
                    callback(200, JSON.stringify(value, null, "\t"));
                });
            }
            else if (request.method == "PUT" && item.write) {
                item.write(JSON.parse(content));
                callback(200);
            }
            else {
                callback(500);
            }
        }
        else {
            callback(404);
        }
    }
    
    http.createServer(function (request, response) {
        var content = "";
            
        request.on("data", function(data) {
            content += data;
        });
        
        request.on("end", function() {
            handle(request, content, function (code, data) {
                response.writeHead(code, {
                    "Content-Type": "application/json"
                });
                
                response.end(data);
            });
        });
    }).listen(port);
}

app.bind(adapter, function (bus) {
    bus.once("appliance", function (appliance) {
        console.log("version:", appliance.version);
        startWebServer(appliance, 80);
    });
});

