/*
 * Copyright (c) 2013 - General Electric - Confidential - All Rights Reserved
 * 
 * Author: Christopher Baker <christopher.baker2@ge.com>
 *
 * This application will start a number guessing game using the range display.
 * The range will pick a random number between 0 and 99. The goal is to guess
 * the number correctly. The user will be scored based on number of guesses.
 * The lower the score the better.
 *
 */


var gea = require("gea-sdk");
var adapter = require("gea-adapter-usb");

var app = gea.configure({
    address: 0xcb
});

const LED_NONE  = 0;
const LED_UPPER = 3;
const LED_LOWER = 96;

const KEY_CLEAR = 48;
const KEY_START = 49;

function setText(range, text, led) {
    /* _A_
      |   |
      F   B
      |   |
       _G_
      |   |
      E   C
      |   |
       _D_  */

    const SEG_A = 1;            
    const SEG_B = 2;
    const SEG_C = 4;
    const SEG_D = 8;
    const SEG_E = 16;
    const SEG_F = 32;
    const SEG_G = 64;
    
    const LETTERS = {
        "A": SEG_A | SEG_B | SEG_C | SEG_E | SEG_F | SEG_G,
        "B": SEG_C | SEG_D | SEG_E | SEG_F | SEG_G,
        "C": SEG_A | SEG_D | SEG_E | SEG_F,
        "D": SEG_B | SEG_C | SEG_D | SEG_E | SEG_G,
        "E": SEG_A | SEG_D | SEG_E | SEG_F | SEG_G,
        "F": SEG_A | SEG_E | SEG_F | SEG_G,
        "G": SEG_A | SEG_B | SEG_C | SEG_D | SEG_F | SEG_G,
        "H": SEG_B | SEG_C | SEG_E | SEG_F | SEG_G,
        "I": SEG_E | SEG_F,
        "J": SEG_B | SEG_C | SEG_D,
        "K": SEG_B | SEG_C | SEG_E | SEG_F | SEG_G,
        "L": SEG_D | SEG_E | SEG_F,
        "M": SEG_A | SEG_B | SEG_C | SEG_E | SEG_F,
        "N": SEG_C | SEG_E | SEG_G,
        "O": SEG_A | SEG_B | SEG_C | SEG_D | SEG_E | SEG_F,
        "P": SEG_A | SEG_B | SEG_E | SEG_F | SEG_G,
        "Q": SEG_A | SEG_B | SEG_C | SEG_F | SEG_G,
        "R": SEG_E | SEG_G,
        "S": SEG_A | SEG_C | SEG_D | SEG_F | SEG_G,
        "T": SEG_D | SEG_E | SEG_F | SEG_G,
        "U": SEG_B | SEG_C | SEG_D | SEG_E | SEG_F,
        "V": SEG_B | SEG_C | SEG_D | SEG_E | SEG_F,
        "W": SEG_B | SEG_C | SEG_D | SEG_E | SEG_F | SEG_G,
        "X": SEG_B | SEG_C | SEG_E | SEG_F | SEG_G,
        "Y": SEG_B | SEG_C | SEG_D | SEG_F | SEG_G,
        "Z": SEG_A | SEG_B | SEG_D | SEG_E | SEG_G,
        "0": SEG_A | SEG_B | SEG_C | SEG_D | SEG_E | SEG_F,
        "1": SEG_B | SEG_C,
        "2": SEG_A | SEG_B | SEG_D | SEG_E | SEG_G,
        "3": SEG_A | SEG_B | SEG_C | SEG_D | SEG_G,
        "4": SEG_B | SEG_C | SEG_F | SEG_G,
        "5": SEG_A | SEG_C | SEG_D | SEG_F | SEG_G,
        "6": SEG_C | SEG_D | SEG_E | SEG_F | SEG_G,
        "7": SEG_A | SEG_B | SEG_C,
        "8": SEG_A | SEG_B | SEG_C | SEG_D | SEG_E | SEG_F | SEG_G,
        "9": SEG_A | SEG_B | SEG_C | SEG_F | SEG_G
    };
    
    function toLed(letter) {
        if (letter == undefined) return 0;
        return LETTERS[letter.toUpperCase()] || 0;
    }

    range.leds.write({
        upperOvenLedStatus: [
            toLed(text.substr(0, 1)),
            toLed(text.substr(1, 1)),
            toLed(text.substr(2, 1)),
            toLed(text.substr(3, 1)),
            toLed(text.substr(4, 1)),
            toLed(text.substr(5, 1)),
            toLed(text.substr(6, 1)),
            0, 0, led || 0, 0, 0, 0
        ],
        lowerOvenLedStatus: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
    });
}

function guess(range, led, callback) {
    var result = "";
    
    function update() {
        setText(range, "guess" + result, led);
    }
    
    function next(key) {
        if (key == KEY_CLEAR) {
            result = "";
        }
        else if (key == KEY_START) {
            return callback(parseInt(result));
        }
        else if (key >= 16 && key <= 25) {
            result += (key - 16);
            
            if (result.length == 3) {
                result = result.substr(1); // rotate
            }
        }
        else {
            // ignore key
        }
        
        update();
        range.once("key", next);
    }
    
    range.once("key", next);
    update();
}

app.plugin(require("gea-plugin-range"));

app.bind(adapter, function (bus) {
    bus.once("range", function (range) {
        var the_number, score;
        var key_presses = 0;
        
        range.fctMode.write(1);
        
        setInterval(function() {
            range.fctMode.write(1);
        }, 15000);
        
        range.clearLatchedKeyPresses();
        
        range.latchedKeyPresses.subscribe(function (value) {
            range.clearLatchedKeyPresses();
            
            if (key_presses++ % 2) {
                range.keyPressed.read(function (key) {
                    range.emit("key", key);
                });
            }
        });
        
        function lower() {
            setText(range, "", LED_LOWER);
            setTimeout(prompt, 1000);
            
        }
        
        function higher() {
            setText(range, "", LED_UPPER);
            setTimeout(prompt, 1000);
        }
        
        function prompt() {
            guess(range, LED_NONE, function (n) {
                score++;
                
                if (n < the_number) {
                    higher();
                }
                else if (n > the_number) {
                    lower();
                }
                else {
                    setText(range, "score" + score);
                    range.buzzerTone.write(5);
                    
                    range.once("key", function (key) {
                        newGame();
                    });
                }
            });
        }
        
        function newGame() {
            score = 0;
            the_number = Math.floor(Math.random() * 100);
            console.log("the magic number is " + the_number);
            prompt();
        }
        
        newGame();
    });
});

