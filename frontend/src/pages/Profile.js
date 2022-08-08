import React, { useEffect, useState, useRef } from 'react';
import Header from './Header';
import contract from '../chain-info/deployments/42/0x2972A8DBd8914a2bd24d99402A66c74F74148348.json';
import { ethers } from 'ethers';
import './Profile.css';

const Profile = () => {
    const [account, setAccount] = useState();
    const [profile, setProfile] = useState();
    const profileRef = useRef();

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

                let ch_txn; 
                try {
                    ch_txn = await profileContract.getInfo(account);
                } catch (err) {}
                console.log(ch_txn);
                profileRef.current = ch_txn;
            }
        };

        getProfile();
        
    }, []);

    return (
        <div className='profile-container'>
            {profileRef.current && <>
                <Header text={profileRef.current[0]} />
                <div className='profile-main-div'>
                    <section><b style={{ width: '6rem' }}>Email: </b>{profileRef.current[3]}</section>
                    <section><b style={{ width: '6rem' }}>Phone: </b>{profileRef.current[2]}</section>
                    <section><b style={{ width: '6rem' }}>GST No: </b>{profileRef.current[1]}</section>
                    <section><b style={{ width: '6rem' }}>Sector: </b>{profileRef.current[4]}</section>
                </div>
            </>}
        </div>
    );
};

export default Profile;