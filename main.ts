function controlMouth (status: string) {
    showMouth = smile
    switch(status) {
        case 'kiss':
            showMouth = kiss;
            break;
        case 'frown':
            showMouth = frown;
            break;
        case 'denied':
            showMouth = denied;
            break;
        case 'meh':
            showMouth = meh;
            break;
        case 'derp':
            showMouth = derp;
            break;
    }
max7219_matrix.displayCustomCharacter(
    showMouth,
    0,
    true
    )
}
function controlRGB (red: number, green: number, blue: number) {
    if (red != rgbRed) {
        pins.digitalWritePin(DigitalPin.P3, red)
        rgbRed = red
    }
    if (green != rgbGreen) {
        pins.digitalWritePin(DigitalPin.P4, green)
        rgbGreen = green
    }
    if (blue != rgbBlue) {
        pins.digitalWritePin(DigitalPin.P6, blue)
        rgbBlue = blue
    }
}
// basic.showString(text)
function displayScreen (text: string) {
	
}
function moveHead (direction: string) {
    if (direction == "up") {
        controlHead(headVerticalStraight + headVerticalMotion, headHorizontalStraight)
    } else if (direction == "down") {
        controlHead(headVerticalStraight - headVerticalMotion, headHorizontalStraight)
    } else if (direction == "left") {
        controlHead(headVerticalStraight, headHorizontalStraight + headHorizontalMotion)
    } else if (direction == "right") {
        controlHead(headVerticalStraight, headHorizontalStraight - headHorizontalMotion)
    } else if (direction == "upleft") {
        controlHead(headVerticalStraight + headVerticalMotion, headHorizontalStraight + headHorizontalMotion)
    } else if (direction == "downleft") {
        controlHead(headVerticalStraight - headVerticalMotion, headHorizontalStraight + headHorizontalMotion)
    } else if (direction == "upright") {
        controlHead(headVerticalStraight + headVerticalMotion, headHorizontalStraight - headHorizontalMotion)
    } else if (direction == "downright") {
        controlHead(headVerticalStraight - headVerticalMotion, headHorizontalStraight - headHorizontalMotion)
    } else if (direction == "forward") {
        controlHead(headVerticalStraight, headHorizontalStraight)
    }
}
input.onButtonPressed(Button.A, function () {
    newMouth = "smile"
    moveHead("up")
    controlRGB(1, 0, 1)
})
function blink () {
    if (input.runningTime() >= nextBlinkTime) {
        if (blinkOn == 1) {
            if (eyeStatus == 1) {
                controlEyes("close")
                eyeStatus = 0
                blinkTimer = 500
            } else {
                controlEyes("open")
                eyeStatus = 1
                blinkTimer = randint(blinkMin, blinkMax)
            }
        }
        nextBlinkTime = input.runningTime() + blinkTimer
    }
}
input.onGesture(Gesture.TiltLeft, function () {
    moveHead("left")
    controlRGB(0, 0, 1)
})
function controlEyes (status: string) {
    if (status == "close") {
        pins.servoWritePin(AnalogPin.P8, eyesClosed)
    } else {
        pins.servoWritePin(AnalogPin.P8, eyesOpen)
    }
}
input.onButtonPressed(Button.AB, function () {
    if (blinkOn == 0) {
        blinkOn = 1
    } else {
        blinkOn = 0
    }
    basic.showString("" + (blinkOn))
})
radio.onReceivedString(function (receivedString) {
    lastRadio = radio.receivedPacket(RadioPacketProperty.SignalStrength)
    basic.showString(receivedString.substr(0, 1))
    basic.showNumber(lastRadio)
    pins.servoWritePin(AnalogPin.P16, 180)
    basic.pause(5000)
    pins.servoWritePin(AnalogPin.P16, 0)
    basic.pause(5000)
    pins.servoWritePin(AnalogPin.P16, 90)
})
input.onButtonPressed(Button.B, function () {
    newMouth = "frown"
    moveHead("down")
    controlRGB(1, 0, 0)
})
input.onGesture(Gesture.Shake, function () {
    moveHead("forward")
    controlRGB(0, 0, 0)
})
input.onGesture(Gesture.TiltRight, function () {
    moveHead("right")
    controlRGB(0, 1, 0)
})
function controlHead (vertical: number, horizontal: number) {
    pins.servoWritePin(AnalogPin.P1, horizontal)
    pins.servoWritePin(AnalogPin.P2, vertical)
}
let cMouth = ""
let blinkTimer = 0
let nextBlinkTime = 0
let rgbBlue = 0
let rgbGreen = 0
let rgbRed = 0
let lastRadio = 0
let newMouth = ""
let smile: number[] = []
let eyeStatus = 0
let eyesClosed = 0
let eyesOpen = 0
let blinkOn = 0
let blinkMin = 0
let blinkMax = 0
let headVerticalMotion = 0
let headHorizontalMotion = 0
let headVerticalStraight = 0
let headHorizontalStraight = 0
let horizontal = 0
let vertical = 0
let showMouth: number[] = []
headHorizontalStraight = 80
headVerticalStraight = 70
headHorizontalMotion = 30
headVerticalMotion = 12
blinkMax = 5000
blinkMin = 8000
blinkOn = 1
eyesOpen = 87
eyesClosed = 160
eyeStatus = 0
let eyeTimer = blinkMin
max7219_matrix.setup(
1,
DigitalPin.P16,
DigitalPin.P15,
DigitalPin.P14,
DigitalPin.P13
)
smile = max7219_matrix.getCustomCharacterArray(
"B00000000,B00000000,B00000000,B11000011,B11000011,B11000011,B11111111,B01111110"
)
let kiss = max7219_matrix.getCustomCharacterArray(
"B01111110,B01111110,B11000011,B11000011,B11000011,B11000011,B11111111,B01111110"
)
let frown = max7219_matrix.getCustomCharacterArray(
"B00000000,B00000000,B00000000,B01111110,B11111111,B11000011,B11000011,B11000011"
)
let denied = max7219_matrix.getCustomCharacterArray(
"B11000011,B11100111,B01111110,B00011000,B00011000,B01111110,B11100111,B11000011"
)
let meh = max7219_matrix.getCustomCharacterArray(
"B00000000,B00000000,B00000000,B11111111,B11111111,B00000000,B00000000,B00000000"
)
let derp = max7219_matrix.getCustomCharacterArray(
"B00000000,B00000000,B11000011,B11000011,B11111111,B01111110,B00001110,B00000100"
)
newMouth = "meh"
// const mouthShapes = {
// smile: max7219_matrix.getCustomCharacterArray(
// "B00000000,B00000000,B00000000,B11000011,B11000011,B11000011,B11111111,B01111110",
// ),
// kiss: max7219_matrix.getCustomCharacterArray(
// "B01111110,B01111110,B11000011,B11000011,B11000011,B11000011,B11111111,B01111110"
// ),
// frown: max7219_matrix.getCustomCharacterArray(
// "B00000000,B00000000,B00000000,B01111110,B11111111,B11000011,B11000011,B11000011"
// ),
// denied: max7219_matrix.getCustomCharacterArray(
// "B11000011,B11100111,B01111110,B00011000,B00011000,B01111110,B11100111,B11000011"
// ),
// meh: max7219_matrix.getCustomCharacterArray(
// "B00000000,B00000000,B00000000,B11111111,B11111111,B00000000,B00000000,B00000000"
// ),
// derp: max7219_matrix.getCustomCharacterArray(
// "B00000000,B00000000,B11000011,B11000011,B11111111,B01111110,B00001110,B00000100"
// )
// }
led.enable(false)
lastRadio = 0
radio.setGroup(42)
controlHead(headVerticalStraight, headHorizontalStraight)
controlEyes("close")
control.inBackground(function () {
    while (true) {
        basic.pause(200)
        if (cMouth != newMouth) {
            controlMouth(newMouth)
            cMouth = newMouth
        }
        blink()
    }
})
