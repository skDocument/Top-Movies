import React, { Component } from "react";
import Card from "../Components/Card";
import NumberPage from "../Components/NumberPage";
import axios from "axios";
import MyContext from '../Context/MyContext';
import { firebase } from "../firebase";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';


class Content extends Component  {
    static contextType = MyContext;
    

    fetchItems = async () =>{
        
        this.context.setState({
            base : {...this.context.state.base , search : {...this.context.state.base.search , stor : [] , thisRes : false}}
        })
        
        if(this.context.state.base.firebase.bookmark.length == 0){
            let res = firebase;
            let db = getFirestore(res)
            const citiesCol = collection(db, 'bookmarklist');
            const citySnapshot = await getDocs(citiesCol);


            let projects = citySnapshot.docs.map(doc => ({...doc.data()}))
            let po = [] ;
            projects.map(res => {
                po.push(res.mov)
            })

            this.context.setState({
                base : {...this.context.state.base , firebase  : {...this.context.state.base.firebase , bookmark : po}}
            })
        }
       
        const search = new URLSearchParams(window.location.search);
        let current = search.get('page');
        let result = await axios.get(`https://moviesapi.ir/api/v1/movies?page=${current} `);

        this.context.setState({
            base : {...this.context.state.base , cards : result.data.data , filminfo : result.data.metadata},    
        })
        let count = this.context.state.base.filminfo.page_count;

        let pagesSite = [];
        for(let i =1;i <= count ; i++){
            if(Math.abs(i-result.data.metadata.current_page) < 4){
                pagesSite.push(i);
            }
        }
        this.context.setState({
            base : {...this.context.state.base , pages : pagesSite}
        })
    }

    componentDidMount(){
        this.fetchItems()
    }

    
    render(){
        return(
            <main className="main">
                <div className="cardbox" style={this.context.state.base.header.pos === 'night' 
                    ?{backgroundColor : '#262626'} 
                    :{backgroundColor : '#F1F1F1' }}>
                    
                    <div className="cardbox-title">
                        <h3 style={this.context.state.base.header.pos === 'night' 
                            ? {color : '#fff'} 
                            : {color : '#000000' }}>لیست فیلم ها
                        </h3>
                    </div>
                    
                    <div className="cardWrapper" >
                        {
                            this.context.state.base.cards && 
                            this.context.state.base.cards.map(movie => (<Card key={movie.id} info={movie}/>))
                        }
                    </div>

                    <ul className={ this.context.state.base.header.pos === 'night' 
                        ? "numberPage" 
                        : 'numberPage-day'}>
                        {
                            this.context.state.base.pages && 
                            this.context.state.base.pages.map(item => (<NumberPage key={item} info={item}  />))
                        }
                    </ul>

                </div>
            </main>
        )
    }

}


export default Content;