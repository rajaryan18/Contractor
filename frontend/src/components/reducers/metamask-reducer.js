import { configureStore } from '@reduxjs/toolkit';

const MetamaskReducer = (state={account: '', chain:''}, action) => {
    switch(action.type) {
        case 'ACCOUNT':
            state.account = action.payload;
            break;
        case 'CHAIN':
            state.chain = action.payload;
            break;
        default:
            state.account = null;
            state.chain = null;
    }
};

export const store = configureStore({ reducer: MetamaskReducer });