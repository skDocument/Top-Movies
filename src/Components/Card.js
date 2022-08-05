import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as fabookmarkfill } from "@fortawesome/free-solid-svg-icons";
import { firebase } from "../firebase";
import { getFirestore , deleteDoc ,setDoc, doc } from 'firebase/firestore/lite';
import React, { useContext, useEffect, useState } from "react";
import MyContext from '../Context/MyContext';
import { Link } from "react-router-dom";
import axios from "axios";


const Card = (data)=> {
    const context = useContext(MyContext)
    
    let [liv , setliv] = useState(false)

    const fetchBookmarks = async ()=> {
        let arr = []
        arr = context.state.base.firebase.bookmark
        arr.forEach(ele => {
            if(ele.id == data.info.id)
                setliv(true)
            
        });
    }

    const onBookmark =  async () => {
        
        if(localStorage.getItem('access') ){
            
            if(liv === false){
                let res = firebase;
                let db = getFirestore(res)

                setliv(true)
            
                let id = data.info.id
                let result = await axios.get(`https://moviesapi.ir/api/v1/movies/${id}`)
                const docRef = await setDoc(doc(db, 'bookmarklist' , `${id}`), {
                    mov : result.data
                });
            }
            else if(liv === true){
                let res = firebase;
                let db = getFirestore(res)
                setliv(false)
                await deleteDoc(doc(db, "bookmarklist", `${data.info.id}`));
                context.setState({
                    base : {...context.state.base, firebase : {...context.state.base.firebase , updatebookmarkpage : true}}
                })
            }
            
        }
        
            
    }


    useEffect(() => {
        fetchBookmarks()
    } ,[context.state.base.reder])
    


    return(
        <div className="cardsite">
            <div className="card">
                <div className="card-overlay ">
                    <div className="card-buttons ">
                        {
                            liv === true
                            ?
                            (
                                <a role='button' onClick={onBookmark} className="bookmark">
                                    <FontAwesomeIcon icon={fabookmarkfill} className="card-bookmark"/>برداشتن نشان
                                </a>
                            )
                            :
                            (
                                <a role='button' onClick={onBookmark} className="bookmark">
                                    <FontAwesomeIcon icon={faBookmark} className="card-bookmark"/> نشان کردن
                                </a>
                            )
                        }
                        <button className="continue">
                            <Link className="continue-link" to={`/film?id=${data.info.id}` }>بیشتر...</Link>
                        </button>
                    </div>

                </div>
                <div className="card-rate">{data.info.imdb_rating}</div>
                <img src={data.info.poster}  className="card-poster"/>
            </div>

            <div className="card-banner " >
                <Link style={context.state.base.header.pos === 'night' 
                    ? {color : '#fff'} 
                    : {color : '#000000' }} to={`/film?id=${data.info.id}` } className="card-title">{data.info.title}
                </Link>
                <p className="card-year" style={context.state.base.header.pos === 'night' 
                    ? {color : '#fff'} 
                    : {color : '#000000' }}>{data.info.year}
                </p>
            </div>
            
        </div>
        
    )
}


export default Card;