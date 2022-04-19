import pytest
from scripts.helpful_scripts import get_account, LOCAL_BLOCKCHAIN_ENVIRONMENTS
from brownie import network, exceptions
from scripts.deploy import create_contracts, deploy_profile, Increment, Decrement

def test_checkAddContract():
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip("Only for Local Testing")
    profile = deploy_profile()
    contract = create_contracts()
    serial = contract.fullContract()
    profile.addContract(serial[0], {'from': get_account(index=1)})
    assert profile.getContracts()[0] == contract.fullContract()[0]
    with pytest.raises(exceptions.VirtualMachineError):
        profile.addContract(contract.fullContract()[0], {'from': get_account(index=2)})

def test_dec():
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip("Only for Local Testing")
    profile = deploy_profile()
    contract = create_contracts()
    serial = contract.fullContract()
    profile.addContract(serial[0], {'from': get_account(index=1)})
    with pytest.raises(exceptions.VirtualMachineError):
        Decrement()

def test_inc():
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip("Only for Local Testing")
    profile = deploy_profile()
    contract = create_contracts()
    serial = contract.fullContract()
    profile.addContract(serial[0], {'from': get_account(index=1)})
    Increment()
    Increment()
    assert contract.contractState() == 'FINISHING'
    with pytest.raises(exceptions.VirtualMachineError):
        Increment()

def main():
    test_checkAddContract()
    test_dec()
    test_inc()