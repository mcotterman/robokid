function displayScreen (text: string) {
    basic.showString(text)
}
function blink () {
    while (true) {
        if (blinkOn == 0) {
            if (eyeStatus == 1) {
                controlEyes("close")
                eyeStatus = 0
                blinkTimer = 500
            } else {
                controlEyes("open")
                eyeStatus = 1
                blinkTimer = randint(2000, 5000)
            }
        }
        basic.pause(blinkTimer)
    }
}
function mouth (status: string) {
	
}
function controlEyes (status: string) {
    if (status == "close") {
        pins.servoWritePin(AnalogPin.P5, eyesClosed)
    } else {
        pins.servoWritePin(AnalogPin.P5, eyesOpen)
    }
}
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
let blinkTimer = 0
let lastRadio = 0
let eyeStatus = 0
let eyesClosed = 0
let eyesOpen = 0
let blinkOn = 0
let smile: number[] = []
blinkOn = 0
eyesOpen = 87
eyesClosed = 160
eyeStatus = 0
let eyeTimer = 2000
max7219_matrix.setup(
1,
DigitalPin.P16,
DigitalPin.P15,
DigitalPin.P14,
DigitalPin.P13
)
const mouthShapes = {
    smile: max7219_matrix.getCustomCharacterArray(
    "B00000000,B00000000,B00000000,B11000011,B11000011,B11000011,B11111111,B01111110",
    ),
    kiss: max7219_matrix.getCustomCharacterArray(
    "B01111110,B01111110,B11000011,B11000011,B11000011,B11000011,B11111111,B01111110"
    ),
    frown: max7219_matrix.getCustomCharacterArray(
    "B00000000,B00000000,B00000000,B01111110,B11111111,B11000011,B11000011,B11000011"
    ),
    denied: max7219_matrix.getCustomCharacterArray(
    "B11000011,B11100111,B01111110,B00011000,B00011000,B01111110,B11100111,B11000011"
    ),
    meh: max7219_matrix.getCustomCharacterArray(
    "B00000000,B00000000,B00000000,B11111111,B11111111,B00000000,B00000000,B00000000"
    ),
    derp: max7219_matrix.getCustomCharacterArray(
    "B00000000,B00000000,B11000011,B11000011,B11111111,B01111110,B00001110,B00000100"
    )
}
smile = max7219_matrix.getCustomCharacterArray(
"B00100000,B01000000,B10000110,B10000000,B10000000,B10000110,B01000000,B00100000"
)
max7219_matrix.displayLEDsForOne(
smile,
0
)
led.enable(true)
lastRadio = 0
radio.setGroup(42)
controlEyes("open")
displayScreen("RoboKid")
blink()
basic.forever(function () {
	
})
