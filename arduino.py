import serial
import time
import json
import http
import urllib.request
import time
import contract_abi
import codecs
from web3 import Web3, HTTPProvider

print("Hello Word! I am here to serve")

contract_address     = "0xfa541D50E3B434cb2BA7BD6CDb330a94bA0e67c1"
wallet_private_key   = ""
wallet_address       = ""

w3 = Web3(HTTPProvider("http://localhost:8545"))
#w3.eth.enable_unaudited_features()
print("Connected to Blockchain")
contract = w3.eth.contract(address = contract_address, abi = contract_abi.abi)
print("Init Contract")
accounts = w3.eth.accounts
print("------------------------------------------")
print("All ACCOUNTS:")
print(accounts)
print("------------------------------------------")

'''
print("First TEST")
res = contract.functions.increment().transact({"from":accounts[0]})
w3.eth.waitForTransactionReceipt(res)
print(codecs.encode(res, 'hex').decode('ascii'))
res = contract.functions.getCounter().call()
print(res)
'''

ser = serial.Serial('/dev/ttyACM0', 9600)
print("Serial Port for the Arduino opened")
def request(path,information):
    f = urllib.request.urlopen("http://localhost:8080/" + path,information)
    s = f.read().decode("utf-8")
    return s
        
while True:
    input = ser.readline()
    if ("Card UID:" in input.decode("utf-8") ):
        f = urllib.request.urlopen("http://localhost:8080/reader/uid",input)
        print("request send " + input.decode('utf-8')+ "did get: \n"+f.read().decode('utf-8'))


