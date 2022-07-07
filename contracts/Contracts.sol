// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

contract Contracts {
    struct Contractor {
        string project_name;
        string client_GST;
        address to; // address of client
        string contract_detail;
        string completion_date;
        uint256 phone;
        string email;
    }

    Contractor[] public contractor;
    uint256 count = 0;
    mapping(uint256 => Contractor) contractMap;

    constructor () public {}

    function createContract(uint256 _id, string memory _name, string memory _gst, address _to, string memory _details, string memory _date, uint256 _phone, string memory _email) public {
        Contractor memory c = Contractor(_name, _gst, _to, _details, _date, _phone, _email);
        contractor.push(c);
        count++;
        contractMap[_id] = contractor[count-1];
    }

    function fullContract(uint256 _id) external view returns (
        uint256, string memory, string memory, address, string memory, string memory, uint256, string memory
    ) {
        Contractor memory c;
        c = contractMap[_id];
        
        require(c.phone != 0, "No such contract exists");
        
        return (
            _id, c.project_name, c.client_GST, c.to, c.contract_detail, c.completion_date, c.phone, c.email
        );
    }
}