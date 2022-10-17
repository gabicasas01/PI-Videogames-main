import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames } from '../redux/actions'
import Card from './Card'

export default function Home() {
    const dispatch = useDispatch()
    const allGames = useSelector(state => state.videogames)

    useEffect(() => {
        dispatch(getAllGames())
    },[dispatch]);

    if(!allGames.length) {
        return (
            <div>
                <h3>Loading...</h3>
            </div>
        )
    }
    else {
        return (
            <div>
                <div>
                    <select>
                        <option value=''>All</option>
                    {
                        //genres.map(e => <option key={e} value={e}>{e}</option>)
                    }
                    </select>                    <select>
                        <option value=''>All</option>
                    {
                        //genres.map(e => <option key={e} value={e}>{e}</option>)
                    }
                    </select>
                    <select>
                        <option value=''>A-Z</option>
                    {
                        //genres.map(e => <option key={e} value={e}>{e}</option>)
                    }
                        <option value=''>Mín-Max</option>
                    {
                        //genres.map(e => <option key={e} value={e}>{e}</option>)
                    }
                    </select>
                </div>
    
                <div>
                    {allGames.map(vg => <Card key={vg.id} videogame={vg} />)}
                </div>
            </div>
        )
    }
}