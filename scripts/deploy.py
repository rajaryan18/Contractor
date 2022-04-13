from brownie import network, config, Contract, Profile
from scripts.helpful_scripts import get_account

def deploy():
    account = get_account()
    contract = Contract.deploy()
    profile = Profile.deploy()

def main():
    deploy()