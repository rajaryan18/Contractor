import React from 'react';
import './Card.css';

export default function Card(props) {
    return(
        <div className={`card ${props.elevation ? 'elevation' : ''} ${props.position} ${props.size} ${props.bgcolor}`}>
            {props.children}
        </div>
    );
};