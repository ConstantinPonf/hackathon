import serial
import time
import json


ser = serial.Serial('COM3', 9600,timeout = 1000)

def writeToJSONFile(path, fileName, data):
    filePathNameWExt = './' + path + '/' + fileName + '.json'
    with open(filePathNameWExt, 'w') as fp:
        json.dump(data, fp)

def getFromJSONFile(path,fileName):
    filePathNameWExt = './' + path + '/' + fileName + '.json'
    with open(filePathNameWExt) as f:
        data = json.load(f)
        return data


# Example
data = {}
data["triggered"] = 'false'
data["recievedTrigger"] = "false"

writeToJSONFile('./','arduinoState',data)


while True:
    input = ser.readline()
    data = getFromJSONFile('./','arduinoState')
    
    if ("TRIGGER" in input.decode("utf-8") )and data["triggered"] == 'false' and data["recievedTrigger"] == "false":
        data["triggered"] = "true"
        ## not true in final version
        data["recievedTrigger"] = "true"
        print(data)
        writeToJSONFile('./','arduinoState',data)
        
    
    if data["triggered"] == 'true' and data["recievedTrigger"] == "true":
        data["triggered"] = "false"
        data["recievedTrigger"] = "false"
        print(data)
        writeToJSONFile('./','arduinoState',data)
        ser.write(b'1')