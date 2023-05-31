import React from 'react';
import "./Showcase.scss";
import { Button } from '@mui/material';
import {Link} from "react-router-dom";

const Showcase = () => {
    return (
        <div className='showcase'>
            <div className="totalContainer">
                <div className="containerFirst">
                    <div className="firstContent">
                        <h1>Free Movies & TV</h1>
                        <h1>Fewer Ads than Cable</h1>
                        <h1>No Subscription Required</h1>
                        <div className='contentSubtitle'>
                            <span>Thousands of movies and TV shows. Always free. 100% Legal.</span>
                            <Link to="/login"><Button variant='contained'>Start Watching</Button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Showcase;