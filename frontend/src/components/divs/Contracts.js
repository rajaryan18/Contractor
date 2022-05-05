import React, { useState } from 'react';
import Button from '../utils/Button';
import './Contracts.css';

const Contracts = () => {
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
                    <input className='contracts-search-input' value={search} onChange={onChangeHandler} type='text' required />
                    <Button type='submit' danger>Search</Button>
                </div>  
            </form>
            <hr className='contracts-hr' />
        </div>
    );
};

export default Contracts;