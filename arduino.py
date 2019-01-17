import serial
import time
import json
import http
import urllib.request


ser = serial.Serial('/dev/ttyACM1', 9600)

def request(path,information):
    f = urllib.request.urlopen("http://localhost:8080/" + path,information)
    s = f.read().decode("utf-8")
    return s
        
while True:
    input = ser.readline()
    if ("Card UID:" in input.decode("utf-8") ):
        f = urllib.request.urlopen("http://localhost:8080/reader/uid",input)
        print("request send " + input.decode('utf-8')+ "did get: \n"+f.read().decode('utf-8'))