import React, { Component } from "react";
import { firebase } from "../firebase";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import MyContext from '../Context/MyContext';
import Card from "./Card";




class BookmarkPage extends Component{

    state = {
        marc : 'sss'
    }
    static contextType = MyContext 
    fetchBookmarks = async ()=> {
        let res = firebase;
        let db = getFirestore(res)
        const citiesCol = collection(db, 'bookmarklist');
        const citySnapshot = await getDocs(citiesCol);

        let projects = citySnapshot.docs.map(doc => ({
            ...doc.data()
        }))
        
        let po = [] ;
        projects.map(res => {
            po.push(res.mov)
        })

        this.context.setState({
            base : {...this.context.state.base, firebase : {...this.context.state.base.firebase , bookmark : po}}
        })
    }

    
    componentDidMount(){
        this.fetchBookmarks()
    }

    componentDidUpdate(){
        if(this.props.up === true){
            this.fetchBookmarks()
            this.context.setState({
                base : {...this.context.state.base, firebase : {...this.context.state.base.firebase , updatebookmarkpage : false}}
            })
        }
    }
    render(){

        return(
            <>
                <div className="bookmarkpage" style={this.context.state.base.header.pos === 'night'
                    ? {backgroundColor : '#262626'} 
                    : {backgroundColor : '#F1F1F1' }}>
                    <div className="cardbox-title">
                        <h3 className="bookmarkTitle" style={this.context.state.base.header.pos === 'night' 
                            ? {color : '#fff'} 
                            : {color : '#000000' }}>فیلم هایی که شما نشان کردید
                        </h3>   
                    </div>
                    <div className="cardWrapper">
                        {
                            localStorage.getItem('access') 
                            ? 
                            this.context.state.base.firebase.bookmark.map(res => 
                                (<Card key={res.id}  info={res}  marc={this.state.marc} />) 
                            ) 

                            :

                            (
                                <div className="bookmarkAlert" style={this.context.state.base.header.pos === 'night' 
                                    ? {color : 'white' }
                                    : {color : 'crimson'}
                                }>
                                    برای مشاهده نشان شده ها ابتدا باید وارد شوید
                                </div>
                            )
                            
                                
                        }
                    </div>  
                </div>
            </>
        )
    }
}



export default BookmarkPage;