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
                        <h1>Welcome</h1>
                        <div className='contentSubtitle'>
                            <span>The ultimate destination for movie lovers. Explore Now...</span>
                            <Link to="/login"><Button variant='contained'>Start Watching</Button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Showcase;