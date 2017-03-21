[
    {
        "id": "74675ef2.47f47",
        "type": "tab",
        "label": "Input from APP and RFID"
    },
    {
        "id": "4fe35bd8.bbbf14",
        "type": "tab",
        "label": "Sensor Controll"
    },
    {
        "id": "b9da2c40.3a6b",
        "type": "tab",
        "label": "AdaFruit to Local"
    },
    {
        "id": "1bba4d9e.ae21a2",
        "type": "mqtt-broker",
        "z": "",
        "broker": "Localhost",
        "port": "1883",
        "clientid": "LocalNodeRed1",
        "usetls": false,
        "compatmode": true,
        "keepalive": "300",
        "cleansession": true,
        "willTopic": "",
        "willQos": "0",
        "willPayload": "",
        "birthTopic": "",
        "birthQos": "0",
        "birthPayload": ""
    },
    {
        "id": "3d3ff9b8.233af6",
        "type": "mqtt-broker",
        "z": "",
        "broker": "io.adafruit.com",
        "port": "1883",
        "clientid": "",
        "usetls": false,
        "compatmode": true,
        "keepalive": "30",
        "cleansession": true,
        "willTopic": "maistorpi/feeds/birth",
        "willQos": "0",
        "willRetain": "true",
        "willPayload": "Rip",
        "birthTopic": "maistorpi/feeds/birth",
        "birthQos": "1",
        "birthRetain": "true",
        "birthPayload": "Here!"
    },
    {
        "id": "9eceb0c.0c6ad5",
        "type": "mqtt-broker",
        "z": "",
        "broker": "io.adafruit.com",
        "port": "1883",
        "clientid": "",
        "usetls": false,
        "compatmode": true,
        "keepalive": "30",
        "cleansession": true,
        "willTopic": "",
        "willQos": "0",
        "willPayload": "",
        "birthTopic": "",
        "birthQos": "0",
        "birthPayload": ""
    },
    {
        "id": "a5a8c64e.d9c138",
        "type": "function",
        "z": "4fe35bd8.bbbf14",
        "name": "Forward Sensor Data",
        "func": "//Temp\nif (msg.payload <=22 )  {\n   return {topic:'/AC/',payload:'TurnAcOn'}; }\nif (msg.payload >=22 )  {\n   return {topic:'/AC/',payload:'TurnAcOff'}; }\n\n//photo//\n\n//Turn LivingRoom LEDS ON\nif (msg.payload <=300) {\n    return {topic:'/LivingLight',payload:'51'}; }\n//Turn LivingRoom LEDS OFF\nif (msg.payload >=300) {\n    return {topic:'/LivingLight',payload:'50'}; }\n\n",
        "outputs": 1,
        "noerr": 0,
        "x": 448.0714569091797,
        "y": 140.39288330078125,
        "wires": [
            [
                "6b0906b8.2205f8",
                "f8b53db6.d6c33"
            ]
        ]
    },
    {
        "id": "b6f6ac8e.309f6",
        "type": "function",
        "z": "b9da2c40.3a6b",
        "name": "Forward data to Relays",
        "func": "//Adafruit.io to Relay1\n   if (msg.payload == \"TurnLightOneOn\")  {\n   return {topic:'/relay1/',payload:'11'}; } \n   if (msg.payload == \"TurnLightOneOff\")  {\n   return {topic:'/relay1/',payload:'10'}; }\n//Adafruit.io to Relay2   \n      if (msg.payload == \"TurnLightTwoOn\")  {\n   return {topic:'/relay2/',payload:'21'}; } \n   if (msg.payload == \"TurnLightTwoOff\")  {\n   return {topic:'/relay2/',payload:'20'}; }\n//Adafruit.io to Relay3   \n      if (msg.payload == \"TurnLightThreeOn\")  {\n   return {topic:'/relay3/',payload:'31'}; } \n   if (msg.payload == \"TurnLightThreeOff\")  {\n   return {topic:'/relay3/',payload:'30'}; }\n//Adafruit.io to Relay4  \n      if (msg.payload == \"TurnLightFourOn\")  {\n   return {topic:'/relay4/',payload:'41'}; } \n   if (msg.payload == \"TurnLighFourOff\")  {\n   return {topic:'/relay4/',payload:'40'}; }",
        "outputs": 1,
        "noerr": 0,
        "x": 375.32139587402344,
        "y": 227.32142639160156,
        "wires": [
            [
                "b3313a.500b8ec8",
                "4cc0f7ed.d75438",
                "a8489f6f.30079",
                "2b7d9b28.8394a4",
                "91713c21.2734a",
                "e2af2aff.26dff8",
                "5db43ca4.1d1b64"
            ]
        ]
    },
    {
        "id": "b3313a.500b8ec8",
        "type": "mqtt out",
        "z": "b9da2c40.3a6b",
        "name": "RelayControllLocal",
        "topic": "/relay1/",
        "qos": "0",
        "retain": "",
        "broker": "1bba4d9e.ae21a2",
        "x": 651.3690795898438,
        "y": 125.41668701171875,
        "wires": []
    },
    {
        "id": "4cc0f7ed.d75438",
        "type": "debug",
        "z": "b9da2c40.3a6b",
        "name": "Debug",
        "active": true,
        "console": "true",
        "complete": "payload",
        "x": 571.1785125732422,
        "y": 427.46429443359375,
        "wires": []
    },
    {
        "id": "83fe1251.010b",
        "type": "mqtt in",
        "z": "b9da2c40.3a6b",
        "name": "RelayControll",
        "topic": "maistorpi/feeds/lights",
        "qos": "1",
        "broker": "3d3ff9b8.233af6",
        "x": 75,
        "y": 227,
        "wires": [
            [
                "b6f6ac8e.309f6",
                "4cc0f7ed.d75438"
            ]
        ]
    },
    {
        "id": "d35170b6.27f98",
        "type": "mqtt in",
        "z": "4fe35bd8.bbbf14",
        "name": "SensorTemp",
        "topic": "/temperature/",
        "qos": "2",
        "broker": "1bba4d9e.ae21a2",
        "x": 75,
        "y": 71,
        "wires": [
            [
                "a5a8c64e.d9c138",
                "904f2c1f.ada85"
            ]
        ]
    },
    {
        "id": "ac0e5f7f.9819",
        "type": "mqtt in",
        "z": "4fe35bd8.bbbf14",
        "name": "SensorHumidity",
        "topic": "/humidity/",
        "qos": "2",
        "broker": "1bba4d9e.ae21a2",
        "x": 85,
        "y": 142,
        "wires": [
            [
                "a5a8c64e.d9c138",
                "904f2c1f.ada85"
            ]
        ]
    },
    {
        "id": "31944b93.1f4af4",
        "type": "mqtt in",
        "z": "4fe35bd8.bbbf14",
        "name": "SensorPhoto",
        "topic": "/photo/",
        "qos": "2",
        "broker": "1bba4d9e.ae21a2",
        "x": 75,
        "y": 207,
        "wires": [
            [
                "a5a8c64e.d9c138",
                "904f2c1f.ada85"
            ]
        ]
    },
    {
        "id": "904f2c1f.ada85",
        "type": "debug",
        "z": "4fe35bd8.bbbf14",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "false",
        "x": 424.99998474121094,
        "y": 54,
        "wires": []
    },
    {
        "id": "a8489f6f.30079",
        "type": "mqtt out",
        "z": "b9da2c40.3a6b",
        "name": "RelayControllLocal",
        "topic": "/relay2/",
        "qos": "0",
        "retain": "",
        "broker": "1bba4d9e.ae21a2",
        "x": 645.8958129882812,
        "y": 180.88888549804688,
        "wires": []
    },
    {
        "id": "2b7d9b28.8394a4",
        "type": "mqtt out",
        "z": "b9da2c40.3a6b",
        "name": "RelayControllLocal",
        "topic": "/relay3/",
        "qos": "0",
        "retain": "",
        "broker": "1bba4d9e.ae21a2",
        "x": 643.8958129882812,
        "y": 231.88888549804688,
        "wires": []
    },
    {
        "id": "91713c21.2734a",
        "type": "mqtt out",
        "z": "b9da2c40.3a6b",
        "name": "RelayControllLocal",
        "topic": "/relay4/",
        "qos": "0",
        "retain": "",
        "broker": "1bba4d9e.ae21a2",
        "x": 642.8958129882812,
        "y": 278.8888854980469,
        "wires": []
    },
    {
        "id": "5dedc0ba.78a4a",
        "type": "mqtt in",
        "z": "b9da2c40.3a6b",
        "name": "LocalFeedback",
        "topic": "/feedback/",
        "qos": "1",
        "broker": "1bba4d9e.ae21a2",
        "x": 82.84028625488281,
        "y": 420.07989501953125,
        "wires": [
            [
                "4cc0f7ed.d75438"
            ]
        ]
    },
    {
        "id": "6b0906b8.2205f8",
        "type": "mqtt out",
        "z": "4fe35bd8.bbbf14",
        "name": "/LivingLight/",
        "topic": "/LivingLight/",
        "qos": "",
        "retain": "",
        "broker": "1bba4d9e.ae21a2",
        "x": 716.8333892822266,
        "y": 58.326393127441406,
        "wires": []
    },
    {
        "id": "f8b53db6.d6c33",
        "type": "mqtt out",
        "z": "4fe35bd8.bbbf14",
        "name": "/AC/",
        "topic": "/AC/",
        "qos": "",
        "retain": "",
        "broker": "1bba4d9e.ae21a2",
        "x": 694.8957977294922,
        "y": 123.88888549804688,
        "wires": []
    },
    {
        "id": "e2af2aff.26dff8",
        "type": "mqtt out",
        "z": "b9da2c40.3a6b",
        "name": "/LivingLight/",
        "topic": "/LivingLight/",
        "qos": "",
        "retain": "",
        "broker": "1bba4d9e.ae21a2",
        "x": 872.673583984375,
        "y": 177.88888549804688,
        "wires": []
    },
    {
        "id": "5db43ca4.1d1b64",
        "type": "mqtt out",
        "z": "b9da2c40.3a6b",
        "name": "/AC/",
        "topic": "/AC/",
        "qos": "",
        "retain": "",
        "broker": "1bba4d9e.ae21a2",
        "x": 850.673583984375,
        "y": 226.88888549804688,
        "wires": []
    },
    {
        "id": "e233f82e.aa2508",
        "type": "mqtt in",
        "z": "74675ef2.47f47",
        "name": "APPFeedMQTT",
        "topic": "maistorpi/feeds/app",
        "qos": "0",
        "broker": "9eceb0c.0c6ad5",
        "x": 85,
        "y": 45,
        "wires": [
            [
                "c7e69319.47fb6",
                "c24af894.38fe08"
            ]
        ]
    },
    {
        "id": "c7e69319.47fb6",
        "type": "function",
        "z": "74675ef2.47f47",
        "name": "RFID/APP to Relay",
        "func": "//Adafruit.io to Relay1\n   if (msg.payload == \"TurnLightOneOn\")  {\n   return {topic:'maistorpi/feeds/lights',payload:'TurnLightOneOn'}; } \n   if (msg.payload == \"TurnLightOneOff\")  {\n   return {topic:'maistorpi/feeds/lights',payload:'TurnLightOneOff'}; }\n//Adafruit.io to Relay2   \n      if (msg.payload == \"TurnLightTwoOn\")  {\n   return {topic:'maistorpi/feeds/lights',payload:'TurnLightTwoOn'}; } \n   if (msg.payload == \"TurnLightTwoOff\")  {\n   return {topic:'maistorpi/feeds/lights',payload:'TurnLightTwoOff'}; }\n//Adafruit.io to Relay3   \n      if (msg.payload == \"TurnLightThreeOn\")  {\n   return {topic:'maistorpi/feeds/lights',payload:'TurnLightThreeOn'}; } \n   if (msg.payload == \"TurnLightThreeOff\")  {\n   return {topic:'maistorpi/feeds/lights',payload:'TurnLightThreeOff'}; }\n//Adafruit.io to Relay4  \n      if (msg.payload == \"TurnLightFourOn\")  {\n   return {topic:'maistorpi/feeds/lights',payload:'TurnLightFourOn'}; } \n   if (msg.payload == \"TurnLighFourOff\")  {\n   return {topic:'maistorpi/feeds/lights',payload:'TurnLighFourOff'}; }",
        "outputs": 1,
        "noerr": 0,
        "x": 505.99998474121094,
        "y": 84,
        "wires": [
            [
                "f3a9da15.2a9e68",
                "c24af894.38fe08"
            ]
        ]
    },
    {
        "id": "f3a9da15.2a9e68",
        "type": "mqtt out",
        "z": "74675ef2.47f47",
        "name": "RelayControll",
        "topic": "maistorpi/feeds/lights",
        "qos": "",
        "retain": "",
        "broker": "9eceb0c.0c6ad5",
        "x": 721.9999847412109,
        "y": 168,
        "wires": []
    },
    {
        "id": "e0903e89.e3251",
        "type": "mqtt in",
        "z": "74675ef2.47f47",
        "name": "RFIDLocalMQTT",
        "topic": "/rfid/",
        "qos": "2",
        "broker": "1bba4d9e.ae21a2",
        "x": 85,
        "y": 173,
        "wires": [
            [
                "49e78389.0fbacc"
            ]
        ]
    },
    {
        "id": "49e78389.0fbacc",
        "type": "function",
        "z": "74675ef2.47f47",
        "name": "ReadRFID Tags",
        "func": "//Turns Relay 1 one when tag 1 is read\nif (msg.payload == \"YellowTag\")  {\n   return {topic:'maistorpi/feeds/lights',payload:'TurnLightOneOn'}; } \n\n//Turns Relay 1 off when tag 2 is read\nif (msg.payload == \"RedTag\")  {\n   return {topic:'maistorpi/feeds/lights',payload:'TurnLightOneOff'}; } \nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 299.8263702392578,
        "y": 173.04168701171875,
        "wires": [
            [
                "c7e69319.47fb6"
            ]
        ]
    },
    {
        "id": "c24af894.38fe08",
        "type": "debug",
        "z": "74675ef2.47f47",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "false",
        "x": 717.8402557373047,
        "y": 44,
        "wires": []
    }
]