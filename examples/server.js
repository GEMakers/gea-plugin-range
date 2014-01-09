/*
 * Copyright (c) 2014 - General Electric - Confidential - All Rights Reserved
 * 
 * Author: Christopher Baker <christopher.baker2@ge.com>
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

