import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import Card from '../components/utils/Card';
import Button from '../components/utils/Button';
import Modal from '../components/utils/Modal';
import { store } from '../components/reducers/metamask-reducer';
import { useEthers } from '@usedapp/core';

import img from '../components/images/logo.jpg';
import './Auth.css';

const Auth = () => {
    const { account, activateBrowserWallet, chainId } = useEthers();

    let message = "Login to your MetaMask account to continue";

    const [showMessage, setShowMessage] = useState(false);
    const [password, setPassword] = useState(null);
    const [inCorrectPass, setInCorrectPass] = useState(false);

    const setDontShowMessageHandler = () => setShowMessage(false);
    const setShowMessageHandler = () => setShowMessage(true);

    useEffect(() => {
        activateBrowserWallet();
    }, []);

    const metamaskLoginFail = () => {
        activateBrowserWallet();
        if(!account) {
            message = "An unexpected error with metamask has occured";
        }
    };

    const onChangeHandler = e => {
        setPassword(...password, e.target.value);
    }

    const onSubmitHandler = e => {
        e.preventDefault();
        store.dispatch({ type: 'ACCOUNT', payloaad: account });
        store.dispatch({ type: 'CHAIN', payload: chainId });

        setPassword(null);
        // check whether password is correct or incorrect
    };

    return (
        <React.Fragment>
            <Modal
                show={showMessage}
                onCancel={setDontShowMessageHandler}
                header='MESSAGE'
                footer={
                    <div className='footer-button'>
                        <Button onClick={metamaskLoginFail}>TRY AGAIN</Button>
                        <Button onClick={setDontShowMessageHandler}>CLOSE</Button>
                    </div>
                }
            >
                <p>{message}</p>
            </Modal>
            <div className='auth-container'>
                <Card elevation='partial' size='small' bgcolor='white' position='right'>
                    <div className='card-div'>
                        <img src={img} alt='logo' className='home-card-img' />
                        <h1>CONTRACTOR</h1>
                        <div className='auth-card-div'>
                            <form onSubmit={onSubmitHandler}>
                                <TextField label='Account' id='filled-basic' variant='filled' disabled value={account ? account : ''} className='home-form-text home-form-style' />
                                <br />
                                <TextField label='Password' id='filled-basic' variant='filled' type="password" name='password' value={password} onChange={onChangeHandler} className='home-form-text home-form-style' />
                                <br /> <br />
                                <Button type='submit' size='small' onClick={() => !account ? setShowMessageHandler() : console.log(account)} className='home-form-style'>SUBMIT</Button>
                            </form>
                        </div>
                        {inCorrectPass && <p className='auth-card-p'>Password did not match, please try again</p>}
                    </div>
                </Card>
            </div>
        </React.Fragment>
    );
};

export default Auth;