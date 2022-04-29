import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import Card from '../components/utils/Card';
import Button from '../components/utils/Button';
import Modal from '../components/utils/Modal';
import { store } from '../components/reducers/metamask-reducer';

import img from '../components/images/logo.jpg';
import './Home.css';

const Home = props => {

    const [showMessage, setShowMessage] = useState(false);
    const [account, setAccount] = useState(null);

    const setShowMessageHandler = () => setShowMessage(true);
    const setDontShowMessageHandler = () => setShowMessage(false);


    useEffect(() => {
        if(!store.dispatch({ type: 'CONNECT' })) {
            let accounts = store.dispatch({ type: 'ACCOUNT' });
            setAccount(accounts);
            console.log(account);
            setShowMessageHandler();
        }
    }, []);

    return (
        <React.Fragment>
            <Modal
                show={showMessage}
                onCancel={setDontShowMessageHandler}
                header='MESSAGE'
                footer={<Button onClick={setDontShowMessageHandler}>CLOSE</Button>}
            >
                <p>Login to your MetaMask account to continue</p>
            </Modal>
            <div className='home-container'>
                <Card elevation={true} size='small' bgcolor='white' position='right'>
                    <div className='card-div'>
                        <img src={img} alt='logo' className='home-card-img' />
                        <h1>CONTRACTOR</h1>
                        <TextField label='Account' id='filled-basic' variant='filled' />
                        <br />
                        <TextField label='Password' id='filled-basic' variant='filled' />
                        <br />
                        <Button size='small' onClick={() => setShowMessageHandler()}>SUBMIT</Button>
                        <p className='home-card-p'>Password did not match, please try again</p>
                    </div>
                </Card>
            </div>
        </React.Fragment>
    );
};

export default Home;