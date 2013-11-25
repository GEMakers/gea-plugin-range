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

### *range.upperOven.cookMode*
The upper oven has a cook mode object.
There are ten fields in this object, some of which are optional when writing:
- mode (the cook mode, see [cook modes](https://github.com/GEMakers/gea-plugin-range#cook-modes) below)
- cookTemperature (the cook temperature in F)
- cookHours (the hour part of the cook time)
- cookMinutes (the minute part of the cook time)
- probeTemperature (the probe temperature in F, default: 0)
- delayHours (the hour part of the delay time, default: 0)
- delayMinutes (the minute part of the delay time, default: 0)
- twoTempTemperature (the two temp temperature in F, default: 0)
- twoTempHours (the hour part of the two temp time, default: 0)
- twoTempMinutes (the minute part of the two temp time, default: 0)

``` javascript
app.bind(adapter, function (bus) {
    bus.on("range", function (range) {
        range.upperOven.cookMode.read(function (value) {
            console.log("read:", value);
        });
        
        range.upperOven.cookMode.subscribe(function (value) {
            console.log("subscribe:", value);
        });
        
        range.upperOven.cookMode.write({
            mode: 18,
            cookTemperature: 350,
            cookHours: 1,
            cookMinutes: 0
        });
    });
});

```

## Appendix

### Cook modes
The following is a list of the available cook modes and their enumerated value.
Note that some of these values are not allowed to be set remotely, even when remote enabled.

- No Mode - 0
- Bake No Option - 1
- Bake Probe - 2
- Bake Delay Start - 3
- Bake Timed Warm - 4
- Bake Timed Two Temp - 5
- Bake Probe Delay Start - 6
- Bake Timed Shutoff Delay Start - 7
- Bake Timed Warm Delay Start - 8
- Bake Timed TwoTemp Delay Start - 9
- Bake Sabbath - 10
- Broil Low - 11
- Broil High - 12
- Proof No Option - 13
- Proof Delay Start - 14
- Warm No Option - 15
- Warm Probe - 16
- Warm Delay Start - 17
- Convection Bake No Option - 18
- Convection Bake Probe - 19
- Convection Bake Delay Start - 20
- Convection Bake Timed Warm - 21
- Convection Bake Timed TwoTemp - 22
- Convection Bake Probe Delay Start - 23
- Convection Bake Timed Shutoff Delay Start - 24
- Convection Bake Timed Warm Delay Start - 25
- Convection Bake Timed TwoTemp Delay Start - 26
- Convection Multi-Bake No Option - 27
- Convection Multi-Bake Probe - 28
- Convection Multi-Bake Delay Start - 29
- Convection Multi-Bake Timed Warm - 30
- Convection Multi-Bake Timed TwoTemp - 31
- Convection Multi-Bake Probe Delay Start - 32
- Convection Multi-Bake Timed Shutoff Delay Start - 33
- Convection Multi-Bake Timed Warm Delay Start - 34
- Convection Multi-Bake Timed TwoTemp Delay Start - 35
- Convection Roast No Option - 36
- Convection Roast Probe - 37
- Convection Roast Delay Start - 38
- Convection Roast Timed Warm - 39
- Convection Roast Timed TwoTemp - 40
- Convection Roast Probe Delay Start - 41
- Convection Roast Timed Shutoff Delay Start - 42
- Convection Roast Timed Warm Delay Start - 43
- Convection Roast Timed TwoTemp Delay Start - 44
- Convection Broil Low No Option - 45
- Convection Broil High No Option - 46
- Convection Broil Crisp No Option - 47
- Convection Broil Crisp Probe - 48
- Custom Self Clean - 49
- Custom Self Clean Delay Start - 50
- Steam Clean - 51
- Steam Clean Delay Start - 52
- Dual Broil Low No Option - 53
- Dual Broil High No Option - 54

