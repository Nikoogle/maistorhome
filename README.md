Documentation for the full thing can be found here:
http://smartmaistor.pbworks.com


-----------
1. The Hardware

*Arduino Uno

-An environment for testing of the schematics prior upload to the ESP Chips.

-Has lots of memory, easy serial monitoring and lots of GPIO Pins for controlls ( easily numerated on tha board)

-Has the abbility for 5v external power supply

 

**NodeMCU v1 ( ESP8266)
- NodeMCU v1 PinOUT Schematics: http://www.alselectro.com/images/nodemcu4.jpg

 -The NodeMCU is a smart little device. It is the ESP8266 Chip( WiFi Enabled) together with a flash module, featuring MicroUSB for flashing.

- Great for IOT Prototyping
-Lots of documentation for it:

--Home-Automation-With-the-ESP8266-Marco-Schwartz 

--Using-the-ESP8266-Module

--NodeMCU-API-Instruction-En

--ESP8266__Datasheet__EN_v4.3

 

 

**Raspberry Pi Model 3 B

-Used as an MQTT Server and host for AlexaPi

 

 

**Captiva Monitor ( no HDMI ;( )

-Used as a Monitor for coding the Raspberry

-NO HDMI, needs convertor

 

**DVI to HDMI convertor (NOT OURS)

-Used to connect the VGA to HDMI to the Raspberry

 

**4 Relay pin-out board

-The same has 6 pins: (left to right)

VCC - 3.3v/5v

GND(Ground)
IN1 - Controls Relay 1( most left)

IN2 - Controls Relay 2

IN3 - Controls Relay 3

IN4 - Controls Relay 4(most right)

-Other side of the Relay- identical for all relays

 

Usually you will see as output, 3 Pins for each relay: "NO" ("Normal Open"), "Ref" or "COM" ("Reference" or "Common") and "NC" ("Normal Closed"). We will use the NO and COM for each Relay. On the above example, the "COM" is the terminal to connect to external Positive Pin of the 5V Power Supply (in the case of the Pump) or the 220VAC for the Lamp. The "NO" will be connected to Pump (or Lamp or WHATEVER).


- In the specific case of our relay, it should be tested, but I think that it is as follow:
[ - NC

\- Common

]- NO 

 

**Breadboard

Used for prototyping and all.

It is a geat tool, as you can deliver power to the + - Terminals w/o the same interfering with any pins.
The power lines go like this: _____________

The pin lines go like this: | | | | | | | | | | | | | |

 

**USB sound card.
The same is used to deliver INPUT( ONLY IN OUR CASE), as the Raspberry's 3.5 MM jack does not recognize any sort of INPUT.

Make sure that the same is recognized by the raspberry, by doing the command

 

- sudo lsusb

 

You should see sound output card/audio card or whatever the motherland decided. If you do not see the same, troubleshoot.
Start by moving the soundcard to another USB port and etc.

Make sure that the inputs are in the right place and all the way in. It sounds stupid but I did this like 5 times...

  

**3,5mm Microphone.

NB! Use good quality mic

 

**Raspberry Pi Charger (NOT OURS)

- Used to deliver 5v at 2.5A which is vital for the work of the Raspberry.

 

**Jumper Cables (M-F ; M-M; F-F)

-You will need a bunch

 

**USB Micro Calbes (3 cables)

Node MCU used 1

Raspberry uses 1( if not connected to a charger)

External speaker uses 1

 

**USB type B cables

-The old printer cables.
-Used to flash the firmware of the Arduino UNO 

**5v external power supply

Used for power on the breadboard or on the Arduino.


Hardware considered:

Led Strip IP33 ( depends on the size and shape/colour)

Led Strip Controller ( 10 levs)

On/Off Relay 6A 1P- LEGRAND ( ??? Research the price please)
Cable Holders ( 1.79 lev)

Digital Signal Meter ( 20 levs, can be found for less 2nd hand.)

3 Gauge/1mm2/Copper Cable - 3-5 Meters (Flexible Type) ( Round Shape) (1.19 per Meter) 

3 Gauge/1mm2/Copper Cable - 5-10 Meters (Not Flexible) (FLAT SHAPE) ( 1.19 Per Meter)  



----------
2. Software used

OS: Workstations should be Dual Boot:
16.10 LTS Ubuntu x64; Windows 8.1/10 x64;

 

Raspberry:
Raspberrian Jessie 

___

Software


**Arduino IDE; Arduino IDE 1.65 for the ESP-MQTT Flush

Board Management - WORKS ONLY on Windows

 

-Link in Arduino>Preferences> Additional Board URLs - http://arduino.esp8266.com/stable/package_esp8266com_index.json

 

Libraries used:

-Adafruid MQTT ;  

-PubSub

 

**Python2.7xx

 

**Python 3.xx


**Node-Red

 

**Mosquitto( MQTT) / Mosquitto-Clients

 

External Services used:

 

**IFTTT


**io.adafruit.com ( MQTT)
