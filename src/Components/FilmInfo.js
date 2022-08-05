import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import MyContext from '../Context/MyContext'



const FilmInfo = ()=>{
    const context = useContext(MyContext);
    let [film , setFilm] = useState([]);
    let [img , setimg] = useState('');
    const loadFilmDetail = async ()=> {
        const search = new URLSearchParams(window.location.search);
        let filmId = search.get('id');
        let res = await axios.get(`https://moviesapi.ir/api/v1/movies/${filmId}`);

        setFilm(res.data)
        console.log(res.data)
        setimg(res.data.images)

    }

    useEffect(() => {
        loadFilmDetail()
    }, context.state.base.stateDetail)
    return(
        <>
            
            <div className="filminfo" >
                <div className="filminfo-cover"  style={ film.images ?  {backgroundImage : `url(${ img[0] })` } : {backgroundColor : '#262626'}} ></div>
                <div className="filminfo-right">

                    <div className="filminfo-right-posterWrapper">
                        <img src={film.poster} className="filminfo-right-poster"/>
                    </div>

                    <ul className="filminfo-right-lists">
                        <li className="lists lists-rate">{film.imdb_rating}</li>
                        <li className="lists lists-year">{film.year}</li>
                        <li className="lists lists-country">{film.country}</li>
                    </ul>

                </div>

                <div className="filminfo-left">
                    <div className="filminfo-left-title">
                        <h2>{film.title}</h2>
                    </div>

                    <div className="filminfo-left-discription">
                        <p className="director">{film.director}</p>
                        <p className="acters">{film.actors}</p>
                    </div>

                    <div className="filminfo-left-story">
                        <p>
                            {film.plot}
                        </p>
                    </div> 
                </div>
            </div>

        </>
    )
}


export default FilmInfo;