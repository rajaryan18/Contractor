// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";

contract Contract is VRFConsumerBase {
    uint256 public serial;
    string public project_name;
    string public client_GST;
    address public to; // address of client
    string public contract_detail;
    string public completion_date;
    uint256 public penalty;
    string public location;
    uint256 public phone;
    string public email;
    uint256 public total_amount;
    uint256 public installments; // default to 0
    string public comment;
    enum CONTRACT_STATE { STARTING, MIDWAY, FINISHING }
    CONTRACT_STATE public contract_state;

    constructor (address _vrfCoordinator, address _link, uint256 _fee, bytes32 keyhash, string memory _projectName, address _to, string memory _contractdetail, string memory _completeDate, uint256 _penalty, string memory _location, uint256 _phone, string memory _email, uint256 _totalAmount, uint256 _installment, string memory _comment, string memory _gst) public VRFConsumerBase(_vrfCoordinator, _link) {
        project_name = _projectName;
        to = _to;
        contract_detail = _contractdetail;
        completion_date = _completeDate;
        client_GST = _gst;
        penalty = _penalty;
        location = _location;
        phone = _phone;
        email = _email;
        total_amount = _totalAmount;
        installments = _installment;
        comment = _comment;
        contract_state = CONTRACT_STATE.STARTING;
        bytes32 requestId = requestRandomness(_keyhash, _fee);
        emit RequestedRandomness(requestId);
    }

    event RequestedRandomness(bytes32 requestId);

    function incrementContractState() public {
        require(contract_state != CONTRACT_STATE.FINISHING, "The contract has been completed");

        if(contract_state == CONTRACT_STATE.STARTING) {
            contract_state = CONTRACT_STATE.MIDWAY;
        } else {
            contract_state = CONTRACT_STATE.FINISHING;
        }
    }

    function decrementContractState() public {
        require(contract_state != CONTRACT_STATE.STARTING, "The contract has just begun");
        
        if(contract_state == CONTRACT_STATE.FINISHING) {
            contract_state = CONTRACT_STATE.MIDWAY;
        } else {
            contract_state = CONTRACT_STATE.STARTING;
        }
    }

    function fulfillRandomness(bytes32 _requestId, uint256 _randomness) internal override {
        require(contract_state == CONTRACT_STATE.STARTING, "You aren't in the right stage");
        require(_randomness > 0, "random-not-found");
        serial = _randomness % 10000000;
    }

    function contractState() external view returns(string) {
        if(contract_state == CONTRACT_STATE.STARTING) {
            return "STARTING";
        } else if(contract_state == CONTRACT_STATE.MIDWAY) {
            return "MIDWAY";
        } else {
            return "FINISHING";
        }
    }

    function fullContract() external view returns (
        uint256, string, string, address, string, string, uint256, string, uint256, string, uint256, uint256, string
    ) {
        return (
            serial, project_name, client_GST, to, contract_detail, completion_date, penalty, location, phone, email, total_amount, installments, comment
        );
    }
}