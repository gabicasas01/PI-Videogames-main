import React from 'react';
import Style from './Styles/Loading.module.css'

const Loading = () => {
    return (
        <div className={Style.container}>
            <h1 className={Style.h1} >LOADING...</h1>
        </div>
    )
}

export default Loading;