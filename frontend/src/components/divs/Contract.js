import React from 'react';
import './Contract.css';

const Contract = props => {
    // fetch the contract using id
    return (
        <>
            <div className='contract-container'>
                <h1 className='contract-h1'>CONTRACT DETAILS</h1>
                <hr/>
                <div className='contract-detail'>
                    <p className='contract-heading'>ID</p>
                    <p className='contract-body'>: {props.data.serial}</p>
                </div>
                <div className='contract-detail'>
                    <p className='contract-heading'>Contract Name</p>
                    <p className='contract-body'>: {props.data.name}</p>
                </div>
                <div className='contract-detail'>
                    <p className='contract-heading'>Client GST</p>
                    <p className='contract-body'>: {props.data.gst}</p>
                </div>
                <div className='contract-detail'>
                    <p className='contract-heading'>Address</p>
                    <p className='contract-body'>: {props.data.to}</p>
                </div>
                <div className='contract-detail'>
                    <p className='contract-heading'>Phone</p>
                    <p className='contract-body'>: {props.data.phone}</p>
                </div>
                <div className='contract-detail'>
                    <p className='contract-heading'>Email</p>
                    <p className='contract-body'>: {props.data.email}</p>
                </div>
                <div className='contract-detail'>
                    <p className='contract-heading'>Due Date</p>
                    <p className='contract-body'>: {props.data.date}</p>
                </div>
                <div className='contract-detail'>
                    <p className='contract-heading'>Details</p>
                    <p className='contract-body'>: {props.data.details}</p>
                </div>
            </div>
            <div className='contract-footer'>
                {props.children}
            </div>
        </>
    );
};

export default Contract;