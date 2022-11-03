import React from 'react';
import Style from './Styles/Paginado.module.css'

export default function Paginado ({vgPerPage, allGames, paginado, currentPage, setCurrentPage}) {
    const pageNumbers = []
    let cantidadDePaginas = Math.ceil(allGames.length / vgPerPage)

        for (var i = 1; i <= cantidadDePaginas; i++) {
            pageNumbers.push(i)
    }


    function handlePrevius () {
        if(currentPage !== 1) {
            setCurrentPage(state => state -1)
        }
    }


    return (
        <div>
            <button onClick={handlePrevius}>PREVIUS</button>
            <nav>
                <ul className={Style.ul_paginado}>
                    { pageNumbers &&
                        pageNumbers.map(number => (
                            <li className={Style.li_paginado} key={number}>
                                <a className={Style.a_paginado} onClick={() => paginado(number)} href="#">{number}</a>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </div>
    )
}