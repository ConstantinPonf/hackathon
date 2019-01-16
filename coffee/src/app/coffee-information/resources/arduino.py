import serial
import time
import json
import http
import urllib.request


ser = serial.Serial('/dev/ttyS0', 9600,timeout = 1000)

def request(path):
    f = urllib.request.urlopen("http://localhost:8080/" + path)
    s = f.read().decode("utf-8")
    return s

def setState(s):
    if s == "1":
        triggered = True
    else:
        triggered = False
    return triggered
        
while True:
    input = ser.readline()
    
    if ("Card UID:" in input.decode("utf-8") ):
        print (ser.readline())
    