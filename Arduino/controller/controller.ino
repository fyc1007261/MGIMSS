int ledPin = 13;
int option_on = 98;
int option_off = 97;

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  while (1){
    int ch = Serial.read();
    if (ch == option_on)
      digitalWrite(ledPin, HIGH);
    if (ch == option_off)
      digitalWrite(ledPin, LOW);
    Serial.println(ch);
    delay(500);
  }
}
