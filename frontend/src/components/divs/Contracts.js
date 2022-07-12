import React, { useState, useEffect } from 'react';
import Button from '../utils/Button';
import Contract from './Contract';
import './Contracts.css';
import { ethers } from 'ethers';
import profile from '../../chain-info/deployments/42/0xA98EDEA1D3Ee569AC1f18c01Fef4595A9C8faCd8.json';
import contract from '../../chain-info/deployments/42/0x1B8d9C22aF345278f923efba04cFb88563f1D5b9.json';

const Contracts = () => {
    const profileAddress = '0xA98EDEA1D3Ee569AC1f18c01Fef4595A9C8faCd8';
    const contractAddress = '0x1B8d9C22aF345278f923efba04cFb88563f1D5b9';
    const [contracts, setContracts] = useState([]);
    const [account, setAccount] = useState();
    const [search, setSearch] = useState(null);
    const [modal, setModal] = useState(false);
    const [id, setId] = useState(null);

    useEffect(() => {
        const getAccount = async () => {
            if(window.ethereum) {
                try {
                    if(!account) {  
                        let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                        setAccount(accounts[0]);
                        console.log(accounts[0]);
                    }
                } catch (err) {
                    console.log("err");
                }
            }
        };

        const getContract = async () => {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            // get all contract IDs
            const profileContract = new ethers.Contract(profileAddress, profile.abi, signer);
            let p_txn = await profileContract.getContracts(account);
            console.log("ptxn", p_txn);

            const contractContract = new ethers.Contract(contractAddress, contract.abi, signer);
            let c_txn = [];
            await Promise.all(p_txn.map(async (p) => {
                let c = await contractContract.fullContract(p);
                c_txn.push(c);
            }));
            console.log("useEffect", c_txn);
            setContracts(c_txn)
        };

        getAccount();
        getContract();
    }, []);

    const setOpenModal = () => setModal(true);
    const setCloseModal = () => setModal(false);

    const buttonClick = (id) => {
        setId(id); 
        setOpenModal();
    };

    const onChangeHandler = e => {
        setSearch(...search, e.target.value);
    };

    const onSubmitHandler = e => {
        e.preventDefault();
    };

    return (
        <div className='contracts-container'>
            {modal && 
                <Contract serial={id} >
                    <div className='contract-footer'>
                        <Button onClick={setCloseModal} size='small'>CLOSE</Button>
                    </div>
                </Contract>
            }
            <hr className='contracts-hr' />
            <h2 className='contracts-h2'>YOUR CONTRACTS</h2>
            <form onSubmit={onSubmitHandler}>
                <div className='contracts-search'>
                    <input className='contracts-search-input' placeholder='Search...' value={search} onChange={onChangeHandler} type='text' required />
                    <div className='contracts-search-button'>
                        <Button type='submit' size='small' danger>Search</Button>
                    </div>
                </div>
            </form>
            <table border='0' className='contracts-table'>
                    <tr>
                        <th className='contracts-table-th'>ID</th>
                        <th className='contracts-table-th'>Contract Name</th>
                        <th className='contracts-table-th'>Email</th>
                        <th className='contracts-table-th'>Due Date</th>
                    </tr>
                    {console.log(contracts)}
                    {contracts.length > 0 && contracts.map(c => {
                        return (
                            <>
                                <tr className='contracts-table-tr'>
                                    <td>{c[0]}</td>
                                    <td>{c[1]}</td>
                                    <td>{c[7]}</td>
                                    <td>{c[5]}</td>
                                    <td className='contracts-table-td-button'>
                                        <Button size='small' onClick={buttonClick(c[0])}>Details</Button>
                                    </td>
                                </tr>
                            </>
                        );
                    })}
            </table>
            {contracts.length == 0 &&
                <div className='no-contract-div'>
                    --No Contracts--
                </div>
            }
            <hr className='contracts-hr' />
        </div>
    );
};

export default Contracts;