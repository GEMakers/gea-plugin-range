# Range
**General Electric Appliances Range Software Development Kit**

This node.js package provides functionality for communicating with a range via the [General Electric Appliance Software Development Kit](https://github.com/GEMakers/gea-sdk). In order to use this software, you must first connect your range to your computer using the [Green Bean](https://github.com/GEMakers/green-bean).

&#x26a0; CAUTION: To prevent a risk of personal injury or property damage use this device and the API to modify the functionality of your GE Appliances only as directed in the [Guide to Safe and Reliable Operation](#guide-to-safe-and-reliable-operation).

## Guide to Safe and Reliable Operation
The interface between the green bean and the range can take place while the range is in either a consumer or a native mode.


**Consumer mode** allows developers to access the high-level algorithms of an appliance, such as initiating a bake cycle at a specified temperature.
In consumer mode a user connected is unable change the low level functions that govern how the cook cycle runs.


**Native mode** allows a developer to create the low-level algorithms of an appliance, such as direct control of motors, fans, actuators, heaters, and other controlled devices.
While in native mode, high-level algorithms, such as a bake cycle, are not operational.
Native mode allows a developer to, for example, create a new bake cycle by controlling the loads in a desired manner.
While operating in native mode, the developer must adhere to the following rules:

1. The oven cavity temperature should not exceed 550 degrees Fahrenheit while the door is unlocked. If you intend to run an operation that will exceed this cavity temperature, lock the door before starting the cook mode (energizing any elements).
1. The cooling fan must be on during all cook modes (any heating element energized) and remain on as long as the temperature in either cavity is greater than 175 degrees Fahrenheit.
1. If operation on any individual oven cavity is to exceed 550 degrees Fahrenheit then the other oven should not be operated during this entire cooking cycle. Concurrent operation of oven cavities at high temperatures (where door lock is required) can overheat components and/or result in high surface temperatures that can injure on contact.
1. Do not allow operation of the cooktop if any operating above 550 degrees Fahrenheit is intended.
1. The door lock may be incapable of changing state at elevated temperatures. Once a door is locked, it should remain locked until the cavity temperatures drop below 400 degrees Fahrenheit.
1. For models with controls directly above the door, do not allow cook modes to continue with the door open for more than 1 minute, as it can result in high component temperatures, leading to control damage.
1. A heating element that is on must have its state periodically updated at least every 5 minutes (2.5 minutes is recommended).
1. Excessive relay cycling can shorten the life of the relays.
1. To maintain native mode operation, the native mode command must be sent at least once every 5 minutes (2.5 minute periodic rate is recommended).

## Overview

1. [Using the Software](#using-the-software)
    - [range.twelveHourShutoff](#rangetwelvehourshutoff)
    - [range.endTone](#rangeendtone)
    - [range.lightBar](#rangelightbar)
    - [range.convectionConversion](#rangeconvectionconversion)
    - [range.elapsedOnTime](#rangeelapsedontime)
    - [range.activeFaultCodeStatus](#rangeactivefaultcodestatus)
    - [range.keyPressed](#rangekeypressed)
    - [range.ovenConfiguration](#rangeovenconfiguration)
    - [range.ovenModeMinMaxTemperature](#rangeovenmodeminmaxtemperature)
    - [range.warmingDrawerState](#rangewarmingdrawerstate)
    - [range.upperOven.cookMode](#rangeupperovencookmode)
    - [range.upperOven.currentState](#rangeupperovencurrentstate)
    - [range.upperOven.delayTimeRemaining](#rangeupperovendelaytimeremaining)
    - [range.upperOven.probeDisplayTemperature](#rangeupperovenprobedisplaytemperature)
    - [range.upperOven.cookTimeRemaining](#rangeupperovencooktimeremaining)
    - [range.upperOven.displayTimer](#rangeupperovendisplaytimer)
    - [range.upperOven.userTemperatureOffset](#rangeupperovenusertemperatureoffset)
    - [range.upperOven.probePresent](#rangeupperovenprobepresent)
    - [range.upperOven.elapsedCookTime](#rangeupperovenelapsedcooktime)
    - [range.upperOven.displayTemperature](#rangeupperovendisplaytemperature)
    - [range.upperOven.remoteEnable](#rangeupperovenremoteenable)
    - [range.lowerOven.cookMode](#rangelowerovencookmode)
    - [range.lowerOven.currentState](#rangelowerovencurrentstate)
    - [range.lowerOven.delayTimeRemaining](#rangelowerovendelaytimeremaining)
    - [range.lowerOven.probeDisplayTemperature](#rangelowerovenprobedisplaytemperature)
    - [range.lowerOven.cookTimeRemaining](#rangelowerovencooktimeremaining)
    - [range.lowerOven.displayTimer](#rangelowerovendisplaytimer)
    - [range.lowerOven.userTemperatureOffset](#rangelowerovenusertemperatureoffset)
    - [range.lowerOven.probePresent](#rangelowerovenprobepresent)
    - [range.lowerOven.elapsedCookTime](#rangelowerovenelapsedcooktime)
    - [range.lowerOven.displayTemperature](#rangelowerovendisplaytemperature)
    - [range.lowerOven.remoteEnable](#rangelowerovenremoteenable)
    - [range.fctMode](#rangefctmode)
    - [range.doorLock](#rangedoorlock)
    - [range.resetEEPROM()](#rangereseteeprom)
    - [range.elementStatus](#rangeelementstatus)
    - [range.convectionFan](#rangeconvectionfan)
    - [range.coolingFan](#rangecoolingfan)
    - [range.coolingFanRevolutionsPerMinute](#rangecoolingfanrevolutionsperminute)
    - [range.mainControlModuleStatus](#rangemaincontrolmodulestatus)
    - [range.analogInputs](#rangeanaloginputs)
    - [range.inputStatus](#rangeinputstatus)
    - [range.keysCurrentlyPressed](#rangekeyscurrentlypressed)
    - [range.latchedKeyPresses](#rangelatchedkeypresses)
    - [range.clearLatchedKeyPresses()](#rangeclearlatchedkeypresses)
    - [range.glassTouchErrors](#rangeglasstoucherrors)
    - [range.leds](#rangeleds)
    - [range.buzzerTone](#rangebuzzertone)
1. [Appendix](#appendix)
    - [Enabled state](#enabled-state)
    - [Probe presence](#probe-presence)
    - [End tone](#end-tone)
    - [Warming drawer state](#warming-drawer-state)
    - [Oven configuration](#oven-configuration)
    - [Cook mode](#cook-mode)
    - [Oven state](#oven-state)
    - [FCT mode](#fct-mode)
    - [Door lock](#door-lock)
    - [Element status](#element-status)
    - [Fan rotation](#fan-rotation)
    - [Fan speed](#fan-speed)
    - [Input status](#input-status)
    - [Key status](#key-status)
    - [Buzzer tone](#buzzer-tone)

### Using the Software
Below are a few node.js applications that demonstrate how to use this package to interact with a range.

#### *range.twelveHourShutoff*
The twelve hour shutoff is an integer value of the [enabled state](#enabled-state) enumeration.

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.twelveHourShutoff.read(function(value) {
        console.log("twelve hour shutoff is:", value);
    });

    range.twelveHourShutoff.subscribe(function(value) {
        console.log("twelve hour shutoff changed:", value);
    });

    range.twelveHourShutoff.write(1);
});
```

#### *range.endTone*
The end tone is an integer value of the [end tone](#end-tone) enumeration.

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.endTone.read(function(value) {
        console.log("end tone is:", value);
    });

    range.endTone.subscribe(function(value) {
        console.log("end tone changed:", value);
    });

    range.endTone.write(0);
});
```

#### *range.lightBar*
The light bar is an integer value of the [enabled state](#enabled-state) enumeration.

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.lightBar.read(function(value) {
        console.log("light bar is:", value);
    });

    range.lightBar.subscribe(function(value) {
        console.log("light bar changed:", value);
    });

    range.lightBar.write(1);
});
```

#### *range.convectionConversion*
The convection conversion is an integer value of the [enabled state](#enabled-state) enumeration.

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.convectionConversion.read(function(value) {
        console.log("convection conversion is:", value);
    });

    range.convectionConversion.subscribe(function(value) {
        console.log("convection conversion changed:", value);
    });

    range.convectionConversion.write(1);
});
```

#### *range.elapsedOnTime*
The elapsed on time is a read-only unsigned integer with units in minutes.

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.elapsedOnTime.read(function(value) {
        console.log("elapsed on time is:", value);
    });

    range.elapsedOnTime.subscribe(function(value) {
        console.log("elapsed on time changed:", value);
    });
});
```

#### *range.activeFaultCodeStatus*
The active fault code status is a read-only array of bytes.
Each byte represents the fault code number.
Up to ten fault codes can be active at once.
Zero means no active fault.

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.activeFaultCodeStatus.read(function(value) {
        console.log("active fault codes are:", value);
    });

    range.activeFaultCodeStatus.subscribe(function(value) {
        console.log("active fault codes changed:", value);
    });
});
```

#### *range.keyPressed*
The key press is a read-only unsigned integer representing the last key that was pressed on the user interface.
Each key has a pre-defined, unique number.

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.keyPressed.read(function(value) {
        console.log("last key pressed is:", value);
    });

    range.keyPressed.subscribe(function(value) {
        console.log("last key pressed changed:", value);
    });
});
```

#### *range.ovenConfiguration*
The oven configuration is a read-only unsigned integer value of the [oven configuration](#oven-configuration) bit field.

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.ovenConfiguration.read(function(value) {
        console.log("oven configuration is:", value);
    });

    range.ovenConfiguration.subscribe(function(value) {
        console.log("oven configuration changed:", value);
    });
});
```

#### *range.ovenModeMinMaxTemperature*
The oven mode for minimum and maximum temperature is a read-only object.
There are two fields in this object:
- maxTemperature (the maximum oven temperature in F)
- minTemperature (the minimum oven temperature in F)

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.ovenModeMinMaxTemperature.read(function(value) {
        console.log("oven minimum and maximum temperatures are:", value);
    });

    range.ovenModeMinMaxTemperature.subscribe(function(value) {
        console.log("oven minimum and maximum temperatures changed:", value);
    });
});
```

#### *range.warmingDrawerState*
The warming drawer state is an integer value of the [warming drawer state](#warming-drawer-state) enumeration.

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.warmingDrawerState.read(function(value) {
        console.log("warming drawer state is:", value);
    });

    range.warmingDrawerState.subscribe(function(value) {
        console.log("warming drawer state changed:", value);
    });

    range.warmingDrawerState.write(2);
});
```

#### *range.upperOven.cookMode*
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
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.upperOven.cookMode.read(function(value) {
        console.log("upper oven cook mode is:", value);
    });

    range.upperOven.cookMode.subscribe(function(value) {
        console.log("upper oven cook mode changed:", value);
    });

    range.upperOven.cookMode.write({
        mode: 18,
        cookTemperature: 350,
        cookHours: 1,
        cookMinutes: 0
    });
});
```

#### *range.upperOven.currentState*
The current upper oven state is a read-only integer value of the [oven state](#oven-state) enumeration.

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.upperOven.currentState.read(function(value) {
        console.log("upper oven current state is:", value);
    });

    range.upperOven.currentState.subscribe(function(value) {
        console.log("upper oven current state changed:", value);
    });
});
```

#### *range.upperOven.delayTimeRemaining*
The upper oven delay time remaining is a read-only integer representing the amount of delay time remaining (in minutes).

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.upperOven.delayTimeRemaining.read(function(value) {
        console.log("upper oven delay time remaining is:", value);
    });

    range.upperOven.delayTimeRemaining.subscribe(function(value) {
        console.log("upper oven delay time remaining changed:", value);
    });
});
```

#### *range.upperOven.probeDisplayTemperature*
The upper oven probe display temperature is a read-only integer representing the probe temperature being displayed (in degrees Fahrenheit).

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.upperOven.probeDisplayTemperature.read(function(value) {
        console.log("upper oven probe display temperature is:", value);
    });

    range.upperOven.probeDisplayTemperature.subscribe(function(value) {
        console.log("upper oven probe display temperature changed:", value);
    });
});
```

#### *range.upperOven.cookTimeRemaining*
The upper oven cook time remaining is a read-only integer representing the amount of cook time remaining (in minutes).

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.upperOven.cookTimeRemaining.read(function(value) {
        console.log("upper oven cook time remaining is:", value);
    });

    range.upperOven.cookTimeRemaining.subscribe(function(value) {
        console.log("upper oven cook time remaining changed:", value);
    });
});
```

#### *range.upperOven.displayTimer*
The upper oven display timer is an integer representing the initial setting of the display timer (in minutes).

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.upperOven.displayTimer.read(function(value) {
        console.log("upper oven display timer is:", value);
    });

    range.upperOven.displayTimer.subscribe(function(value) {
        console.log("upper oven display timer changed:", value);
    });

    range.upperOven.displayTimer.write(60);
});
```

#### *range.upperOven.userTemperatureOffset*
The upper oven user temperature offset is an integer representing the temperature offset from the actual temperature for the user (in degrees Fahrenheit).

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.upperOven.userTemperatureOffset.read(function(value) {
        console.log("upper oven user temperature offset is:", value);
    });

    range.upperOven.userTemperatureOffset.subscribe(function(value) {
        console.log("upper oven user temperature offset changed:", value);
    });

    range.upperOven.userTemperatureOffset.write(50);
});
```

#### *range.upperOven.probePresent*
The upper oven probe presence is a read-only integer value of the [probe presence](#probe-presence) enumeration.

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.upperOven.probePresent.read(function(value) {
        console.log("upper oven probe presence is:", value);
    });

    range.upperOven.probePresent.subscribe(function(value) {
        console.log("upper oven probe presence changed:", value);
    });
});
```

#### *range.upperOven.elapsedCookTime*
The upper oven elapsed cook time is a read-only integer representing the amount of cook time elapsed (in minutes).

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.upperOven.elapsedCookTime.read(function(value) {
        console.log("upper oven elapsed cook time is:", value);
    });

    range.upperOven.elapsedCookTime.subscribe(function(value) {
        console.log("upper oven elapsed cook time changed:", value);
    });
});
```

#### *range.upperOven.displayTemperature*
The upper oven display temperature is a read-only integer representing the oven temperature being displayed (in degrees Fahrenheit).

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.upperOven.displayTemperature.read(function(value) {
        console.log("upper oven display temperature is:", value);
    });

    range.upperOven.displayTemperature.subscribe(function(value) {
        console.log("upper oven display temperature changed:", value);
    });
});
```

#### *range.upperOven.remoteEnable*
The upper oven remote enable is a read-only integer value of the [enabled state](#enabled-state) enumeration.
Note: in order to write a cook mode, remote control must be enabled for the oven.

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.upperOven.remoteEnable.read(function(value) {
        console.log("upper oven remote enable is:", value);
    });

    range.upperOven.remoteEnable.subscribe(function(value) {
        console.log("upper oven remote enabled changed:", value);
    });
});
```

#### *range.lowerOven.cookMode*
The lower oven has a cook mode object.
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
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.lowerOven.cookMode.read(function(value) {
        console.log("lower oven cook mode is:", value);
    });

    range.lowerOven.cookMode.subscribe(function(value) {
        console.log("lower oven cook mode changed:", value);
    });

    range.lowerOven.cookMode.write({
        mode: 18,
        cookTemperature: 350,
        cookHours: 1,
        cookMinutes: 0
    });
});
```

#### *range.lowerOven.currentState*
The current lower oven state is a read-only integer value of the [oven state](#oven-state) enumeration.

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.lowerOven.currentState.read(function(value) {
        console.log("lower oven current state is:", value);
    });

    range.lowerOven.currentState.subscribe(function(value) {
        console.log("lower oven current state changed:", value);
    });
});
```

#### *range.lowerOven.delayTimeRemaining*
The lower oven delay time remaining is a read-only integer representing the amount of delay time remaining (in minutes).

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.lowerOven.delayTimeRemaining.read(function(value) {
        console.log("lower oven delay time remaining is:", value);
    });

    range.lowerOven.delayTimeRemaining.subscribe(function(value) {
        console.log("lower oven delay time remaining changed:", value);
    });
});
```

#### *range.lowerOven.probeDisplayTemperature*
The lower oven probe display temperature is a read-only integer representing the probe temperature being displayed (in degrees Fahrenheit).

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.lowerOven.probeDisplayTemperature.read(function(value) {
        console.log("lower oven probe display temperature is:", value);
    });

    range.lowerOven.probeDisplayTemperature.subscribe(function(value) {
        console.log("lower oven probe display temperature changed:", value);
    });
});
```

#### *range.lowerOven.cookTimeRemaining*
The lower oven cook time remaining is a read-only integer representing the amount of cook time remaining (in minutes).

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.lowerOven.cookTimeRemaining.read(function(value) {
        console.log("lower oven cook time remaining is:", value);
    });

    range.lowerOven.cookTimeRemaining.subscribe(function(value) {
        console.log("lower oven cook time remaining changed:", value);
    });
});
```

#### *range.lowerOven.displayTimer*
The lower oven display timer is an integer representing the initial setting of the display timer (in minutes).

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.lowerOven.displayTimer.read(function(value) {
        console.log("lower oven display timer is:", value);
    });

    range.lowerOven.displayTimer.subscribe(function(value) {
        console.log("lower oven display timer changed:", value);
    });

    range.lowerOven.displayTimer.write(60);
});
```

#### *range.lowerOven.userTemperatureOffset*
The lower oven user temperature offset is an integer representing the temperature offset from the actual temperature for the user (in degrees Fahrenheit).

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.lowerOven.userTemperatureOffset.read(function(value) {
        console.log("lower oven user temperature offset is:", value);
    });

    range.lowerOven.userTemperatureOffset.subscribe(function(value) {
        console.log("lower oven user temperature offset changed:", value);
    });

    range.lowerOven.userTemperatureOffset.write(50);
});
```

#### *range.lowerOven.probePresent*
The lower oven probe presence is a read-only integer value of the [probe presence](#probe-presence) enumeration.

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.lowerOven.probePresent.read(function(value) {
        console.log("lower oven probe presence is:", value);
    });

    range.lowerOven.probePresent.subscribe(function(value) {
        console.log("lower oven probe presence changed:", value);
    });
});
```

#### *range.lowerOven.elapsedCookTime*
The lower oven elapsed cook time is a read-only integer representing the amount of cook time elapsed (in minutes).

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.lowerOven.elapsedCookTime.read(function(value) {
        console.log("lower oven elapsed cook time is:", value);
    });

    range.lowerOven.elapsedCookTime.subscribe(function(value) {
        console.log("lower oven elapsed cook time changed:", value);
    });
});
```

#### *range.lowerOven.displayTemperature*
The lower oven display temperature is a read-only integer representing the oven temperature being displayed (in degrees Fahrenheit).

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.lowerOven.displayTemperature.read(function(value) {
        console.log("lower oven display temperature is:", value);
    });

    range.lowerOven.displayTemperature.subscribe(function(value) {
        console.log("lower oven display temperature changed:", value);
    });
});
```

#### *range.lowerOven.remoteEnable*
The lower oven remote enable is a read-only integer value of the [enabled state](#enabled-state) enumeration. *Note that in order to write a cook mode, remote control must be enabled for the oven.*

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.lowerOven.remoteEnable.read(function(value) {
        console.log("lower oven remote enable is:", value);
    });

    range.lowerOven.remoteEnable.subscribe(function(value) {
        console.log("lower oven remote enable changed:", value);
    });
});
```

#### *range.fctMode*
The functional control test mode is a write-only integer value of the [FCT mode](#fct-mode) enumeration. *Note that FCT mode times out after 30 seconds. In order to stay in FCT mode, the command must be sent on an interval.*

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.fctMode.write(1); // enter fct mode

    setInterval(function() {
        range.fctMode.write(1); // stay in fct mode
    }, 15000);
});
```

#### *range.doorLock*
The door lock is a write-only object with the following fields:
- upperOvenDoorLock (the door lock status of the upper oven, see [door lock](#door-lock) below)
- lowerOvenDoorLock (the door lock status of the lower oven, see [door lock](#door-lock) below)

*Note that this functionality is only available in FCT mode (see [range.fctMode](#rangefctmode) above).*

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.doorLock.write({
        upperOvenDoorLock: 1,
        lowerOvenDoorLock: 0
    });
});
```

#### *range.resetEEPROM()*
This function will reset the EEPROM to the default values. *Note that this functionality is only available in FCT mode (see [range.fctMode](#rangefctmode) above).*

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.resetEEPROM();
});
```

#### *range.elementStatus*
The element status is an object with the following fields:
- upperOvenElementStatus (the elements of the upper oven, see [element status](#element-status) below)
- lowerOvenElementStatus (the elements of the lower oven, see [element status](#element-status) below)

*Note that this functionality is only available in FCT mode (see [range.fctMode](#rangefctmode) above).*

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.elementStatus.read(function(value) {
        console.log("element status is:", value);
    });

    range.elementStatus.subscribe(function(value) {
        console.log("element status changed:", value);
    });

    range.elementStatus.write({
        upperOvenElementStatus: 0,
        lowerOvenElementStatus: 0
    });
});
```

#### *range.convectionFan*
The convection fan is an object with the following fields:
- upperOvenConvectionFanDrivePercentage (the duty cycle for the convection fan of the upper oven)
- upperOvenConvectionFanRotation (the rotation of the convection fan of the upper oven, see [fan rotation](#fan-rotation) below)
- lowerOvenConvectionFanDrivePercentage (the duty cycle for the convection fan of the lower oven)
- lowerOvenConvectionFanRotation (the rotation of the convection fan of the lower oven, see [fan rotation](#fan-rotation) below)

*Note that this functionality is only available in FCT mode (see [range.fctMode](#rangefctmode) above).*

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.convectionFan.read(function(value) {
        console.log("convection fan is:", value);
    });

    range.convectionFan.subscribe(function(value) {
        console.log("convection fan changed:", value);
    });

    range.convectionFan.write({
        upperOvenConvectionFanDrivePercentage: 75,
        upperOvenConvectionFanRotation: 1,
        lowerOvenConvectionFanDrivePercentage: 0,
        lowerOvenConvectionFanRotation: 0
    });
});
```

#### *range.coolingFan*
The cooling fan is an object with the following fields:
- upperOvenCoolingFan (the fan speed of the upper oven cooling fan, see [fan speed](fan-speed) below)
- lowerOvenCoolingFan (the fan speed of the lower oven cooling fan, see [fan speed](fan-speed) below)

*Note that this functionality is only available in FCT mode (see [range.fctMode](#rangefctmode) above).*

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.coolingFan.read(function(value) {
        console.log("cooling fan is:", value);
    });

    range.coolingFan.subscribe(function(value) {
        console.log("cooling fan changed:", value);
    });

    range.coolingFan.write({
        upperOvenCoolingFan: 1,
        lowerOvenCoolingFan: 0
    });
});
```

#### *range.coolingFanRevolutionsPerMinute*
The cooling fan revolutions per minute is a read-only object with the following fields:
- upperOvenCoolingFanRevolutionsPerMinute (the number of revolutions per minute of the upper oven cooling fan)
- lowerOvenCoolingFanRevolutionsPerMinute (the number of revolutions per minute of the lower oven cooling fan)

*Note that this functionality is only available in FCT mode (see [range.fctMode](#rangefctmode) above).*

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.coolingFanRevolutionsPerMinute.read(function(value) {
        console.log("cooling fan revolutions per minute is:", value);
    });

    range.coolingFanRevolutionsPerMinute.subscribe(function(value) {
        console.log("cooling fan revolutions per minute changed:", value);
    });
});
```

#### *range.mainControlModuleStatus*
The main control module status is a read-only object with the following fields:
- upperOvenCookMode (the upper oven cook mode, see [cook mode](#cook-mode) below)
- upperOvenErrors (the upper oven error bit field)
- lowerOvenCookMode (the lower oven cook mode, see [cook mode](#cook-mode) below)
- lowerOvenErrors (the lower oven error bit field)

*Note that this functionality is only available in FCT mode (see [range.fctMode](#rangefctmode) above).*

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.mainControlModuleStatus.read(function(value) {
        console.log("main control module status is:", value);
    });

    range.mainControlModuleStatus.subscribe(function(value) {
        console.log("main control module status changed:", value);
    });
});
```

#### *range.analogInputs*
The analog inputs are a read-only object with the following fields:
- upperOvenRtdFine (the analog temperature reading of the upper oven fine resistive thermal device)
- upperOvenRtd (the analog temperature reading of the upper oven resistive thermal device)
- upperOvenProbe (the analog temperature reading of the upper oven probe)
- lowerOvenRtdFine (the analog temperature reading of the lower oven fine resistive thermal device)
- lowerOvenRtd (the analog temperature reading of the lower oven resistive thermal device)
- lowerOvenProbe (the analog temperature reading of the lower oven probe)

*Note that this functionality is only available in FCT mode (see [range.fctMode](#rangefctmode) above).*

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.analogInputs.read(function(value) {
        console.log("analog input are:", value);
    });

    range.analogInputs.subscribe(function(value) {
        console.log("analog inputs changed:", value);
    });
});
```

#### *range.inputStatus*
The input status is a read-only object with the following fields:
- upperOvenInputStatus (the upper oven input status, see [input status](#input-status) bit field)
- lowerOvenInputStatus (the lower oven input status, see [input status](#input-status) bit field)

*Note that this functionality is only available in FCT mode (see [range.fctMode](#rangefctmode) above).*

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.inputStatus.read(function(value) {
        console.log("input status is:", value);
    });

    range.inputStatus.subscribe(function(value) {
        console.log("input status changed:", value);
    });
});
```

#### *range.keysCurrentlyPressed*
The keys currently pressed are a read-only object with the following fields:
- keyStatus (the key status, see [key status](#key-status))
- keyBitmap (an array of bytes representing a bitmap of the keys that are currently pressed)

*Note that this functionality is only available in FCT mode (see [range.fctMode](#rangefctmode) above).*

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.keysCurrentlyPressed.read(function(value) {
        console.log("keys currently pressed are:", value);
    });

    range.keysCurrentlyPressed.subscribe(function(value) {
        console.log("keys currently pressed changed:", value);
    });
});
```

#### *range.latchedKeyPresses*
The latched key presses are a read-only object with the following fields:
- keyStatus (the key status, see [key status](#key-status))
- keyBitmap (an array of bytes representing a bitmap of the keys that are currently pressed)

*Note that this functionality is only available in FCT mode (see [range.fctMode](#rangefctmode) above).*

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.latchedKeyPresses.read(function(value) {
        console.log("latched key presses are:", value);
    });

    range.latchedKeyPresses.subscribe(function(value) {
        console.log("latched key presses changed:", value);
    });
});
```

#### *range.clearLatchedKeyPresses()*
This functions clears the latched key presses reported in [range.latchedKeyPresses](#rangelatchedkeypresses). *Note that this functionality is only available in FCT mode (see [range.fctMode](#rangefctmode) above).*

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.clearLatchedKeyPresses();
});
```

#### *range.glassTouchErrors*
The glass touch errors are a read-only object with the following fields:
- keyStatus (the key status, see [key status](#key-status))
- keyBitmap (an array of bytes representing a bitmap of the keys that are currently pressed)

*Note that this functionality is only available in FCT mode (see [range.fctMode](#rangefctmode) above).*

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.glassTouchErrors.read(function(value) {
        console.log("glass touch errors are:", value);
    });

    range.glassTouchErrors.subscribe(function(value) {
        console.log("glass touch errors changed:", value);
    });
});
```

#### *range.leds*
The light emitting diodes are a write-only object with the following fields:
- upperOvenLedStatus (an array of bytes representing the upper oven light emitting diodes)
- lowerOvenLedStatus (an array of bytes representing the lower oven light emitting diodes)

*Note that this functionality is only available in FCT mode (see [range.fctMode](#rangefctmode) above).*

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.leds.write({
        upperOvenLedStatus: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        lowerOvenLedStatus: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
    });
});
```

#### *range.buzzerTone*
The buzzer tone is a write-only integer value of the [buzzer tone](#buzzer-tone) enumeration. *Note that this functionality is only available in FCT mode (see [range.fctMode](#rangefctmode) above).*

``` javascript
var greenBean = require("green-bean");

greenBean.connect("range", function(range) {
    range.buzzerTone.write(5);
});
```

### Appendix

#### Enabled state
The following is a list of the available enabled states and their enumerated value.

| Value   | Name     |
|:-------:|:---------|
| 0       | Disabled |
| 1       | Enabled  |

#### Probe presence
The following is a list of the available probe presence states and their enumerated value.

| Value   | Name        |
|:-------:|:------------|
| 0       | Not present |
| 1       | Present     |

#### End tone
The following is a list of the available end tones and their enumerated value.

| Value   | Name            |
|:-------:|:----------------|
| 0       | Beep            |
| 1       | Continuous tone |

#### Warming drawer state
The following is a list of the available warming drawer states and their enumerated value.

| Value   | Name   |
|:-------:|:-------|
| 0       | Off    |
| 1       | Low    |
| 2       | Medium |
| 3       | High   |

#### Oven configuration
The following is a diagram of the value for each bit in the oven configuration.
If the bit is set (value is 1) then that option is present.
If the bit is cleared (value is 0) then that option is not present.

| Bit     | Description              |
|:-------:|:-------------------------|
| 0       | Knob                     |
| 1       | Warming drawer           |
| 2       | Light bar                |
| 3       | Lower oven               |
| 4       | Lower oven kitchen timer |
| 5+      | Reserved                 |

#### Cook mode
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

#### Oven state
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

#### FCT mode
The following is a list of the available functional control test modes and their enumerated value.

| Value   | Name            |
|:-------:|:----------------|
| 0x00    | Exit FCT mode   |
| 0x01    | Enter FCT mode  |
| 0xff    | Query FCT mode  |

#### Door lock
The following is a list of the available door lock states and their enumerated value.

| Value   | Name     |
|:-------:|:---------|
| 0       | Unlock   |
| 1       | Lock     |

#### Element status
The following is a diagram of the value for each bit in the elements.
If the bit is set (value is 1) then that element is turned on.
If the bit is cleared (value is 0) then that element is turned off.

| Bit     | Description              |
|:-------:|:-------------------------|
| 0       | Primary bake             |
| 1       | Secondary bake           |
| 2       | Primary broil            |
| 3       | Secondary broil          |
| 4       | Primary convection       |
| 5       | Secondary convection     |
| 6+      | Reserved                 |

#### Fan rotation
The following is a list of the available fan rotations and their enumerated value.

| Value   | Name                |
|:-------:|:--------------------|
| 0       | Counter clockwise   |
| 1       | Clockwise           |

#### Fan speed
The following is a list of the available fan speeds and their enumerated value.

| Value   | Name                                 |
|:-------:|:-------------------------------------|
| 0       | Off                                  |
| 1       | Low speed                            |
| 2       | High speed (not available for TO12)  |

#### Input status
The following is a diagram of the value for each bit in the input status.
If the bit is set (value is 1) then that element is turned on.
If the bit is cleared (value is 0) then that element is turned off.
Some of these values are deprecated, and are marked with a ~~strikeout~~.

| Bit     | Description                                                              |
|:-------:|:-------------------------------------------------------------------------|
| 0       | Buzzer type (decay = 0, non-decay = 1)                                   |
| 1       | Door is initialized (incomplete = 0, complete = 1)                       |
| 2-3     | Voltage type (demo mode = 0, 120V = 1, 208V = 2, 240V = 3)               |
| 4-5     | Frequency (invalid = 0, 50Hz = 1, 60Hz = 2)                              |
| 6       | Debug LED (off = 0, flashing = 1)                                        |
| 7       | ~~Fault status (no fault = 0, fault = 1)~~                               |
| 8-9     | Door switch (unknown = 0, opened = 1)                                    |
| 10-11   | Door lock status (unknown = 0, unlocked = 1, locked = 2, transition = 3) |
| 12-13   | Oven light status (unknown = 0, off = 1, on = 2)                         |
| 14      | Convection fan rotation (counter clockwise = 0, clockwise = 1)           |
| 15      | Probe status (not present = 0, present = 1)                              |

#### Key status
The following is a list of the available warming drawer states and their enumerated value.

| Value   | Name                  |
|:-------:|:----------------------|
| 0       | Key currently pressed |
| 1       | Latched key presses   |
| 2       | Reset latched keys    |
| 3       | Glass touch errors    |

#### Buzzer tone
The following is a list of the available buzzer tones and their enumerated value.

| Value   | Name              |
|:-------:|:------------------|
| 0       | None              |
| 1       | Failure           |
| 2       | Touch             |
| 3       | Unavailable touch |
| 4       | Error             |
| 5       | Attention         |
| 6       | Notification      |
| 7       | Reminder          |
| 8       | Alarm 1           |
| 9       | Press hold on     |
| 10      | Press hold off    |
| 11      | Increase          |
| 12      | Decrease          |
| 13      | On                |
| 14      | Off               |
| 15      | Alarm 2           |
| 16      | Select            |
