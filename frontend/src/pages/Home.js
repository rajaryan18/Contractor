import React from 'react';
import { TextField } from '@mui/material';
import Card from '../components/utils/Card';
import { store } from '../components/reducers/metamask-reducer';

const Home = props => {

    store.dispatch();

    return (
        <div className='home-container'>
            <Card elevation={true} size='small' bgcolor='white'>
                <div className='card-div'>
                    <TextField label='Account' id='filled-basic' variant='filled' />
                    <br />
                    <TextField label='Password' id='filled-basic' variant='filled' />
                </div>
            </Card>
        </div>
    );
};

export default Home;