import React from 'react';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import { resetError } from '../redux/actions'

const Error = () => {

    const dispatch = useDispatch()

    const handlerRefresh = (e) => {
        e.preventDefault();
        dispatch(resetError())
      }

    return (
        <div>
            <h1>Error</h1>
            <Link to='/home'>
                <button onClick={handlerRefresh} >Volver</button>
            </Link>
        </div>
    )
}

export default Error;