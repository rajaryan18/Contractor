import { useCall } from '@usedapp/core';

export function CallFunction(contract, method, arg) {
    console.log(contract);
    const call = useCall({
        contract: contract,
        method: method,
        args: arg
    });

    if(call) return call;
    else return "Undefined"
}