import React, { useEffect, useState } from 'react';
import Button from '../components/utils/Button';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import contract from '../chain-info/deployments/42/0x1B8d9C22aF345278f923efba04cFb88563f1D5b9.json';
import profile from '../chain-info/deployments/42/0xA98EDEA1D3Ee569AC1f18c01Fef4595A9C8faCd8.json';
import { ethers } from 'ethers';
import './NewContract.css';

const NewContract = () => {
    const contractAddress = '0x1B8d9C22aF345278f923efba04cFb88563f1D5b9';
    const profileAddress = '0xA98EDEA1D3Ee569AC1f18c01Fef4595A9C8faCd8';
    const id = Math.floor(new Date().getTime()/100000);
    console.log("id", id);
    const navigate = useNavigate();
    const [account, setAccount] = useState();
    const [data, setData] = useState({
        projectName: '',
        gst: '',
        to: '',
        date: '',
        phone: '',
        email: '',
        detail: ''
    });

    useEffect(() => {
        const getAccount = async () => {
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
        };

        getAccount();
    }, []);

    const { projectName, gst, to, date, phone, email, detail } = data;

    const contractCreate = async (_id, _name, _gst, _to, _details, _date, _phone, _email) => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            const contractContract = new ethers.Contract(contractAddress, contract.abi, signer);
            const c_txn = await contractContract.createContract(_id, _name, _gst, _to, _details, _date, Math.floor(_phone/100), _email);
            console.log("Starting Transaction");
            const receipt = await c_txn.wait();
            console.log(c_txn);
            console.log(receipt);
            console.log("Adding contract to profile contract");
            const profileContract = new ethers.Contract(profileAddress, profile.abi, signer);
            const p_txn = await profileContract.addContract(_id, account);
            await p_txn.wait();
            navigate('/home');
        } catch (err) {
            console.log(err);
        }
    };

    const onContractChangeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const onContractSubmitHandler = async (e) => {
        e.preventDefault();
        await contractCreate(id, projectName, gst, to, detail, date, phone, email);
        setData({
            projectName: '',
            gst: '',
            to: '',
            date: '',
            phone: '',
            email: '',
            detail: ''
        });
        
    };

    return (
        <div className='new-contract-container'>
            <Header text="NEW CONTRACT" />
            <div className='new-contract-form-div center'>
                <form onSubmit={onContractSubmitHandler}>
                    <div className='new-contract-div'>
                        <label className='new-contract-label'>Project Name</label>
                        <input type='text' onChange={onContractChangeHandler} name='projectName' value={projectName} className='new-contract-input' />
                    </div>
                    <div className='new-contract-div'>
                        <label className='new-contract-label'>Client GST</label>
                        <input type='text' onChange={onContractChangeHandler} name='gst' value={gst} className='new-contract-input' />
                    </div>
                    <div className='new-contract-div'>
                        <label className='new-contract-label'>Client Wallet Address</label>
                        <input type='text' onChange={onContractChangeHandler} name='to' value={to} className='new-contract-input' />
                    </div>
                    <div className='new-contract-div'>
                        <label className='new-contract-label'>Due Date</label>
                        <input type='date' onChange={onContractChangeHandler} name='date' value={date} className='new-contract-input' />
                    </div>
                    <div className='new-contract-div'>
                        <label className='new-contract-label'>Phone Number</label>
                        <input type='number' onChange={onContractChangeHandler} name='phone' value={phone} className='new-contract-input' />
                    </div>
                    <div className='new-contract-div'>
                        <label className='new-contract-label'>Email Address</label>
                        <input type='email' onChange={onContractChangeHandler} name='email' value={email} className='new-contract-input' />
                    </div>
                    <div className='new-contract-div'>
                        <label className='new-contract-label'>Project Details</label>
                        <textarea onChange={onContractChangeHandler} name='detail' value={detail} className='new-contract-textarea' />
                    </div>
                    <div className='new-contract-button-div'>
                        <Button size='medium' to='/home'>GO BACK</Button>
                        <Button inverse type='submit' size='medium'>SAVE CONTRACT</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewContract;