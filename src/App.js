import  React, {useState } from "react";
import Header from './layouts/Header';
import './css/main.css';
import DefaultAvatar from './Adds/img/default-avatar.png';
import Footer from "./layouts/Footer";
import Navbar from "./layouts/Navbar";
import MyContext from './Context/MyContext';
import FilmInfo from "./Components/FilmInfo";
import { Routes , Route } from "react-router-dom";
import Home from "./Home";
import Genres from "./Components/Genres";
import FormPage from "./Components/FormPage";
import BookmarkPage from "./Components/BookmarkPage";
import ResultSearch from "./Components/ResultSearch";
import ProgrammerInfo from "./Components/ProgrammerInfo";

 
const App = () => {

    const [state , setState] = useState({
    
        base : {
            req : 'static',
            cards : [],
            filminfo : [],
            pages : [],
            reder : false,
            genreList : [],
            toggleNav : false,
            genremovie : {
                title : '',
                movie : [],
                metaData : [],
                pages : []
            },
            stateDetail : '',
            header : {
                hamburgerMenuToggle : false,
                pos : localStorage.getItem('mod') ? localStorage.getItem('mod') : 'night',
                toggleUpdate : false,
                
            } ,

            firebase : {
                changeOfferMovie : false,
                bookmark : [],
                updatebookmarkpage : false  
            }
            ,
            form : {
                accessTk : '',
                userState : 'کاربر مهمان',
                avatar : DefaultAvatar,
            }
            ,
            search : {
                stor : [],
                thisRes : false
            }
        }
        
    })
    
    return(
        <MyContext.Provider value={{state,setState}}>
            
            <Navbar />
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/film" element={<FilmInfo setdet={state.base.stateDetail} />} />
                <Route path="/genres" element={<Genres reder={state.base.reder}/>} />
                <Route path="/form" element={<FormPage />} />
                <Route path="/bookmark" element={<BookmarkPage up={state.base.firebase.updatebookmarkpage}/>} />
                <Route path="/resultSearch" element={<ResultSearch stor={state.base.search.stor} />} />
                <Route path="/programmerInfo" element={<ProgrammerInfo />} />
            </Routes>

            <Footer />

            <Routes>

            </Routes>

    </MyContext.Provider> 

    )

}


export default App;