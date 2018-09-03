#include <IRremote.h>
#include<math.h>

#include <dht11.h>
#include <DFRobot_Gesture.h>
#include <Wire.h>

int testPin= 8;
unsigned char cmd;

DFRobot_Gesture myGesture;
 
dht11 DHT11;
#define PIN_DHT11 7
 
const float voltagePower=3.3;
const float Rs=17;//采样电阻为21.5千欧
const int B=3950;
const double T1=273.15+25;//常温
const double R1=10;
 
int PIN_RECV = 11;
int sensorPin = A0;    // select the input pin for the potentiometer
int ledPin = 13;      // select the pin for the LED
int sensorValue = 0;  // variable to store the value coming from the sensor
int option_on = 98;
int option_off = 97;

const int TrigPin = 2; //发出超声波
const int EchoPin = 3; //收到反射回来的超声波
float cm;

IRrecv irrecv(PIN_RECV);
decode_results results;

boolean sw=false;
void setup() {
  // declare the ledPin as an OUTPUT:
  pinMode(ledPin, OUTPUT);
  irrecv.enableIRIn();
  pinMode(TrigPin, OUTPUT); 
  pinMode(EchoPin, INPUT);
  Serial.begin(9600);
  Wire.begin();        // join i2c bus (address optional for master)
 pinMode(testPin, INPUT);  
}

void loop() {
  // read the value from the sensor:
  //光感
   Serial .flush();
   sensorValue = analogRead(sensorPin);
   Serial.println("light");
   Serial.println(sensorValue);
   //红外线控制
   if (irrecv.decode(&results)) {
    switch (results.value){
    case 0xFF6897:
    sw=!sw;
    digitalWrite(ledPin, sw);
    break;
    }
    irrecv.resume();
  }
    int ch = Serial.read();
    if (ch == option_on){
      digitalWrite(ledPin, HIGH);
      sw=true;
    }
    if (ch == option_off){
      digitalWrite(ledPin, LOW);
      sw=false;   
    }
    if (sw){
    Serial.println(1);  
    }
    else{
    Serial.println(0); 
    }
    //超声波测距
  digitalWrite(TrigPin, LOW); //低高低电平发一个短时间脉冲去TrigPin 
  delayMicroseconds(2);       // delayMicroseconds在更小的时间内延时准确
  digitalWrite(TrigPin, HIGH); 
  delayMicroseconds(10); 
  digitalWrite(TrigPin, LOW); //通过这里控制超声波的发射
  
  cm = pulseIn(EchoPin, HIGH) / 58.0; //将回波时间换算成cm 
  cm = (int(cm * 100.0)) / 100.0; //保留两位小数 
  Serial.println(cm);
  //热敏
//  double digitalValue=analogRead(1);
//  double voltageValue=(digitalValue/1023)*5;
//  Serial.print("Current voltage value=");
//  Serial.println(voltageValue);
//  
//  
//  double Rt=((voltagePower-voltageValue)*Rs)/voltageValue;
//  Serial.print("Current registor value=");
//  Serial.println(Rt);
// 
// 
//  Serial.print("Current temperature value=");
//  Serial.println(((T1*B)/(B+T1*log(Rt/R1)))-273.15);//
//  Serial.println();
// 温湿度模块
  DHT11.read(PIN_DHT11);
  Serial.println((float)DHT11.humidity, 2);
  Serial.println((float)DHT11.temperature, 2);
  //体感
  if(digitalRead(testPin)==0)
  {    
   myGesture.I2C1_MasterRead(md.buf,26,0x42); //The address is:0x42
   cmd = myGesture.mgcProcMsg();     //process the message
          if(cmd != GI_NOGESTURE )
            {
                switch(cmd)
                {               
                    case GI_FLICK_R:
                      Serial.println("RIGHT");
                        break;
                    case GI_FLICK_L:
                        Serial.println("LEFT");
                        break;
                    case GI_FLICK_D:
                     Serial.println("DOWN");
                        break;
                    case GI_FLICK_U:
                       Serial.println("UP");
                        break;
                    case GI_AIRWHEEL_CW://Clockwise in circles
                     Serial.println("CW");
                        break;
                    case GI_AIRWHEEL_CCW://Counterclockwise circles
                       Serial.println("CCW");
                        break;
                        
                    default: 
                     Serial.println("none");
                    break;
                }
            }
  } 
 else  {};
    delay(500);
}
