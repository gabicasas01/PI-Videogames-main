import React from 'react';
import {Link} from 'react-router-dom';
import Style from './Styles/LandingPage.module.css'


const LandingPage = () => {
    return (
        <div className={Style.container}>
            <Link to='/home'>
                <button className={Style.button}>INGRESAR</button>
            </Link>
        </div>
    )
}

export default LandingPage;