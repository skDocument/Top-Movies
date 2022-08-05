import React ,{useContext, useEffect, useState} from "react";
import { firebase } from "../firebase";
import { getFirestore, collection, getDocs , deleteDoc ,setDoc, doc  , updateDoc} from 'firebase/firestore/lite';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as fabookmarkfill } from "@fortawesome/free-solid-svg-icons";
import MyContext from '../Context/MyContext.js';
import axios from "axios";
import moment from 'moment';
import CountdownTimer from "../Components/CountdownTimer";






const AboutUs = (props)=>{

    const context = useContext(MyContext);
    let [liv , setliv] = useState(false)

    let [randomMovie , setRandomMovie] = useState([])
    
    const fetchBookmarks = async ()=> {
        let arr = []
        arr = context.state.base.firebase.bookmark
        arr.forEach(ele => {
            if(ele.id == randomMovie.id)
                setliv(true)    
        });
    }
    const fetchInfos = async (state) => {
        let res = firebase;
        let db = getFirestore(res)
        const citiesCol = collection(db, 'offerMovie');
        const citySnapshot = await getDocs(citiesCol);

        let projects = citySnapshot.docs.map(doc => ({
            docID : doc.id ,
            ...doc.data()
        }))

        let set = Math.abs(moment(projects[0].stamp , 'DD/MM/YYYY').diff(moment() , 'days'));

        if(set >= 1){
            await updateDoc(doc(db, "offerMovie" , 'ZTOx0lubviyVNVSmIh6e'), {
                isExit : false, 
            });
        }

        if( projects[0].isExit === false){

            let rand = Math.floor(Math.random() * 250) +1;
            let result = await axios.get(`https://moviesapi.ir/api/v1/movies/${rand}`);

            let db2 = getFirestore(firebase);
            let collect = collection(db2,'offerMovie');
            let istrue = doc(collect, projects[0].docID); 
            await updateDoc(istrue , {
                isExit : true,
                date : moment().locale('ir').format('HH:mm:ss'),
                stamp : moment().format('DD/MM/YYYY')
            })

            await setDoc(doc(db, "selectedMovie" , '3JUtXfhIwg6Fm1iijdmQ'), {
                movie: result.data,
            });
            
        }



        let selldb = collection(db, 'selectedMovie');
        const getSell = await getDocs(selldb);

        let sellmo = getSell.docs.map(doc => ({
            docID : doc.id ,
            ...doc.data()
        }))

        setRandomMovie(sellmo[0].movie)
    }       
    
    const scrollChange = () => {

        let aboutUsDiscription =  document.querySelector('.aboutUs-discriptionWrapper');
        let aboutUsCover =  document.querySelector('.aboutUs-right-cover');
        if(window.pageYOffset > 220 && window.pageYOffset <1500)
        { 
            aboutUsDiscription.classList.add('toltip');
            aboutUsCover.classList.add('opacityshow');
            return
        }  

        else
        {
            aboutUsDiscription.classList.remove('toltip')
            aboutUsCover.classList.remove('opacityshow');
        }
        
    }
    
    const onBookmark =  async () => {
        
        if(localStorage.getItem('access') ){
            
            if(liv === false){
                let res = firebase;
                let db = getFirestore(res)

                setliv(true)
                let id = randomMovie.id
                

                let result = await axios.get(`https://moviesapi.ir/api/v1/movies/${id}`)
                const docRef = await setDoc(doc(db, 'bookmarklist' , `${id}`), {
                    mov : result.data
                });
            }
            else if(liv === true){
                let res = firebase;
                let db = getFirestore(res)
                setliv(false)
                await deleteDoc(doc(db, "bookmarklist", `${randomMovie.id}`));
                context.setState({
                    base : {...context.state.base, firebase : {...context.state.base.firebase , updatebookmarkpage : true}}
                })
            }
            
        }
        
            
    }

    window.addEventListener('scroll' , scrollChange)
    
    useEffect(()=>{
        fetchInfos()
        fetchBookmarks()
    },[props.changeOfferMovie])

    return(
        <section className="aboutUs ">       
            <div className="aboutUs-right " >
                <div className="aboutUs-right-cover"  style={{backgroundImage : `url(${randomMovie.poster} )` }} ></div>
                <div className="aboutUs-posterWrapper"></div>
            </div>
            <div className="aboutUs-left  " style={context.state.base.header.pos === 'night' 
                ? {backgroundColor : '#222327'} 
                : {backgroundColor : '#fff' }}>
                <div className="aboutUs-discriptionWrapper"  >
                    <div className="offerTitle">

                        <h2 className="offertitle title-aboutUs" style={context.state.base.header.pos === 'night' 
                            ? {color : '#fff'} 
                            : {color : '#000000' }}>پیشنهاد ما
                        </h2>

                        <h4 className="offertitle title-movieOffer" style={context.state.base.header.pos === 'night' 
                            ? {color : '#fff'} 
                            : {color : '#000000' }}>{randomMovie.title}
                        </h4>

                    </div>
                    
                    <div className="offerOptions">
                        <div className="offer-starings" >
                            
                            <p className="director" style={context.state.base.header.pos === 'night' 
                                ? {color : '#fff'} 
                                : {color : '#000000' }}>{randomMovie.director} <span> : کارگردان</span>
                            </p>

                            <p className="acters" style={context.state.base.header.pos === 'night' 
                                ? {color : '#fff'} 
                                : {color : '#000000' }}><span>{randomMovie.actors}</span> <span>: بازیگران</span>
                            </p>

                        </div>
                    </div>
                    
                    <div className="offer-movieStory">       
                        <h4>خلاصه داستان</h4>
                        <p className="discription">
                            {randomMovie.plot} 
                        </p>

                    </div>
                    <ul className="filminfo-right-lists">
                        <li className="lists lists-rate">{randomMovie.imdb_rating}</li>
                        <li className="lists lists-year">{randomMovie.year}</li>
                        <li className="lists lists-country">{randomMovie.country}</li>
                    </ul>
                    <div className="offerEnd">       
                        <div className="mark-offerMovie" >
                            {
                                liv === true
                                ?(<a role='button' onClick={onBookmark} className="bookmark" style={context.state.base.header.pos === 'night' 
                                    ? {color : '#fff'} 
                                    : {color : 'crimson'}}>
                                        <FontAwesomeIcon icon={fabookmarkfill}  className={ context.state.base.header.pos === 'night' 
                                            ? "card-bookmark" 
                                            : 'card-bookmark-day'} />برداشتن نشان
                                </a>)

                                :(<a role='button' onClick={onBookmark} className="bookmark" style={context.state.base.header.pos === 'night' 
                                    ? {color : '#fff'} 
                                    : {color : 'crimson'}}>
                                        <FontAwesomeIcon icon={faBookmark}  className={ context.state.base.header.pos === 'night' 
                                            ? "card-bookmark" 
                                            : 'card-bookmark-day'}/> نشان کردن
                                </a>)
                            }
                        </div>
                        
                        <div className="aboutUs-buttonEndOffer" style={context.state.base.header.pos === 'night' 
                            ? {color : '#fff'} 
                            : {color : '#000000' }}>
                            <CountdownTimer changeOfferMovie={props.changeOfferMovie} />
                            تا پیشنهاد بعدی
                        </div>
                    </div>

                </div>
            </div>    
        </section>
    )
}


export default AboutUs;