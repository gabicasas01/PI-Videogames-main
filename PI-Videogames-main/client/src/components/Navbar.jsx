import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllGames } from '../redux/actions'
import SearchBar from './SearchBar'
import Style from './Styles/Navbar.module.css'


const Navbar = () => {

    const dispatch = useDispatch()

    function handleClick(e) {
        e.preventDefault()
        dispatch(getAllGames())
    };

    return (
        <div className={Style.navbar}>
            <button onClick={ e => handleClick(e)} className={Style.button}>RECARGAR</button>
            <SearchBar />
            <Link to='/create'>
                <button className={Style.button}>CREAR</button>
            </Link>
        </div>
    )
}

export default Navbar;