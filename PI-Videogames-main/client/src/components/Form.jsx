import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { postVideogame, getAllGenres } from '../redux/actions'
import validate from './InputValidador'
import Loading from "./Loading";
import Style from './Styles/Form.module.css'

const Form = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const allGenres = useSelector(state => state.genres)

    const initialState = {
        name: '',
        description: '',
        released: '',
        rating: 0,
        platforms: [],
        img: '',
        genres: []
    }
    const [input, setInput] = useState(initialState)
    const [errors, setErrors] = useState({})
    const allPlatforms = ["PC","PlayStation","Xbox","Nintendo Switch","iOS", "Android","Nintendo","PS Vita","PSP","Wii","Game Boy","Atari","SEGA","PS5","PS4","PS3","PS2","PS1",
      ]

    useEffect(() => {
        dispatch(getAllGenres())
    },[dispatch]);

    let handleSubmit = (e) => {
        e.preventDefault()

        if (!input.name) { return alert('Name is required') }
        if (input.img.length === 0) { return alert('Image is required') }
        // if (!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(input.released)) { return alert('Wrong released date format. Should be YYYY-MM-DD OR YYYY-M-D') }
        if (!input.rating) { return alert('Rating is required') }
        if (!/^(?:[1-9]\d{0,2}(?:,\d{3})*|0)(?:\.\d+)?$/.test(input.rating) ||
            input.rating < 0 || input.rating > 5) {
            return alert('Wrong format for Rating. Should be a number between 0-5')
        }
        if (input.platforms.length === 0) { return alert('Platform is required') }
        if (input.genres.length === 0) { return alert('Genre is required') }

        console.log(input)

        dispatch(postVideogame(input))
        //dispatch(resetVideogames())
        alert(`Videogame ${input.name} has been added`)
        setInput({ ...initialState })
        history.push('/home')
    }

    let handleGenres = (e) => {
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
    }

    let handlePlatforms = (e) => {
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
    }

    let handleOnChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input, [e.target.name]: e.target.value
        }))
    }

    let handleDeletePlataform = (el) => {
        setInput({
            ...input,
            platforms: input.platforms.filter( p => p !== el)
        })
    }

    let handleDeleteGenres = (el) => {
        setInput({
            ...input,
            genres: input.genres.filter( p => p !== el)
        })
    }


    return (
        <div className={Style.all_container} >
            {allGenres.length === 0 ? (
                <Loading/>
            ) : (
                <div className={Style.form_container} >
                    <Link to='/home'>
                        <button className={Style.button}>VOLVER</button>
                    </Link>
                    <form onSubmit={handleSubmit}>
                            <h2>CREA TU VIDEO JUEGO</h2>
                        <fieldset>
                            <div>
                                <label>NOMBRE: </label>
                                <input type='text' name='name' placeholder='Ingresar nombre' value={input.name} onChange={handleOnChange} />
                                {errors.name && (<p className={Style.error}> {errors.name} </p>)}
                            </div>
                            <div>
                                <label>IMAGEN: </label>
                                <input type='text' name='img' placeholder='Ingresar URL img' value={input.img} onChange={handleOnChange} />
                                {errors.image && (<p className={Style.error}> {errors.image} </p>)}
                            </div>
                            <div>
                                <label>RATING: </label>
                                <input type='number' name='rating' placeholder='Ingresar Rating' value={input.rating} onChange={handleOnChange} />
                                {errors.rating && (<p className={Style.error}> {errors.rating} </p>)}
                            </div>
                        </fieldset>
                        <fieldset>
                            <h4>PLATAFORMAS</h4>
                            <div>
                                <select onChange={handlePlatforms}>
                                    <optgroup label='Plataformas'>
                                    {
                                        allPlatforms.map(p => <option key={p} id={p} value={p}>{p}</option>)
                                    }   
                                    </optgroup>
                                </select>
                                    {input.platforms.map(el => 
                                    <div key={el}>
                                        <p>{el}</p>
                                        <button onClick={() => handleDeletePlataform(el)}>x</button>
                                    </div>
                                    )}
                                {errors.platforms && (<p className={Style.error}> {errors.platforms} </p>)}
                            </div> 
                        </fieldset>
                        <fieldset>
                            <h4>GÉNEROS</h4>
                            <div>
                                <select onChange={handleGenres}>
                                    <optgroup label="Géneros">
                                    {
                                        allGenres.map(e => <option key={e.name} value={e.name}>{e.name}</option>)
                                    }
                                    </optgroup>
                                </select> 
                                    {input.genres.map(el => 
                                    <div key={el}>
                                        <p>{el}</p>
                                        <button onClick={() => handleDeleteGenres(el)}>x</button>
                                    </div>
                                    )}                                 
                                {errors.genres && (<p className={Style.error}> {errors.genres} </p>)}
                            </div>
                        </fieldset>
                        <fieldset>
                            <h4>DESCRIPCIÓN</h4>
                            <div>
                                <textarea value={input.description} name='description' onChange={handleOnChange} />
                                {errors.description && (<p className={Style.error}> {errors.description} </p>)}
                            </div>
                            <div>
                                {/* <label htmlFor="">FECHA DE LANZAMIENTO</label> */}
                                <h4>FECHA DE LANZAMIENTO</h4>
                                <input value={input.released} name='released' onChange={handleOnChange} />
                            </div>
                            <div>
                                <button className={Style.button} type='submit'>CREAR</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            )}
        </div>
    )
}

export default Form;