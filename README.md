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
The twelve hour shutoff is an integer value of the [enabled state](#enabled-state) enumeration.

``` javascript
app.bind(adapter, function (bus) {
    bus.on("range", function (range) {
        range.twelveHourShutoff.read(function (value) {
            console.log("read:", value);
        });
        
        range.twelveHourShutoff.subscribe(function (value) {
            console.log("subscribe:", value);
        });
        
        range.twelveHourShutoff.write(1);
    });
});

```

### *range.endTone*
The end tone is an integer value of the [end tone](#end-tone) enumeration.

``` javascript
app.bind(adapter, function (bus) {
    bus.on("range", function (range) {
        range.endTone.read(function (value) {
            console.log("read:", value);
        });
        
        range.endTone.subscribe(function (value) {
            console.log("subscribe:", value);
        });
        
        range.endTone.write(0);
    });
});

```

### *range.lightBar*
The light bar is an integer value of the [enabled state](#enabled-state) enumeration.

``` javascript
app.bind(adapter, function (bus) {
    bus.on("range", function (range) {
        range.lightBar.read(function (value) {
            console.log("read:", value);
        });
        
        range.lightBar.subscribe(function (value) {
            console.log("subscribe:", value);
        });
        
        range.lightBar.write(1);
    });
});

```

### *range.convectionConversion*
The convection conversion is an integer value of the [enabled state](#enabled-state) enumeration.

``` javascript
app.bind(adapter, function (bus) {
    bus.on("range", function (range) {
        range.convectionConversion.read(function (value) {
            console.log("read:", value);
        });
        
        range.convectionConversion.subscribe(function (value) {
            console.log("subscribe:", value);
        });
        
        range.convectionConversion.write(1);
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
The warming drawer state is an integer value of the [warming drawer state](#warming-drawer-state) enumeration.

``` javascript
app.bind(adapter, function (bus) {
    bus.on("range", function (range) {
        range.warmingDrawerState.read(function (value) {
            console.log("read:", value);
        });
        
        range.warmingDrawerState.subscribe(function (value) {
            console.log("subscribe:", value);
        });
        
        range.warmingDrawerState.write(2);
    });
});

```

### *range.upperOven.cookMode*
The upper oven has a cook mode object.
There are ten fields in this object, some of which are optional when writing:
- mode (the cook mode, see [cook mode](#cook-mode) below)
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

### *range.upperOven.currentState*
The current upper oven state is a read-only integer value of the [oven state](#oven-state) enumeration.

``` javascript
app.bind(adapter, function (bus) {
    bus.on("range", function (range) {
        range.upperOven.currentState.read(function (value) {
            console.log("read:", value);
        });
        
        range.upperOven.currentState.subscribe(function (value) {
            console.log("subscribe:", value);
        });
    });
});

```

### *range.upperOven.delayTimeRemaining*
The upper oven delay time remaining is a read-only integer value of the [oven state](#oven-state) enumeration.

``` javascript
app.bind(adapter, function (bus) {
    bus.on("range", function (range) {
        range.upperOven.currentState.read(function (value) {
            console.log("read:", value);
        });
        
        range.upperOven.currentState.subscribe(function (value) {
            console.log("subscribe:", value);
        });
    });
});

```

## Appendix

### Enabled state
The following is a list of the available enabled states and their enumerated value.

| Value   | Name     |
|:-------:|:---------|
| 0       | Disabled |
| 1       | Enabled  |

### End tone
The following is a list of the available end tones and their enumerated value.

| Value   | Name            |
|:-------:|:----------------|
| 0       | Beep            |
| 1       | Continuous tone |

### Warming drawer state
The following is a list of the available warming drawer states and their enumerated value.

| Value   | Name   |
|:-------:|:-------|
| 0       | Off    |
| 1       | Low    |
| 2       | Medium |
| 3       | High   |

### Cook mode
The following is a list of the available cook modes and their enumerated value.
Note that some of these values are not allowed to be set remotely, even when remote enabled.
Some of these values are deprecated, and are marked with a ~~strikeout~~.

| Value   | Name                                                |
|:-------:|:----------------------------------------------------|
| 0       | No Mode                                             |
| 1       | Bake No Option                                      |
| 2       | Bake Probe                                          |
| 3       | Bake Delay Start                                    |
| 4       | Bake Timed Warm                                     |
| 5       | Bake Timed Two-Temp                                 |
| 6       | Bake Probe Delay Start                              |
| 7       | ~~Bake Timed Shutoff Delay Start~~                  |
| 8       | Bake Timed Warm Delay Start                         |
| 9       | Bake Timed TwoTemp Delay Start                      |
| 10      | ~~Bake Sabbath~~                                    |
| 11      | Broil Low                                           |
| 12      | Broil High                                          |
| 13      | Proof No Option                                     |
| 14      | Proof Delay Start                                   |
| 15      | Warm No Option                                      |
| 16      | Warm Probe                                          |
| 17      | Warm Delay Start                                    |
| 18      | Convection Bake No Option                           |
| 19      | Convection Bake Probe                               |
| 20      | Convection Bake Delay Start                         |
| 21      | Convection Bake Timed Warm                          |
| 22      | Convection Bake Timed Two-Temp                      |
| 23      | Convection Bake Probe Delay Start                   |
| 24      | ~~Convection Bake Timed Shutoff Delay Start~~       |
| 25      | Convection Bake Timed Warm Delay Start              |
| 26      | Convection Bake Timed TwoTemp Delay Start           |
| 27      | Convection Multi-Bake No Option                     |
| 28      | Convection Multi-Bake Probe                         |
| 29      | Convection Multi-Bake Delay Start                   |
| 30      | Convection Multi-Bake Timed Warm                    |
| 31      | Convection Multi-Bake Timed Two-Temp                |
| 32      | Convection Multi-Bake Probe Delay Start             |
| 33      | ~~Convection Multi-Bake Timed Shutoff Delay Start~~ |
| 34      | Convection Multi-Bake Timed Warm Delay Start        |
| 35      | Convection Multi-Bake Timed Two-Temp Delay Start    |
| 36      | Convection Roast No Option                          |
| 37      | Convection Roast Probe                              |
| 38      | Convection Roast Delay Start                        |
| 39      | Convection Roast Timed Warm                         |
| 40      | Convection Roast Timed Two-Temp                     |
| 41      | Convection Roast Probe Delay Start                  |
| 42      | ~~Convection Roast Timed Shutoff Delay Start~~      |
| 43      | Convection Roast Timed Warm Delay Start             |
| 44      | Convection Roast Timed TwoTemp Delay Start          |
| 45      | Convection Broil Low No Option                      |
| 46      | Convection Broil High No Option                     |
| 47      | Convection Broil Crisp No Option                    |
| 48      | Convection Broil Crisp Probe                        |
| 49      | Custom Self Clean                                   |
| 50      | Custom Self Clean Delay Start                       |
| 51      | Steam Clean                                         |
| 52      | Steam Clean Delay Start                             |
| 53      | Dual Broil Low No Option                            |
| 54      | Dual Broil High No Option                           |

### Oven state
The following is a list of the available oven states and their enumerated value.
Note that some of these values are not allowed to be set remotely, even when remote enabled.
Some of these values are deprecated, and are marked with a ~~strikeout~~.

| Value   | Name                              |
|:-------:|:----------------------------------|
| 0       | No Mode                           |
| 1       | Preheat                           |
| 2       | Convection Bake Preheat           |
| 3       | Convection Multi-Bake Preheat     |
| 4       | Convection Roast Bake Preheat     |
| 5       | Bake                              |
| 6       | Bake Two-Temp                     |
| 7       | Convection Bake                   |
| 8       | Convection Bake Two-Temp          |
| 9       | Convection Mutli-Bake             |
| 10      | Convection Multi-Two-Bake         |
| 11      | Convection Roast                  |
| 12      | Convection Roast 2                |
| 13      | Low-Broil                         |
| 14      | High-Broil                        |
| 15      | Convection High-Broil             |
| 16      | Convection Low-Broil              |
| 17      | Convection Crisp-Broil            |
| 18      | Warm                              |
| 19      | Proofing                          |
| 20      | ~~Sabbath~~                       |
| 21      | Clean Stage 1                     |
| 22      | Clean Stage 2                     |
| 23      | Clean Cool Down                   |
| 24      | Custom Clean Stage 2              |
| 25      | Steam Clean Stage 1               |
| 26      | Steam Cool Down                   |
| 27      | Delay                             |
| 28      | ~~Warming Drawer Low Preheat~~    |
| 29      | ~~Warming Drawer Medium Preheat~~ |
| 30      | ~~Warming Drawer High Preheat~~   |
| 31      | ~~Warming Drawer Low~~            |
| 32      | ~~Warming Drawer Medium~~         |
| 33      | ~~Warming Drawer High~~           |
