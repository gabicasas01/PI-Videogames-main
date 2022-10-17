import React from 'react';

const Card = ({videogame}) => {
    return (
        <div>
            <h4>{videogame.name}</h4>
            <h5>{videogame.genres.map(g => g.name).join(' ')}</h5>
            <img src={videogame.img} alt='image not found' width='200px' height='200px' />
        </div>
    )
}

export default Card;