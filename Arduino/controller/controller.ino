int ledPin = 13;


void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  while (1){
    int ch = Serial.read();
    if (ch==98)
      digitalWrite(ledPin, HIGH);
    if (ch==97)
      digitalWrite(ledPin, LOW);
    Serial.println(ch);
    delay(500);
  }
}
