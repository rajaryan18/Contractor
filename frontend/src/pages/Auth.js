import React, { useContext, useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import Card from '../components/utils/Card';
import Button from '../components/utils/Button';
import { useNavigate } from 'react-router-dom';
import contract from '../chain-info/deployments/42/0xA98EDEA1D3Ee569AC1f18c01Fef4595A9C8faCd8.json';
import { ethers } from 'ethers';

import img from '../components/images/logo.jpg';
import './Auth.css';

const { ethereum } = window;
const Auth = () => {
    const navigate = useNavigate();
    const [account, setAccount] = useState();
    const profileAddress = '0xA98EDEA1D3Ee569AC1f18c01Fef4595A9C8faCd8';
    const [state, setState] = useState(false);
    const [data, setData] = useState({
        address: '',
        name: '',
        gst: '',
        phone: '',
        email: '',
        sector: ''
    });

    const { address, name, gst, phone, email, sector } = data;

    const connectWallet = async () => {
        if(window.ethereum) {
            try {
                if(!account) {  
                    let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    setAccount(accounts[0]);
                }
            } catch (err) {
                console.log("err");
            }
        }
    }

    const onSubmitHandler = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const profileContract = new ethers.Contract(profileAddress, contract.abi, signer);

            let ch_txn = await profileContract.getInfo(account);
            console.log(ch_txn);

            navigate('../home');
        } catch (err) {
            // New Profile must be created
            setState(true);   
        } 
    };

    const onModalChange = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const onModalSubmit = async event => {
        setState(false);
        event.preventDefault();
        try {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const profileContract = new ethers.Contract(profileAddress, contract.abi, signer);

            console.log("Initializing Profile Creation");
            let txn = await profileContract.createProfile(account, name, gst, Math.floor(phone/100), email, sector);
            let receipt = txn.wait();
            console.log(receipt);
            setData({
                address: '',
                name: '',
                gst: '',
                phone: '',
                email: '',
                sector: ''
            });
            navigate('../home');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <React.Fragment>
            {state && <div>
                <form onSubmit={onModalSubmit}>
                    <div className='auth-modal-div'>
                        <label className='auth-modal-label'>Organisation Name</label>
                        <input type='text' required className='auth-modal-input' name='name' value={name} onChange={onModalChange} />
                    </div>
                    <div className='auth-modal-div'>
                        <label className='auth-modal-label'>GST</label>
                        <input type='text' required className='auth-modal-input' name='gst' value={gst} onChange={onModalChange} />
                    </div>
                    <div className='auth-modal-div'>
                        <label className='auth-modal-label'>Contact Number</label>
                        <input type='number' required className='auth-modal-input' name='phone' value={phone} onChange={onModalChange} />
                    </div>
                    <div className='auth-modal-div'>
                        <label className='auth-modal-label'>Email</label>
                        <input type='email' required className='auth-modal-input' name='email' value={email} onChange={onModalChange} />
                    </div>
                    <div className='auth-modal-div'>
                        <label className='auth-modal-label'>Sector/Field of Work</label>
                        <input type='text' required className='auth-modal-input' name='sector' value={sector} onChange={onModalChange} />
                    </div>
                    <Button type='submit' size='medium'>SUBMIT</Button>
                </form>
            </div>}

            {!state && <div className='auth-container'>
                <Card elevation='partial' size='small' bgcolor='white' position='right'>
                    <div className='card-div'>
                        <img src={img} alt='logo' className='home-card-img' />
                        <h1>CONTRACTOR</h1>
                        <div className='auth-card-div'>
                            
                            {account && <TextField label='Account' id='filled-basic' variant='filled' disabled value={account ? account : ''} className='home-form-text home-form-style' />}
                            <br /> <br />
                            {/* <TextField label='Password' id='filled-basic' variant='filled' type="password" name='password' value={password} onChange={onChangeHandler} className='home-form-text home-form-style' />
                            <br /> <br /> */}
                            {!account && <Button size='medium' className='home-form-style' onClick={connectWallet}>GET ACCOUNT</Button>}
                            {account && <Button onClick={onSubmitHandler} size='medium' className='home-form-style'>SUBMIT</Button>}
                            
                        </div>
                    </div>
                </Card>
            </div>}
        </React.Fragment>
    );
};

export default Auth;