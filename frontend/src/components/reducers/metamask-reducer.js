import { useState } from 'react';
import { configureStore } from '@reduxjs/toolkit';

const initial_State = '';

const metamaskReducer = async (state={initial_State}, action) => {
    switch(action.type) {
        case 'CONNECT':
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            return (typeof window.ethereum !== 'undefined');
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