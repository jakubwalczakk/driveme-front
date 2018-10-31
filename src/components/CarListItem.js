import React, { Component } from 'react';

const CarListItem = (props) => {

    const imageUrl = "./../resources/car.jpg"; 

    return (
        <li className="list-group-item">
            <div className="car-list">
                <div className="media-left">
                    <img className="media-object" src={imageUrl} />
                </div>
                <div className="media-body">
                    <div className="media-heading">
                    </div>
                </div>
            </div>
        </li>
    );
}