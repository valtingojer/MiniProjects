import random
from brownie import accounts, config, SimpleStorage

#run the tests
#arrange
#act
#assert


simple_storage = ""

accountTypes = {
    "internal": "internal",
    "config": "config",
    "stored": "stored",
}

def test_deploy():
    #arrange    
    #setUpAccounts
    global simple_storage
    account = setUpAccounts("internal", 0)

    #act
    #deploy the contract
    simple_storage = SimpleStorage.deploy({'from': account})
    
    #assert
    assert simple_storage.address != None

def test_initial_value():
    #arrange
    global simple_storage
    expected = 0

    #act
    stored_value = simple_storage.Retrieve();
    
    #assert
    assert stored_value == expected

def test_change_value():
    #arrange
    global simple_storage
    account = setUpAccounts("internal", 0)
    new_value = random.randint(3, 9)

    #act
    # store new value	
    tx_store_value = simple_storage.Store(new_value, {'from': account})
    tx_store_value.wait(1)

    # retrieve new value    
    stored_value = simple_storage.Retrieve();

    #assert
    assert stored_value == new_value


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


# def main():
#     print("Running tests...")
#     print("")

#     print("Testgin deploy")
#     test_deploy()

#     print("Testgin initial value")
#     test_initial_value()

#     print("Testgin change value")
#     test_change_value()


# if __name__ == "__main__":
#     main()
