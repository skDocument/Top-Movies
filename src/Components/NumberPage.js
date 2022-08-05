import React, { Component } from "react";
import { Link } from "react-router-dom";
import MyContext from '../Context/MyContext';

class NumberPage extends Component{

    static contextType = MyContext;
    render(){
        let search = new URLSearchParams(window.location.search)
        let genreTitle = search.get('genreTitle')
        let genre = search.get('genre')
        return(
            <React.Fragment>
                {
                    this.props.meta
                    ? 
                    (
                        <li   className={this.props.info == this.props.meta.current_page  && 'count-active'}  onClick={() => {
                                this.context.setState({
                                    base : {...this.context.state.base , reder : true}
                                })
                            }} >

                            <Link  to={`?genre=${genre}&genreTitle=${genreTitle}&page=${this.props.info}`} >{this.props.info}</Link>
          
                        </li>
                    ) 
                    : 
                    
                    (
                        <li  className={this.props.info == this.context.state.base.filminfo.current_page && 'count-active'} >
                            <a href={`/?page=${this.props.info}`}  >{this.props.info}</a>
                        </li>
                    )
                }
            </React.Fragment>
        )
    }
    
}


export default NumberPage;