import json
import sys
from solcx import compile_standard, install_solc
from web3 import Web3

#check for arguments
if len(sys.argv) != 2:
    print("Usage: python deployer.py <jsonSettingsFile.json>")
    sys.exit(1)

jsonSettingsFile = sys.argv[1]
#read json settings content
with open(jsonSettingsFile) as json_file:
    jsonSettings = json.load(json_file)

#Settings
contractName = jsonSettings["contractName"]
inputFilename = jsonSettings["inputFilename"]
inputFilePath = jsonSettings["inputFilePath"]
outputFilename = jsonSettings["outputFilename"]
outputFilePath = jsonSettings["outputFilePath"]
compilerVersion = jsonSettings["compilerVersion"]
rpcServerHttpProviderAddress = jsonSettings["rpcServerHttpProviderAddress"]
chainId = jsonSettings["chainId"]
wallet = jsonSettings["wallet"]


#Prepare to compile
install_solc(compilerVersion)

#Read the source code
with open(inputFilePath, 'r') as f:
    contract_code = f.read()
print("done reading")

#Compile the source code
compiled_contract = compile_standard(
    {
    'language': 'Solidity',
    'sources': { 
        inputFilename: {'content': contract_code}
        },
    'settings': { 
        'outputSelection': { 
            '*': { 
                '*': [ 'abi', 'metadata', 'evm.bytecode', 'evm.sourceMap' ]
                }
            }
        }
    },
    solc_version=compilerVersion
)
print("done compiling")

#Output the compiled contract
with open(outputFilePath, 'w') as f:
    f.write(json.dumps(compiled_contract, indent=4))
print("done writing")


#Get the contract's ABI
contract_abi = compiled_contract["contracts"][inputFilename][contractName]['abi']

#Get the contract's bytecode
contract_bytecode = compiled_contract["contracts"][inputFilename][contractName]['evm']['bytecode']['object']

#connect to the local Ethereum node ganache-cli
web3 = Web3(Web3.HTTPProvider(rpcServerHttpProviderAddress))
print("done connecting to node")

#create the contract
contract = web3.eth.contract(abi=contract_abi, bytecode=contract_bytecode)
print(f"done creating contract {contract}")

#Get the latest transaction count
tx_count = web3.eth.getTransactionCount(wallet['address'])
print(f"done getting transaction count: {tx_count} for wallet {wallet['address']}")

#build the transaction
tx = contract.constructor().buildTransaction({
    'chainId': chainId,
    'from': wallet['address'],
    'nonce': tx_count,
    'gasPrice': web3.eth.gas_price,
    #'data': contract_bytecode,
    #'gas': 1000000,
    #'value': web3.toWei('0', 'gwei'),
    #'to': b''
})

#Sign the transaction
signed_tx = web3.eth.account.signTransaction(tx, wallet['privateKey'])

#Send the transaction
tx_hash = web3.eth.sendRawTransaction(signed_tx.rawTransaction)
print(f"done sending transaction: {tx_hash}")

#Wait for the transaction to be mined
tx_receipt = web3.eth.waitForTransactionReceipt(tx_hash)
print("done waiting for transaction to be mined")

print(f"Contract Address: {tx_receipt['contractAddress']}")

print("done")
