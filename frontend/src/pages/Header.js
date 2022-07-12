import React from 'react';
import './Header.css';

const Header = (props) => {
    return (
        <div className='header-container'>
            {props.text}
        </div>
    );
};

export default Header;