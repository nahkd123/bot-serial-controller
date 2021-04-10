/*
 * Arduino code for the bot
 * Use this code with the web bot serial controller
 * 
 * See irsensor.h to edit the sensor sensitivity and input pins
 */

#include <Servo.h>
#include <kmotor.h>
#include "irsensor.h"
#include "datawriter.h"

// Change this value to your LED digital pin
#define LED_EXTERNAL 13
// Serial baud rate. The rate for HC-06 bluetooth module is 9600
#define SERIAL_BAUD_RATE 9600

// Booleans
#define T true
#define F false

// Servo
#define CANG_SERVO_PIN A1

// Enums
// 1. Enum for states
#define STATE_INIT 0
#define STATE_MANUAL 1
#define STATE_AUTOTRACE 2

// Sensors
kmotor myMotor(true);
Servo cang;
IRSensor ir;

// States
unsigned int currentState = STATE_INIT;
bool slowMode = false;

void setMovementSpeed(int mA, int mB) {
  myMotor.tien(0, mA / (slowMode? 2 : 1));
  myMotor.tien(1, mB / (slowMode? 2 : 1));
}

// Main program
void setup() {
  myMotor.cauhinh();

  pinMode(IR_RIM_LEFT, INPUT);
  pinMode(IR_LEFT, INPUT);
  pinMode(IR_RIGHT, INPUT);
  pinMode(IR_RIM_RIGHT, INPUT);

  pinMode(LED_BUILTIN, OUTPUT);

  cang.attach(CANG_SERVO_PIN);
  Serial.begin(SERIAL_BAUD_RATE);
}

void controllerLoop() {
  int button = Serial.read();
  if (button == 0) {
    writeShort(ir.sensors[0]);
    writeShort(ir.sensors[1]);
    writeShort(ir.sensors[2]);
    writeShort(ir.sensors[3]);
  }
  if (button == 1) slowMode = true;
  if (button == 2) slowMode = false;
  if (button == 3) digitalWrite(LED_EXTERNAL, HIGH);
  if (button == 4) digitalWrite(LED_EXTERNAL, LOW);

  // Movement
  // now with backward compatiblity
  if (button == 'S') setMovementSpeed(0, 0);
  if (button == 'F') setMovementSpeed(255, 255);
  if (button == 'B') setMovementSpeed(-255, -255);
  if (button == 'L') setMovementSpeed(-150, 150);
  if (button == 'R') setMovementSpeed(150, -150);
  if (button == 'C') setMovementSpeed(150, 255);
  if (button == 'M') setMovementSpeed(255, 150);
  if (button == 'E') setMovementSpeed(-150, -255);
  if (button == 'P') setMovementSpeed(-255, -150);

  if (button == 'G') cang.write(130);
  if (button == 'g') cang.write(85);

  if (button == '0') currentState = STATE_AUTOTRACE;
  if (button == '1') currentState = STATE_MANUAL;
}

void autopivot() {
  if (ir.check(F, F, F, F)) setMovementSpeed(-100, -100);
  if (ir.check(T, F, F, F)) setMovementSpeed(-150, 150);
  if (ir.check(F, T, F, F)) {}
  if (ir.check(T, T, F, F)) setMovementSpeed(150, 200);
  if (ir.check(F, F, T, F)) {}
  if (ir.check(T, F, T, F)) {}
  if (ir.check(F, T, T, F)) setMovementSpeed(250, 250);
  if (ir.check(T, T, T, F)) setMovementSpeed(150, 255);
  if (ir.check(F, F, F, T)) setMovementSpeed(150, -150);
  if (ir.check(T, F, F, T)) {}
  if (ir.check(F, T, F, T)) {}
  if (ir.check(T, T, F, T)) {}
  if (ir.check(F, F, T, T)) setMovementSpeed(200, 150);
  if (ir.check(T, F, T, T)) {}
  if (ir.check(F, T, T, T)) setMovementSpeed(255, 150);
  if (ir.check(T, T, T, T)) {}
}

void loop() {
  //ir.readAndPrint();
  //delay(100);
  ir.update();
  controllerLoop();
  if (currentState == STATE_INIT) {}
  if (currentState == STATE_MANUAL) {}
  if (currentState == STATE_AUTOTRACE) autopivot();
}

/*
Analog pins for IR sensor:
A5   A7   A6   A4 (top down view, facing forward)
*/
