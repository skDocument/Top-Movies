import React, { Component } from "react";
import MyContext from '../Context/MyContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceFrown } from "@fortawesome/free-regular-svg-icons";
import Card from "./Card";


class ResultSearch extends Component{

    static contextType = MyContext;
    componentDidMount() {
        this.context.setState({base : {...this.context.state.base , search : {...this.context.state.base.search , thisRes : true}}})
    }
    render(){
        return(
            <>
                <div className="bookmarkpage" style={this.context.state.base.header.pos === 'night'
                     ? {backgroundColor : '#262626'} 
                     : {backgroundColor : '#F1F1F1' }}>
                    {
                        this.context.state.base.search.stor.length > 0 
                        ?
                        (
                            <>
                                <div className="cardbox-title">
                                    <h3 style={this.context.state.base.header.pos === 'night' 
                                        ? {color : '#fff'} 
                                        : {color : '#000000' }}><span>{this.context.state.base.search.stor.length}</span> نتیجه یافت شد  
                                    </h3>   
                                </div>
                                <div className="cardWrapper">
                                    {   
                                        this.context.state.base.search.stor &&  
                                        this.context.state.base.search.stor.map(res => (<Card key={res.id} info={res} />))   
                                    }
                                </div>
                            </>
                        )
                        :

                        (
                            <div>
                                <div className="notfind">
                                    <div className="notfind-img">
                                       <FontAwesomeIcon icon={faFaceFrown} style={this.context.state.base.header.pos === 'night' 
                                        ? 
                                        {color : '#fff'}
                                        :
                                        {color : 'crimson'}
                                        }/>
                                    </div>
                                    <div className="notfind-text" >
                                        <h3 style={this.context.state.base.header.pos === 'night' 
                                            ? 
                                            {color : '#fff'}
                                            :
                                            {color : 'crimson'}
                                            }>چیزی پیدا نشد !
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        )

                    }

                </div>
            </>
        )
    }
}



export default ResultSearch;