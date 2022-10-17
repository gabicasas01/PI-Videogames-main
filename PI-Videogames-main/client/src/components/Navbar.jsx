import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <h1>Soy el Navbar</h1>

            <input></input>
            <Link to='/home'>
                <button>Home</button>
            </Link>
            <Link to='/game/create'>
                <button>Create</button>
            </Link>
        </div>
    )
}

export default Navbar;