import { useEthers } from "@usedapp/core";
import { constants, utils } from "ethers";
import { Contract } from "ethers";
import Profile from "../../chain-info/contracts/Profile.json";
import Contracts from "../../chain-info/contracts/Contracts.json";
import networkMapping from "../../chain-info/deployments/map.json";

export function useContract(contract) {
    const { chainId } = useEthers();
    const { abi } =  contract == "Profile" ? Profile : Contracts
    const Address = chainId ? networkMapping["42"][contract][0] : constants.AddressZero;
    const Interface = new utils.Interface(abi);
    const cContract = new Contract(Address, Interface);
    console.log("useContract: ", cContract);
    return { cContract, Address, abi };
}

export const useAccount = () => {
    const { account } = useEthers();
    return { account };
}