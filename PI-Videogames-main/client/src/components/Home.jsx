import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames, getAllGenres, filterByGenre, filterCreated, orderByName, orderByRating, resetGameDetail } from '../redux/actions';
import Card from './Card';
import Paginado from './Paginado';
import Loading from "./Loading";
import Error from "./Error";
import Navbar from "./Navbar";
import Style from './Styles/Home.module.css'

export default function Home() {
    const dispatch = useDispatch()
    const allGames = useSelector(state => state.videogames)
    const allVideogames = useSelector(state => state.allVideogames)
    const stateError = useSelector(state => state.error)
    const allGenres = useSelector(state => state.genres)

    const [currentPage, setcurrentPage] = useState(1)
    const [vgPerPage] = useState(15)
    const [order, setOrder] = useState('')

    const indexOfLastVg = currentPage * vgPerPage
    const indexOfFirstVg = indexOfLastVg - vgPerPage
    const currentVgs = allGames.slice(indexOfFirstVg, indexOfLastVg)

    const paginado = (pageNumber) => {
        setcurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getAllGames())
        dispatch(getAllGenres())
        dispatch(resetGameDetail())
    },[dispatch]);

    function handleFilterByGenre(e) {
        dispatch(filterByGenre(e.target.value))
    };

    function handleFilterByCreated(e) {
        dispatch(filterCreated(e.target.value))
    };
    
    function handleSortByName(e) {
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setcurrentPage(1)
        setOrder(`Ordenado ${e.target.value} `)
    }
    function handleSortByRating(e) {
        e.preventDefault()
        dispatch(orderByRating(e.target.value))
        setcurrentPage(1)
        setOrder(`Ordenado ${e.target.value} `)
    }

    return (
        <div>
            {stateError.length ?
                (<Error/>)  
            :
            allVideogames <=0 || allGenres <=0 ? (
                <div>
                    <Loading/>
                </div>
            ) : (
                <div className={Style.container} >
                    <div>
                        <Navbar/>
                    </div>
                    <div className={Style.filter_container} >
                        <div className={Style.select_container} >
                            <label>FILTRAR POR: </label>
                            <select className={Style.select} onChange={ e => handleFilterByGenre(e)}>
                                <optgroup label="Géneros">
                                    <option value='Todos'>Todos</option>
                                {
                                    allGenres.map(e => <option key={e.name} value={e.name}>{e.name}</option>)
                                }
                                </optgroup>
                            </select>     
                            <select className={Style.select} onChange={ e => handleFilterByCreated(e)} >
                                <optgroup label="Creados por:">
                                    <option value='Default'>Default</option>
                                    <option value='Existentes'>Existentes</option>
                                    <option value='Creados'>Creados</option>
                                </optgroup>
                            </select>
                        </div>
                        <div>
                            <label>ORDENAR POR: </label>
                            <select className={Style.select} onChange={ e => handleSortByName(e)} >
                                <optgroup label='Name'>
                                    <option value='Default'>Default</option>
                                    <option value='name_asc'>A - Z</option>
                                    <option value='name_desc'>Z - A</option>
                                </optgroup>
                            </select>
                            <select className={Style.select} onChange={ e => handleSortByRating(e)} >
                                <optgroup label='Rating'>
                                    <option value='Default'>Default</option>
                                    <option value='rating_asc'>Mín - Max</option>
                                    <option value='rating_desc'>Max - Mín</option>
                                </optgroup>
                            </select>
                        </div>
                </div>
                
                <div className={Style.card_container} >
                    {currentVgs.map(vg => <Card key={vg.id} videogame={vg} />)}
                </div>
                            
                <div>
                    <Paginado 
                        vgPerPage={vgPerPage}
                        allGames={allGames}
                        paginado={paginado}
                        currentPage={currentPage}
                        setCurrentPage={setcurrentPage}
                    />
                </div>
            </div>
            ) 
        }
        </div>
    )
}