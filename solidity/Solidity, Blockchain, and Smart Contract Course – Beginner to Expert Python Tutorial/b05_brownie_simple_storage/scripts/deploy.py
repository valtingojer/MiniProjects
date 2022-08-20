from brownie import accounts, config, network, SimpleStorage

#kovanAccount = config["wallets"]["dst"]
simple_storage = ""

accountTypes = {
    "internal": "internal",
    "config": "config",
    "stored": "stored",
}

def deploy_simple_storage():
    global simple_storage

    account = setUpDefaultAccount()

    print(f"Deploying from account {account}")

    simple_storage = SimpleStorage.deploy({'from': account})
    print(f"Simple storage deployed at {simple_storage.address}")

    stored_value = simple_storage.Retrieve();
    print(f"Stored value is {stored_value}")


    print("Storing new value of 2...")
    tx_store_value = simple_storage.Store(2, {'from': account})
    tx_store_value.wait(1)
    print(f"Transaction hash: {tx_store_value}")

    stored_value = simple_storage.Retrieve();
    print(f"Stored value is {stored_value}")

    pass


def setUpDefaultAccount():
    account = ""
    if network.show_active() == "development":
        account = setUpAccounts("internal", 0)
        #brownie run .\scripts\deploy.py
    else:
        account = setUpAccounts(accountTypes["config"], "dst")
        #account = setUpAccounts(accountTypes["stored"], "dst-account")
        #brownie run .\scripts\deploy.py --network kovan
    return account

def setUpAccounts(type = "internal", key = 0):
    if(type == "internal"):
        account = accounts[key]
    elif(type == "config"):
        account = accounts.add(config["wallets"][key])
    elif(type == "stored"):
        account = accounts.load(key)
    else:
        account = accounts.load(key)
    
    
    return account


def main():
    print("Deploying simple storage...")
    deploy_simple_storage()


if __name__ == "__main__":
    main()
