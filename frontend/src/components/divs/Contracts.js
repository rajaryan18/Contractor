import React, { useState } from 'react';
import Button from '../utils/Button';
import './Contracts.css';

const ct = [
    {
        name: 'Road Construction',
        org: 'Reliance Pvt Lmt',
        date: '11/11/22'
    },
    {
        name: 'Road Construction',
        org: 'Reliance Pvt Lmt',
        date: '11/11/22'
    },
];

const Contracts = () => {
    let sl = 1;
    const [search, setSearch] = useState(null);

    const onChangeHandler = e => {
        setSearch(...search, e.target.value);
    };

    const onSubmitHandler = e => {
        e.preventDefault();
    }
    return (
        <div className='contracts-container'>
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
                    <th className='contracts-table-th'>Sl No.</th>
                    <th className='contracts-table-th'>Contract Name</th>
                    <th className='contracts-table-th'>Organization</th>
                    <th className='contracts-table-th'>Due Date</th>
                    {ct.map(c => {
                        return (
                            <>
                                <tr className='contracts-table-tr'>
                                    <td>{sl++}</td>
                                    <td>{c.name}</td>
                                    <td>{c.org}</td>
                                    <td>{c.date}</td>
                                    <td className='contracts-table-td-button'>
                                        <Button size='small'>Details</Button>
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