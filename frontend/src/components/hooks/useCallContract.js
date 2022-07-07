import { useContractFunction } from "@usedapp/core";
import { ethers } from "ethers";

// Create a new Contract and add that contract to Profile
export function useCallContract(contract, method, trName) {
    const { send: send, state: state } = useContractFunction(contract, method, { transactionName: trName });

    const sendContract = (args) => {
        return send(args);
    }

    return { sendContract, state };
}

export function ethersContract(contractAddress, contractABI, signer) {
    console.log("Ethers Contract", contractAddress, contractABI, signer);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
    
    return transactionsContract;
}