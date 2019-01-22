import serial
import time
import json
import http
import urllib.request
import time
import contract_abi
import contracBuggy_abi
import codecs
from web3 import Web3, HTTPProvider

print("Hello Word! I am here to serve")

contract_address = "0xfa541D50E3B434cb2BA7BD6CDb330a94bA0e67c1"
keyMapping = {"Card UID: A9 27 D3 2A" : 0,
"Card UID: A9 3C D7 2A":1,
"Card UID: 66 FD 0E F8":2,
"Card UID: 3D D5 F6 5B":3
}
w3 = Web3(HTTPProvider("http://localhost:8545"))
# w3.eth.enable_unaudited_features()
print("Connected to Blockchain")
contract = w3.eth.contract(address=contract_address, abi=contracBuggy_abi.abi)
print("Init Contract")
accounts = w3.eth.accounts
print("------------------------------------------")
print("All ACCOUNTS:")
print(accounts)
print("------------------------------------------")

ser = serial.Serial('/dev/ttyACM0', 9600)
print("Serial Port for the Arduino opened")


def request(path, information):
    f = urllib.request.urlopen("http://localhost:8080/" + path, information)
    s = f.read().decode("utf-8")
    return s


while True:
    input = ser.readline()
    if ("Card UID:" in input.decode("utf-8")):
        f = urllib.request.urlopen(
            "http://localhost:8080/reader/uid", input).read().decode('utf-8')
        print("request send " + input.decode('utf-8') + "did get: \n"+f)
        ##for testing
        ##f = "true"
        if(f == "true"):
            '''
             res = contract.functions.deposit().transact({"from":accounts[0],"value":1000000000000000000})
             w3.eth.waitForTransactionReceipt(res)
             print("Transaction at Block: ")
             print(codecs.encode(res, 'hex').decode('ascii'))
             res = contract.functions.withdraw().transact({"from":accounts[0]})
             w3.eth.waitForTransactionReceipt(res)
             print("Transaction at Block: ")
             print(codecs.encode(res, 'hex').decode('ascii'))
             '''
            key = keyMapping[input.decode("ascii").replace("\r\n","")]
            res = contract.functions.purchase(accounts[4+key*2],accounts[5+key*2]).transact({
                "from": accounts[key], "value": 1000000000000000000})
            w3.eth.waitForTransactionReceipt(res)
            print("Transaction at Block: ")
            print(codecs.encode(res, 'hex').decode('ascii'))
        else:
            print("No transaction in pipe")
