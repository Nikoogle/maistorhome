#include <ESP8266WiFi.h>
#include <SoftwareSerial.h>
#include <MQTTClient.h>

//Provide UserName and PassWord here
const char* ssid = "AndroidAP";
const char* password = "12311231"; 

//Topics to Char*

char* RFIDTopic = "/rfid/"; //publish light sensor Analog Readings

//Define the IP of the MQTT Broker
const char* server = "192.168.43.73"; // server or URL of MQTT broker

String clientName = "NodeMCUrFID"; // just a name used to talk to MQTT broker
String macToStr(const uint8_t* mac)
{
  String result;
  for (int i = 0; i < 6; ++i) {
    result += String(mac[i], 16);
    if (i < 5)
      result += ':';
  }
  return result;
}


//Connect to Wi-Fi here

WiFiClient wifiClient;
MQTTClient client;

//Start

SoftwareSerial RFID(2, 3); // RX and TX
 
int i;

int counter = 0;

void setup()
{
  RFID.begin(9600);    // start serial to RFID reader
  Serial.begin(115200);  // start serial to PC 
  Serial.println("Connected");

    client.begin(server,wifiClient);
  Serial.print("Connecting to ");
  Serial.println(ssid);  
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(300);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");  
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

   // Generate client name based on MAC address and last 8 bits of microsecond counter
  uint8_t mac[6];
  WiFi.macAddress(mac);
  clientName += macToStr(mac);
  clientName += "-";
  clientName += String(micros() & 0xff, 16);

  Serial.print("Connecting to ");
  Serial.print(server);
  Serial.print(" as ");
  Serial.println(clientName);

  if (client.connect((char*) clientName.c_str())) {
    Serial.println("Connected to MQTT broker");
  }
  else {
    Serial.println("MQTT connect failed");
    Serial.println("Will reset and try again...");
    abort();
  
}
}

String msg = "";
bool shouldDelay = false;

void loop()

//DelayFix KUREC BATE
{  
   if(shouldDelay){
   delay(1000);
   RFID.flush();
   shouldDelay=false;
}

//RFID Start Here
  if (RFID.available() > 0) 
  {
     i = RFID.read();
    Serial.print(i, DEC);
    Serial.print(",");
     
     //publish to MQTT
//     int val=(i);
     msg+=i;
     msg+=",";

      counter++;
      counter%=14;
//      counter == 14 ? msg+="," : msg=msg;
      if(counter==0){
        client.publish(RFIDTopic, msg);
        msg = "";
        shouldDelay=true;     
      }
      
  }
}

void messageReceived(String topic, String payload, char * bytes, unsigned int length) {
}
