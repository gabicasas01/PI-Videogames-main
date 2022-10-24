import React from 'react';
import Style from './Styles/Paginado.module.css'

export default function Paginado ({vgPerPage, allGames, paginado}) {
    const pageNumbers = []
    let cantidadDePaginas = Math.ceil(allGames.length / vgPerPage)

        for (var i = 1; i <= cantidadDePaginas; i++) {
            pageNumbers.push(i)
    }

    return (
        <div>
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