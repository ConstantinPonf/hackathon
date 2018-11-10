import serial
import time
import json
import http
import urllib.request


ser = serial.Serial('COM3', 9600,timeout = 1000)
triggered = False

def request(JJquery):
    f = urllib.request.urlopen("http://localhost:8081/test?" + JJquery)
    s = f.read().decode("utf-8")
    return s

def getQuery():
    ret = "triggered="
    if triggered:
        ret = ret +  "1"
    else:
        ret = ret + "0"
    return ret

def setState(s):
    if s == "1":
        triggered = True
    else:
        triggered = False
    return triggered
        
while True:
    input = ser.readline()
    print(input)
    
    if ("TRIGGER" in input.decode("utf-8") ):
        triggered = True
        s = getQuery()
        s = request(s)
    else:
        s = getQuery()
        s = request(s)
        setState(s)
    