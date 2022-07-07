// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.9.0;

contract Profile {
    struct Profiles {
        string name;
        string GST;
        uint256 phone;
        string email;
        string sector;
        address contractorAddress;
        uint256[] contracts;
        uint256 length;
    }

    Profiles[] public profile;
    uint256 public count = 0;
    
    constructor () public {}

    function createProfile(address _address, string memory _name, string memory _gst, uint256 _phone, string memory _email, string memory _sector) public {
        Profiles memory p;
        p.name = _name;
        p.GST = _gst;
        p.phone = _phone;
        p.email = _email;
        p.sector = _sector;
        p.contractorAddress = _address;
        p.length = 0;
        profile.push(p);
        count++;
    }

    function addContract(uint256 _id, address _address) public {
        uint256 i=0;
        for(i=0;i<count;i++) {
            if(profile[i].contractorAddress == _address) {
                profile[i].contracts.push(_id);
                profile[i].length++;
            }
        }

        require(i < count, "Address given does not exist");
    }

    function getInfo(address _address) public view returns(string memory, string memory, uint256, string memory, string memory) {
        uint256 i=0;
        Profiles memory p;
        bool ans = false;
        for(i=0;i<count;i++) {
            if(profile[i].contractorAddress == _address) {
                p = profile[i];
                ans = true;
                break;
            }
        }

        require(ans == true, "Profile does not exist");

        return (
            p.name, p.GST, p.phone, p.email, p.sector
        );
    }

    // Get all contract IDs of a specific address
    function getContracts(address _address) public view returns(uint256[] memory) {
        uint256[] memory c;
        bool ans = false;
        for(uint256 i=0;i<count;i++) {
            if(profile[i].contractorAddress == _address) {
                c = profile[i].contracts;
                ans = true;
                break;
            }
        }

        require(ans == true, "No such profile");

        return c;
    }
}