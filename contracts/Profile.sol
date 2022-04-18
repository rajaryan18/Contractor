// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.9.0;

contract Profile {
    string public name;
    string public GST;
    uint256 public phone;
    string public email;
    uint256[] public contracts;
    uint256 private length = 0;
    string public sector;
    address public contractorAddress;

    constructor (string memory _name, string memory _gst, uint256 _phone, string memory _email, string memory _sector, address _address) public {
        name = _name;
        GST = _gst;
        phone = _phone;
        email = _email;
        sector = _sector;
        contractorAddress = _address;
    }

    function addContract(uint256 _serial) public {
        require(msg.sender == contractorAddress);
        for(uint256 i=0;i<length;i++) {
            if(contracts[i] == _serial) return;
        }

        contracts.push(_serial);
    }

    function getInfo() public view returns(string memory, string memory, uint256, string memory, string memory, address) {
        return (
            name, GST, phone, email, sector, contractorAddress
        );
    }

    function getContracts() public view returns(uint256[] memory) {
        return contracts;
    }
}