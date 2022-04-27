import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import detectEthereumProvider from '@metamask/detect-provider';

const isMetaMask = async () => {
    const provider = await detectEthereumProvider();
    return !!provider;
}

const metamaskReducer = async (state, action) => {
    switch(action.type) {
        case 'CONNECT':
            await window.ethereum.enable();
            return (typeof window.ethereum !== 'undefined' && isMetaMask());
        case 'ACCOUNT':
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            // state.account = accounts[0];
            return accounts[0];
        case 'CHAIN':
            // state.chainID = window.ethereum.networkVersion;
            return window.ethereum.networkVersion;
        default:
            return false;
    }
};

export const store = configureStore({ reducer: metamaskReducer });