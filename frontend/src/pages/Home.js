import React from 'react';
import Button from '../components/utils/Button';
import Header from './Header';
import Card from '../components/utils/Card';
import Contracts from '../components/divs/Contracts';

import './Home.css';

const Home = () => {
    return(
        <div className='home-continer'>
            <Header />
            <div className='home-body'>
                <Card elevation='complete' bgcolor='white' size='large'>
                    <div className='new-contract-button'>
                        <Button size='big' invese>Profile</Button>
                        <Button size='big' inverse > + New Contract</Button>
                    </div>
                    <Contracts />
                </Card>
                <Card elevation='complete' bgcolor='white' size='medium'>
                    <h2 className='home-news-h2'>NEWS</h2>
                    <hr id='home-news-hr' />
                </Card>                
            </div>
        </div>
    );
};

export default Home;