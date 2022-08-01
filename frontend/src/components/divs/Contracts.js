import React, { useState, useEffect, useRef } from 'react';
import Button from '../utils/Button';
import Contract from './Contract';
import './Contracts.css';
import { ethers } from 'ethers';
import profile from '../../chain-info/deployments/42/0x2972A8DBd8914a2bd24d99402A66c74F74148348.json';
import contract from '../../chain-info/deployments/42/0x7eED4c6135Ba416b774D01362272Fe6B30dc59e1.json';

const Contracts = () => {
    const profileAddress = '0x2972A8DBd8914a2bd24d99402A66c74F74148348';
    const contractAddress = '0x7eED4c6135Ba416b774D01362272Fe6B30dc59e1';
    // const [contracts, setContracts] = useState([]);
    const contracts = useRef([]);
    const [getContract, setGetContract] = useState();
    const [account, setAccount] = useState();
    const [search, setSearch] = useState(null);
    const [modal, setModal] = useState(false);
    const [id, setId] = useState(null);

    useEffect(() => {
        console.log("Process initiated");
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
            console.log("Fetching contracts");
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
            contracts.current = c_txn;
            console.log("useEffect", contracts.current);
            setGetContract(contracts.current);
        };

        getAccount();
        getContract();
    }, [account, contracts]);

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
                    {getContract && getContract.map(c => {
                        return (
                            <>
                                <tr className='contracts-table-tr'>
                                    <td>{Math.floor(parseInt(c[0]._hex, 16)/1000)}</td>
                                    <td>{c[1]}</td>
                                    <td>{c[7]}</td>
                                    <td>{c[5]}</td>
                                    <td className='contracts-table-td-button'>
                                        <Button size='small' onClick={() => buttonClick(Math.floor(parseInt(c[0]._hex, 16)/1000))}>Details</Button>
                                    </td>
                                </tr>
                            </>
                        );
                    })}
            </table>
            {!getContract &&
                <div className='no-contract-div'>
                    --No Contracts--
                </div>
            }
            <hr className='contracts-hr' />
        </div>
    );
};

export default Contracts;