#include <DFRobot_Gesture.h>
#include <Wire.h>

int testPin= 8;
unsigned char cmd;

DFRobot_Gesture myGesture;

void setup()
{
  Wire.begin();        // join i2c bus (address optional for master)
  Serial.begin(9600);  // start serial for output
 pinMode(testPin, INPUT);  
 Serial.write("3D Gesture sensor is now running....\r\n");  
}

void loop()
{
  Serial.println(digitalRead(testPin));
  if(digitalRead(testPin)==0)
  {    
   Serial.println("gesture1"); 
   myGesture.I2C1_MasterRead(md.buf,26,0x42); //The address is:0x42
   Serial.println("gesture2");
   cmd = myGesture.mgcProcMsg();     //process the message
          Serial.println("gestur3");
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
                        
                    default: break;
                }
            }
  } 
 else  {};
 delay(500);
}   
