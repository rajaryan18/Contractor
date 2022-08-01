import React, { useEffect, useState } from 'react';
import Header from './Header';
import contract from '../chain-info/deployments/42/0x2972A8DBd8914a2bd24d99402A66c74F74148348.json';
import { ethers } from 'ethers';
import './Profile.css';

const Profile = () => {
    const [account, setAccount] = useState();
    const [profile, setProfile] = useState();

    useEffect(() => {
        const getProfile = async () => {
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
            if(account) {
                const profileAddress = '0x2972A8DBd8914a2bd24d99402A66c74F74148348';
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const profileContract = new ethers.Contract(profileAddress, contract.abi, signer);

                let ch_txn = await profileContract.getInfo(account);
                setProfile(ch_txn);
            }
        };

        getProfile();
    }, []);

    return (
        <div className='profile-container'>
            <Header text={profile[0]} />
            
        </div>
    );
};

export default Profile;