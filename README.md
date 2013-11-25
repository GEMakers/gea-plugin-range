# Range Plugin for the GEA SDK

This node.js package provides functionality for communicating with a range via the [GEA SDK](https://github.com/GEMakers/gea-sdk).

## Installation
To install this application using the node.js package manager, issue the following commands:

```
npm install git+https://github.com/GEMakers/gea-plugin-range.git
```

To include the plugin in your application, use the *plugin* function after configuring your application.

``` javascript
var gea = require("gea-sdk");
var adapter = require("gea-adapter-usb");

// configure your application
var app = gea.configure({
    address: 0xcb
});

// include the range plugin in your application
app.plugin(require("gea-plugin-range"));

// bind to the adapter to access the bus
app.bind(adapter, function (bus) {
    // the bus now has all of the range plugin functions
});

```

## Range API
Below is the documentation for each of the functions provided by this plugin, as well as a few examples showing how to use them.

### *bus.on("range")*
This event is emitted whenever a range has been discovered on the bus.
A range object is passed from the plugin to the function.
This range object inherits all functions and properties from the appliance object.

``` javascript
app.bind(adapter, function (bus) {
    bus.on("range", function (range) {
        console.log("address:", range.address);
        console.log("version:", range.version.join("."));
    });
});

```

### *range.twelveHourShutoff*

``` javascript
app.bind(adapter, function (bus) {
    bus.on("range", function (range) {
        range.twelveHourShutoff.read(function (value) {
            console.log("twelve hour shutoff:", value);
        });
        
        range.twelveHourShutoff.subscribe(function (value) {
            console.log("twelve hour shutoff changed:", value);
        });
        
        range.twelveHourShutoff.write(1, function () {
            console.log("twelve hour shutoff written");
        });
    });
});

```

### *range.endTone*

``` javascript
app.bind(adapter, function (bus) {
    bus.on("range", function (range) {
        range.endTone.read(function (value) {
            console.log("end tone:", value);
        });
        
        range.endTone.subscribe(function (value) {
            console.log("end tone changed:", value);
        });
        
        range.endTone.write(1, function () {
            console.log("end tone written");
        });
    });
});

```
