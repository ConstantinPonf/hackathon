import serial
import time
import json
import http
import urllib.request


ser = serial.Serial('COM3', 9600,timeout = 1000)
triggered = False

def request(jquery):
    f = urllib.request.urlopen("http://localhost:8081/test?" + jquery)
    print(f.read().decode("utf-8"))

def getQuery():
    ret = "triggered="
    if triggered:
        ret = ret+ "1"
    else:
        ret = ret+"0"
    return ret

def setState(s):
    if s == "1":
        triggered = True
    else:
        triggered = False
        ser.write(b'1')
        

request(getQuery())

while True:
    input = ser.readline()
    
    if ("TRIGGER" in input.decode("utf-8") ) and not triggered:
        triggered = True
        request(getQuery())
    else:
        setState(request(getQuery))