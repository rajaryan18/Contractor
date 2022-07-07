import React, { useState } from 'react';
import Button from '../components/utils/Button';
import { useNavigate } from 'react-router-dom';
import contract from '../chain-info/deployments/42/0x1B8d9C22aF345278f923efba04cFb88563f1D5b9.json';
import { ethers } from 'ethers';
import './NewContract.css';

const NewContract = () => {
    const contractAddress = '0x1B8d9C22aF345278f923efba04cFb88563f1D5b9';
    const id = Math.floor(new Date().getTime()/1000);
    const navigate = useNavigate();
    const [data, setData] = useState({
        projectName: '',
        gst: '',
        to: '',
        date: '',
        phone: '',
        email: '',
        detail: ''
    });

    const { projectName, gst, to, date, phone, email, detail } = data;

    const contractCreate = async (id, name, gst, to, details, date, phone, email) => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            const contractContract = new ethers.Contract(contractAddress, contract.abi, signer);
            let c_txn = await contractContract.createContract(id, name, gst, to, details, date, phone, email);
            await c_txn.wait();
            console.log(c_txn);
        } catch (err) {
            console.log(err);
        }
    };

    const onContractChangeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const onContractSubmitHandler = (e) => {
        e.preventDefault();
        contractCreate(id, projectName, gst, to, detail, date, phone, email);
        setData({
            projectName: '',
            gst: '',
            to: '',
            date: '',
            phone: '',
            email: '',
            detail: ''
        });
        
        navigate('/home');
    };

    return (
        <div className='new-contract-container'>
            <h1 className='new-contract-h1 center'>New Contract</h1>
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