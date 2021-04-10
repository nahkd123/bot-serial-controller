// Data writer
// This providers utilities to write dofferent value types to serial

void writeShort(int val) {
  Serial.write((val & 0xFF00) >> 8);
  Serial.write((val & 0x00FF));
}
