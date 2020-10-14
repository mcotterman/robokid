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
function displayScreen (text: string) {
    basic.showString(text)
}
input.onButtonPressed(Button.A, function () {
    newMouth = "smile"
    controlHead(headDownMax, headHorizontalStraight)
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
    controlHead(headVerticalStraight, headLeftMax)
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
    controlHead(headUpMax, headHorizontalStraight)
})
input.onGesture(Gesture.Shake, function () {
    controlHead(headVerticalStraight, headHorizontalStraight)
})
input.onGesture(Gesture.TiltRight, function () {
    controlHead(headVerticalStraight, headRightMax)
})
function controlHead (vertical: number, horizontal: number) {
    if (vertical > headUpMax || vertical < headDownMax) {
        vertical = headVerticalStraight
    }
    if (horizontal > headLeftMax || horizontal < headRightMax) {
        horizontal = headHorizontalStraight
    }
    pins.servoWritePin(AnalogPin.P1, horizontal)
    pins.servoWritePin(AnalogPin.P2, vertical)
}
let cMouth = ""
let horizontal = 0
let vertical = 0
let blinkTimer = 0
let nextBlinkTime = 0
let lastRadio = 0
let newMouth = ""
let smile: number[] = []
let eyeStatus = 0
let eyesClosed = 0
let eyesOpen = 0
let blinkOn = 0
let headHorizontalStraight = 0
let headVerticalStraight = 0
let headRightMax = 0
let headLeftMax = 0
let headDownMax = 0
let headUpMax = 0
let blinkMin = 0
let blinkMax = 0
let showMouth: number[] = []
blinkMax = 5000
blinkMin = 8000
headUpMax = 170
headDownMax = 10
headLeftMax = 170
headRightMax = 10
headVerticalStraight = 90
headHorizontalStraight = 90
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
led.enable(true)
lastRadio = 0
radio.setGroup(42)
controlHead(headVerticalStraight, headHorizontalStraight)
controlEyes("close")
basic.showString("" + (blinkOn))
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
