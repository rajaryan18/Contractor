import React, { useState } from 'react';
import Button from '../utils/Button';
import Contract from './Contract';
import './Contracts.css';

const ct = [
    {
        serial: 2444,
        name: 'Road Construction',
        org: 'Reliance Pvt Lmt',
        date: '11/11/22'
    },
    {
        serial: 2445,
        name: 'Road Construction',
        org: 'Reliance Pvt Lmt',
        date: '11/11/22'
    },
];

const Contracts = () => {
    const [search, setSearch] = useState(null);
    const [modal, setModal] = useState(false);
    const [id, setId] = useState(null);

    const setOpenModal = () => setModal(true);
    const setCloseModal = () => setModal(false);

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
                    <th className='contracts-table-th'>ID</th>
                    <th className='contracts-table-th'>Contract Name</th>
                    <th className='contracts-table-th'>Email</th>
                    <th className='contracts-table-th'>Due Date</th>
                    {ct.map(c => {
                        return (
                            <>
                                <tr className='contracts-table-tr'>
                                    <td>{c.serial}</td>
                                    <td>{c.name}</td>
                                    <td>{c.email}</td>
                                    <td>{c.date}</td>
                                    <td className='contracts-table-td-button'>
                                        <Button size='small' onClick={() => {setId(c.serial); setOpenModal;}}>Details</Button>
                                    </td>
                                </tr>
                            </>
                        );
                    })}
            </table>
            <hr className='contracts-hr' />
        </div>
    );
};

export default Contracts;