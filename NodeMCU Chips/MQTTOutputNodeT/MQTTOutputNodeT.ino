//ItKindaWorks - Creative Commons 2016
//github.com/ItKindaWorks
//
//Requires PubSubClient found here: https://github.com/knolleary/pubsubclient
//
//ESP8266 Simple MQTT light controller


#include <PubSubClient.h>
#include <ESP8266WiFi.h>


//EDIT THESE LINES TO MATCH YOUR SETUP
#define MQTT_SERVER "192.168.43.73"
const char* ssid = "AndroidAP";
const char* password = "12311231";

//LED on ESP8266 GPIO2
const int RelayPin1 = 16;
const int RelayPin2 = 5;
const int RelayPin3 = 4;
const int RelayPin4 = 0;

// Topics to Char*

char* RelayTopic1 = "/relay1/";
char* RelayTopic2 = "/relay2/";
char* RelayTopic3 = "/relay3/";
char* RelayTopic4 = "/relay4/";


WiFiClient wifiClient;
PubSubClient client(MQTT_SERVER, 1883, callback, wifiClient);


void setup() {
  //initialize the Relays as an output and set to LOW (off)
  pinMode(RelayPin1, OUTPUT);
  digitalWrite(RelayPin1, LOW);
  
  pinMode(RelayPin2, OUTPUT);
  digitalWrite(RelayPin2, LOW);
  
  pinMode(RelayPin3, OUTPUT);
  digitalWrite(RelayPin3, LOW);
  
  pinMode(RelayPin4, OUTPUT);
  digitalWrite(RelayPin4, LOW);

  //start the serial line for debugging
  Serial.begin(115200);
  delay(100);


  //start wifi subsystem
  WiFi.begin(ssid, password);
  //attempt to connect to the WIFI network and then connect to the MQTT server
  reconnect();

  //wait a bit before starting the main loop
      delay(2000);
}



void loop(){

  //reconnect if connection is lost
  if (!client.connected() && WiFi.status() == 3) {reconnect();}

  //maintain MQTT connection
  client.loop();

  //MUST delay to allow ESP8266 WIFI functions to run
  delay(40); 
}

void callback(char* RelayTopic, byte* payload, unsigned int length) {
  if(payload[0]=='1')
    callback1(RelayTopic, payload+1, length-1);
  if(payload[0]=='2')
    callback2(RelayTopic, payload+1, length-1);
  if(payload[0]=='3')
    callback3(RelayTopic, payload+1, length-1);
  if(payload[0]=='4')
    callback4(RelayTopic, payload+1, length-1);
  
}

void callback1(char* RelayTopic, byte* payload, unsigned int length) {

  //convert topic to string to make it easier to work with

  //Print out some debugging info
  Serial.println("Callback update.");
  Serial.print("Topic: ");
  Serial.println(RelayTopic1);

  //turn the light on if the payload is '1' and publish to the MQTT server a confirmation message
  if(payload[0] == '1'){
    digitalWrite(RelayPin1, HIGH);
    client.publish("/feedback/", "Relay 1 is On");
  }

  //turn the light off if the payload is '0' and publish to the MQTT server a confirmation message
  else if (payload[0] == '0'){
    digitalWrite(RelayPin1, LOW);
    client.publish("/feedback/", "Relay 1 is Off");
  }
}

void callback2(char* RelayTopic2, byte* payload, unsigned int length) {
    if(payload[0] == '1'){
    digitalWrite(RelayPin2, HIGH);
    client.publish("/feedback/", "Relay 2 is On");
  }

  //turn the light off if the payload is '0' and publish to the MQTT server a confirmation message
  else if (payload[0] == '0'){
    digitalWrite(RelayPin2, LOW);
    client.publish("/feedback/", "Relay 2 is Off");
  }
}

void callback3(char* RelayTopic3, byte* payload, unsigned int length) {
    if(payload[0] == '1'){
    digitalWrite(RelayPin3, HIGH);
    client.publish("/feedback/", "Relay 3 is On");
  }

  //turn the light off if the payload is '0' and publish to the MQTT server a confirmation message
  else if (payload[0] == '0'){
    digitalWrite(RelayPin3, LOW);
    client.publish("/feedback/", "Relay 3 is Off");
  }
}

void callback4(char* RelayTopic4, byte* payload, unsigned int length) {
    if(payload[0] == '1'){
    digitalWrite(RelayPin4, HIGH);
    client.publish("/feedback/", "Relay 4 is On");
  }

  //turn the light off if the payload is '0' and publish to the MQTT server a confirmation message
  else if (payload[0] == '0'){
    digitalWrite(RelayPin4, LOW);
    client.publish("/feedback/", "Relay 4 is Off");
  }

}

void reconnect() {

  //attempt to connect to the wifi if connection is lost
  if(WiFi.status() != WL_CONNECTED){
    //debug printing
    Serial.print("Connecting to ");
    Serial.println(ssid);

    //loop while we wait for connection
    while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
    }

    //print out some more debug once connected
    Serial.println("");
    Serial.println("WiFi connected");  
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
  }

  //make sure we are connected to WIFI before attemping to reconnect to MQTT
  if(WiFi.status() == WL_CONNECTED){
  // Loop until we're reconnected to the MQTT server
    while (!client.connected()) {
      Serial.print("Attempting MQTT connection...");

      // Generate client name based on MAC address and last 8 bits of microsecond counter
      String clientName;
      clientName += "NodeMCUOutput";
      uint8_t mac[6];
      WiFi.macAddress(mac);
      clientName += macToStr(mac);

      //if connected, subscribe to the topic(s) we want to be notified about
      if (client.connect((char*) clientName.c_str())) {
        Serial.print("\tMTQQ Connected");
        client.subscribe(RelayTopic1);
        client.subscribe(RelayTopic2);
        client.subscribe(RelayTopic3);
        client.subscribe(RelayTopic4);
      }

      //otherwise print failed for debugging
      else{Serial.println("\tFailed."); abort();}
    }
  }
}

//generate unique name from MAC addr
String macToStr(const uint8_t* mac){

  String result;

  for (int i = 0; i < 6; ++i) {
    result += String(mac[i], 16);

    if (i < 5){
      result += ':';
    }
  }

  return result;
}

