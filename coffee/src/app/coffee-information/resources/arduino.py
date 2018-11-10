import serial
import time
import json
import http
import urllib.request


ser = serial.Serial('COM3', 9600,timeout = 1000)
triggered = False
recievedTrigger = False

def request():
    f = urllib.request.urlopen("http://localhost:8081/test")
    print(f.read().decode("utf-8"))

request()

while True:
    input = ser.readline()
    
    if ("TRIGGER" in input.decode("utf-8") )and triggered and not recievedTrigger:
        triggered = True
        ## not true in final version
        recievedTrigger = False
        print(triggered)
        print(recievedTrigger)
        
    
    if triggered and recievedTrigger:
        triggered = False
        recievedTrigger = False
        ser.write(b'1')