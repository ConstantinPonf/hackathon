abi = """[
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "_from",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Trans",
      "type": "event",
      "signature": "0x9bcd4a080462731b2812ce729d5733221a967dfbb88c63391ad7091471ea8431"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "deposit",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function",
      "signature": "0xd0e30db0"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "withdraw",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x3ccfd60b"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_producer",
          "type": "address"
        },
        {
          "name": "_farmer",
          "type": "address"
        },
        {
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "pay",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xb3d76188"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_producer",
          "type": "address"
        },
        {
          "name": "_farmer",
          "type": "address"
        }
      ],
      "name": "purchase",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function",
      "signature": "0xdde5a65d"
    }
  ]"""