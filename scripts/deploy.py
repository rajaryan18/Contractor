from brownie import network, config, Contracts, Profile
from scripts.helpful_scripts import get_account, get_contract

def create_contracts():
    from_account = get_account(index=1)
    to_account = get_account(index=2)

    contract = Contracts.deploy(
        get_contract('vrf_coordinator').address, 
        get_contract('link_token').address, 
        config["networks"][network.show_active()]["fee"], 
        config["networks"][network.show_active()]["keyhash"],
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
    contract_info = contract.fullContract()
    return contract_info

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
    return profile

def getContractProfile(profile):
    print(profile.getContracts())

def Increment():
    contract = Contracts[-1]
    contract.incrementContractState()

def Decrement():
    contract = Contracts[-1]
    contract.decrementContractState()

def main():
    profile = deploy_profile()
    contract_info = create_contracts()
    profile.addContract(contract_info[0])
    getContractProfile(profile)
    Increment()
    Decrement()
