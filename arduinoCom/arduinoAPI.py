<<<<<<< HEAD
import serial
import time
import json


ser = serial.Serial('COM3', 9600,timeout = 1000)

def writeToJSONFile(path, fileName, data):
    filePathNameWExt = './' + path + '/' + fileName + '.json'
    with open(filePathNameWExt, 'w') as fp:
        json.dump(data, fp)


# Example
data = {}
data["triggered"] = 'false'

writeToJSONFile('./','arduinoState',data)


while True:
    input = ser.readline()
    if "TRIGGER" in input.decode("utf-8"):
        data["triggered"] = "true"
        writeToJSONFile('./','arduinoState',data)
        break

=======
import serial
import time
import json


ser = serial.Serial('COM3', 9600,timeout = 1000)

def writeToJSONFile(path, fileName, data):
    filePathNameWExt = './' + path + '/' + fileName + '.json'
    with open(filePathNameWExt, 'w') as fp:
        json.dump(data, fp)


# Example
data = {}
data["triggered"] = 'false'

writeToJSONFile('./','arduinoState',data)


while True:
    input = ser.readline()
    if "TRIGGER" in input.decode("utf-8"):
        data["triggered"] = "true"
        writeToJSONFile('./','arduinoState',data)
        break

>>>>>>> 62a766119904c428329d2bde7f0a3075b580283b
