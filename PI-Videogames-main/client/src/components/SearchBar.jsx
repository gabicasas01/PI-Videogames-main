import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVideosByName } from '../redux/actions'
import Style from './Styles/Navbar.module.css'

const SearchBar = () => {
    const [videojuego, setVideojuego] = useState("")
    const dispatch = useDispatch()

    function handleInputChange(e) {
        e.preventDefault()
        setVideojuego(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getVideosByName(videojuego))
        setVideojuego('')
    }

    return (
        <div>
            <input 
                className={Style.input}
                type='text'
                placeholder='Buscar videojuego...'
                value={videojuego}
                onChange={e => handleInputChange(e)}
            />
            <button onClick={e => handleSubmit(e)} type='submit' className={Style.button}>BUSCAR</button>
        </div>
    )
}

export default SearchBar;