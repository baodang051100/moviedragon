import React, { useEffect, useState } from 'react';
import "./List.scss";
import ListItem from '../ListItem/ListItem';
import axios from 'axios';

const List = ({ list }) => {
    return (
        <>
            <div className="list">
                <h1>{list.title}</h1>
                <div className="wrapper">
                    <div className="container">
                        {list.content.map((index, i) => {
                            return (
                                <ListItem key={i} item={index} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default List;