// IR sensor inputs pin number.
// All of them are analog
#define IR_RIM_LEFT A5
#define IR_LEFT A7
#define IR_RIGHT A6
#define IR_RIM_RIGHT A4

// The sensor sensitivity
// Upload the code to your board then connect to your board using the web bot serial controller
// to check bot values
#define IR_SENSITIVITY 450

struct IRSensor {
  int sensors[4];
  bool activations[4];

  void update() {
    sensors[0] = analogRead(IR_RIM_LEFT);
    sensors[1] = analogRead(IR_LEFT);
    sensors[2] = analogRead(IR_RIGHT);
    sensors[3] = analogRead(IR_RIM_RIGHT);

    for (int i = 0; i < 4; i++) activations[i] = sensors[i] > IR_SENSITIVITY;
  }

  bool check(bool t1, bool t2, bool t3, bool t4) {
    return activations[0] == t1 && activations[1] == t2 && activations[2] == t3 && activations[3] == t4;
  }
};
