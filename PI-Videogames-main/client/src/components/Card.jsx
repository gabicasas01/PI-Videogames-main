import React from 'react';
import { Link } from 'react-router-dom';
import Style from './Styles/Card.module.css'

const Card = ({videogame}) => {
    return (
        <div className={Style.card_container}>
            <Link to={`/games/${videogame.id}`}>
            <h4 className={Style.button} >{videogame.name}</h4>
            </Link>        
            <h5>{videogame.genres?.map(g => g.name).join(' ')}</h5>
            <h5>{videogame.rating}</h5>
            <img src={videogame.img} alt='not found' className={Style.img_card} />
        </div>
    )
}

export default Card;