

/* ESP8266 + MQTT Humidity and Temperature + LightsNode
 * Relay Controll from LocalMQTT from messageReceived()
 * Can also receive commands; adjust messageReceived() function 
 * Author: Nikolay Stankov, 2017
 */

#include <MQTTClient.h>
#include <ESP8266WiFi.h>
#include <DHT.h>


//Provide UserName and PassWord here
const char* ssid = "AndroidAP";
const char* password = "12311231"; 

// Topics to Char*

char* tempTopic = "/temperature/"; //topic to publish temperatures readings to
char* humidityTopic = "/humidity/"; // publish humidity readings
char* photoTopic = "/photo/"; //publish light sensor Analog Readings

//Define the IP of the MQTT Broker
const char* server = "192.168.43.73"; // server or URL of MQTT broker

String clientName = "NodeMCUSensors"; // just a name used to talk to MQTT broker
long interval = 15000; //(ms) - 60 seconds between reports
unsigned long resetPeriod = 864000000; // 1 day - this is the period after which we restart the CPU, to deal with odd memory leak errors

#define DHTTYPE DHT11 // DHT11 or DHT22;
#define DHTPIN  16 // The pin used for "Signal" on the DHT11 Sensor
#define PhotoResistor A0 // Analog pin! Use A0 for NodeMCU 1.0

unsigned long prevTime;
DHT dht(DHTPIN, DHTTYPE,11); 
float h, t;  

// Connect to Wi-Fi here

WiFiClient wifiClient;
MQTTClient client;
long lastMsg = 0;
int threhold=50;

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

void setup() {
//StartSerial Connection here
  Serial.begin(115200);
  dht.begin();   
  
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

  prevTime = 0;
}

void loop() {
  static int counter = 0;
  long now = millis();
  
  if(prevTime + interval < millis() || prevTime == 0){
    prevTime = millis();
    Serial.println("checking again");
    Serial.println(prevTime);
    
    h = dht.readHumidity();
    t = dht.readTemperature();
    
    h = h*1.23;
    t = t*1.1;

   if (now - lastMsg > 500) {
    lastMsg = now;
    int val=analogRead(PhotoResistor);
     String msg;
     msg=val;
   if (val>threhold)
      msg=msg;
    else
      msg="NotCalibrated: "+msg;
     char message[58];
     msg.toCharArray(message,58);
     Serial.println("Photoresistor value is:");
     Serial.println(message);
     //publish photo sensor data to MQTT broker

      client.publish(photoTopic, message);
   }       
    // Check if any reads failed and exit early (to try again).
    if (isnan(h) || isnan(t)) {
      Serial.println("Failed to read from DHT sensor!");
    }
    else if(!client.connected()){
      Serial.println("Connection to broker lost; retrying");
    }
    else{
      char* tPayload = f2s(t,0);
      char* hPayload = f2s(h,0);

      Serial.println("Temperature is:");
      Serial.println(tPayload);
      Serial.println("Humidity is");
      Serial.println(hPayload);

      client.publish(tempTopic, tPayload);
      client.publish(humidityTopic, hPayload);
      Serial.println("Published all sensor data to MaistorPi");
      }
      
  }
  
  client.loop();

  // reset after a day to avoid memory leaks 
  if(millis()>resetPeriod){
    ESP.restart();
  }
}


/* float to string
 * f is the float to turn into a string
 * p is the precision (number of decimals)
 * return a string representation of the float.
 */
char *f2s(float f, int p){
  char * pBuff;                         // use to remember which part of the buffer to use for dtostrf
  const int iSize = 10;                 // number of buffers, one for each float before wrapping around
  static char sBuff[iSize][20];         // space for 20 characters including NULL terminator for each float
  static int iCount = 0;                // keep a tab of next place in sBuff to use
  pBuff = sBuff[iCount];                // use this buffer
  if(iCount >= iSize -1){               // check for wrap
    iCount = 0;                         // if wrapping start again and reset
  }
  else{
    iCount++;                           // advance the counter
  }
  return dtostrf(f, 0, p, pBuff);       // call the library function
}

void messageReceived(String topic, String payload, char * bytes, unsigned int length) {
}
