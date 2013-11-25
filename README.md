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

### *bus.on("range", callback)*
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
The twelve hour shutoff is read-only and has two possible values: 0 (disabled) or 1 (enabled).

``` javascript
app.bind(adapter, function (bus) {
    bus.on("range", function (range) {
        range.twelveHourShutoff.read(function (value) {
            console.log("read:", value);
        });
        
        range.twelveHourShutoff.subscribe(function (value) {
            console.log("subscribe:", value);
        });
    });
});

```

### *range.endTone*
The end tone is read-only and has two possible values: 0 (beep) or 1 (continuous tone).

``` javascript
app.bind(adapter, function (bus) {
    bus.on("range", function (range) {
        range.endTone.read(function (value) {
            console.log("read:", value);
        });
        
        range.endTone.subscribe(function (value) {
            console.log("subscribe:", value);
        });
    });
});

```

### *range.lightBar*
The light bar is read-only and has two possible values: 0 (disabled) or 1 (enabled).

``` javascript
app.bind(adapter, function (bus) {
    bus.on("range", function (range) {
        range.lightBar.read(function (value) {
            console.log("read:", value);
        });
        
        range.lightBar.subscribe(function (value) {
            console.log("subscribe:", value);
        });
    });
});

```

### *range.convectionConversion*
The convection conversion is read-only and has two possible values: 0 (disabled) or 1 (enabled).

``` javascript
app.bind(adapter, function (bus) {
    bus.on("range", function (range) {
        range.convectionConversion.read(function (value) {
            console.log("read:", value);
        });
        
        range.convectionConversion.subscribe(function (value) {
            console.log("subscribe:", value);
        });
    });
});

```

### *range.elapsedOnTime*
The elapsed on time is a read-only unsigned integer with units in minutes.

``` javascript
app.bind(adapter, function (bus) {
    bus.on("range", function (range) {
        range.elapsedOnTime.read(function (value) {
            console.log("read:", value);
        });
        
        range.elapsedOnTime.subscribe(function (value) {
            console.log("subscribe:", value);
        });
    });
});

```

### *range.activeFaultCodeStatus*
The active fault code status is a read-only array of bytes.
Each byte represents the fault code number.
Up to ten fault codes can be active at once.
Zero means no active fault.

``` javascript
app.bind(adapter, function (bus) {
    bus.on("range", function (range) {
        range.activeFaultCodeStatus.read(function (value) {
            console.log("read:", value);
        });
        
        range.activeFaultCodeStatus.subscribe(function (value) {
            console.log("subscribe:", value);
        });
    });
});

```

### *range.keyPressed*
The key press is a read-only unsigned integer representing the last key that was pressed on the user interface.
Each key has a pre-defined, unique number.

``` javascript
app.bind(adapter, function (bus) {
    bus.on("range", function (range) {
        range.keyPressed.read(function (value) {
            console.log("read:", value);
        });
        
        range.keyPressed.subscribe(function (value) {
            console.log("subscribe:", value);
        });
    });
});

```

### *range.ovenConfiguration*
The oven configuration is a read-only unsigned integer.
Each bit determines whether or not a hardware configuration is present (0 is not present, 1 is present).
- Knob model (bit 0)
- Warming drawer (bit 1)
- Light bar (bit 2)
- Lower oven (bit 3)
- Lower oven kitchen timer (bit 4)

``` javascript
app.bind(adapter, function (bus) {
    bus.on("range", function (range) {
        range.ovenConfiguration.read(function (value) {
            console.log("read:", value);
        });
        
        range.ovenConfiguration.subscribe(function (value) {
            console.log("subscribe:", value);
        });
    });
});

```

### *range.ovenModeMinMaxTemperature*
The oven mode for minimum and maximum temperature is a read-only object.
There are two fields in this object:
- maxTemperature (the maximum oven temperature in F)
- minTemperature (the minimum oven temperature in F)

``` javascript
app.bind(adapter, function (bus) {
    bus.on("range", function (range) {
        range.ovenModeMinMaxTemperature.read(function (value) {
            console.log("read:", value);
        });
        
        range.ovenModeMinMaxTemperature.subscribe(function (value) {
            console.log("subscribe:", value);
        });
    });
});

```

### *range.warmingDrawerState*
The twelve hour shutoff is read-only and has four possible values: 0 (Off), 1 (Low), 2 (Medium), and 3 (High).

``` javascript
app.bind(adapter, function (bus) {
    bus.on("range", function (range) {
        range.warmingDrawerState.read(function (value) {
            console.log("read:", value);
        });
        
        range.warmingDrawerState.subscribe(function (value) {
            console.log("subscribe:", value);
        });
    });
});

```
