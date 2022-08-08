import React from 'react';
import Button from '../components/utils/Button';
import Header from './Header';
import Card from '../components/utils/Card';
import Contracts from '../components/divs/Contracts';

import './Home.css';

const Home = () => {
    // const { notifications } = useNotifications();

    // if(notifications.filter((notification) => notification.type === "transactionSucceed" && notification.transactionName === "Add Contract").length > 0) {
    //     alert("Contract has been added!");
    // }

    return(
        <div className='home-continer'>
            <Header text="CONTRACTOR" />
            <div className='home-body'>
                <Card elevation='complete' bgcolor='white' size='large'>
                    <div className='new-contract-button'>
                        <Button size='big' inverse to="/home/profile">PROFILE</Button>
                        <Button size='big' inverse to="/home/contract"> + New Contract</Button>
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