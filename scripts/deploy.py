from brownie import network, config, Contracts, Profile
from scripts.helpful_scripts import get_account
import time
from web3 import Web3

def create_contracts():
    from_account = get_account()

    contracts = Contracts.deploy(
        {'from': from_account},
    )
    time.sleep(1)
    print(contracts)
    return contracts

def deploy_profile():
    from_account = get_account()

    profile = Profile.deploy(
        {'from': from_account},
    )
    time.sleep(1)
    print(profile)
    return profile


def main():
    # w3 = Web3(Web3.HTTPProvider('https://kovan.infura.io/v3/0e1704ef2122495bbe12277cce5e46c9'))
    # print(w3.isConnected())
    network.web3.connect('https://kovan.infura.io/v3/0e1704ef2122495bbe12277cce5e46c9')
    time.sleep(2)
    profile = deploy_profile()
    contract_info = create_contracts()