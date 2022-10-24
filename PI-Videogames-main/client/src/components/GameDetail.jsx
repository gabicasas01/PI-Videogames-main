import React from "react";
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDetailVideogame } from "../redux/actions";
import Loading from "./Loading";
import Style from './Styles/GameDetail.module.css'


const GameDetail = (props) => {

    const id = props.match.params.id
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetailVideogame(id))
    }, [dispatch, id])

    const Videogame = useSelector((state) => state.detail)


    return (
        <div>

            {
                !Videogame ?
                <Loading/> :
                <div className={Style.detail_container} >
                    <div>
                        <Link to='/home'>
                            <button className={Style.button}>VOLVER</button>
                        </Link>        
                        <h1>{Videogame.name}</h1>
                        <div>
                            <img src={Videogame.img} alt='not found' width='640px' height='360px' />
                        </div>
                        <div>
                            <h4>PLATFORMS</h4>
                            {Videogame.platforms?.join(', ')}
                        </div>
                        <div>
                            <h4>GENRES</h4>
                            {Videogame.createdInDb? Videogame.genres.map( g => g.name).join(', ') : Videogame.genres?.join(', ')}
                        </div>
                        <div>
                            <h4>RATING</h4>
                            {Videogame.rating}
                        </div> 
                        <div>
                            <h4>RELEASED</h4>
                            {Videogame.released}
                        </div>                          
                    </div>
                    <div className={Style.description} >
                        <p>{Videogame.description.replace(/<[^>]*>/g, '')}</p>
                    </div>


                </div>
            }
        </div>
    )
}

export default GameDetail;