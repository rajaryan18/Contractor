from brownie import network, config, Contracts, Profile
from scripts.helpful_scripts import get_account

def create_contracts():
    from_account = get_account(index=1)
    to_account = get_account(index=2)

    contract = Contracts.deploy(
        123,
        'Great Indian Project',
        to_account,
        'A big bridge to be built with Rs 1.2Cr',
        '22Apr22',
        7259027418,
        '18raj06@gmail.com',
        '29AAHGVHGVG',
        {'from': from_account},
        publish_source=config["networks"][network.show_active()].get("verify", False)
    )
    return contract

def deploy_profile():
    from_account = get_account(index=1)

    profile = Profile.deploy(
        'Credence',
        '29AAJXDCGH',
        7259027418,
        '18raj06@gmail.com',
        'Engineering',
        from_account,
        {'from': from_account},
        publish_source=config["networks"][network.show_active()].get("verify", False)
    )
    print(profile)
    return profile

def getContractProfile(profile):
    print(profile.getContracts())

def Increment():
    account = get_account(index=1)
    contract = Contracts[-1]
    tx = contract.incrementContractState({'from': account})
    tx.wait(1)
    return contract

def Decrement():
    account = get_account(index=1)
    contract = Contracts[-1]
    tx = contract.decrementContractState({'from': account})
    tx.wait(1)
    return contract



def main():
    profile = deploy_profile()
    contract_info = create_contracts()
    profile.addContract(contract_info[0])
    getContractProfile(profile)
    Increment()
    Decrement()
