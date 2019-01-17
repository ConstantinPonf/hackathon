import serial
import time
import json
import http
import urllib.request


ser = serial.Serial('/dev/ttyACM0', 9600)

def request(path,information):
    f = urllib.request.urlopen("http://localhost:8080/" + path,information)
    s = f.read().decode("utf-8")
    return s
        
while True:
    input = ser.readline()
    print(input)
    if ("Card UID:" in input.decode("utf-8") ):
        f = urllib.request.urlopen("http://localhost:8080/reader",input)
        s = f.read().decode("boolean")
        print(s)