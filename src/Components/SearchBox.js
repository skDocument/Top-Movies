import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";
import MyContext from '../Context/MyContext';



class SearchBox extends Component{

    static contextType = MyContext;
    serachMod = (e)=> {
        let movieName = document.querySelector('.searchInput').value;
        let thisres = this.context.state.base.search.thisRes
        
        if(movieName != '')
        {
            axios.get(`https://moviesapi.ir/api/v1/movies?q=${movieName}`).then(res => {
                this.context.setState({
                    base : {...this.context.state.base , search : {...this.context.state.base.search , stor : res.data.data}}
                })
            })
             
        }
        else if(thisres && movieName == '')
        {
            this.setState({
                base : {...this.context.state.base , search : {...this.context.state.base.search , stor : []}}
            })
            window.location.reload()
        } 
    }



    render(){

        return(
            <>
                <input type='text' className="searchInput"  placeholder="اسم فیلمی که دنبالش میگردی ..." /> 
                <Link onClick={this.serachMod} to={'/resultSearch'}><FontAwesomeIcon icon={faMagnifyingGlass}  /></Link> 
            </>
        )
    }
}


export default SearchBox;