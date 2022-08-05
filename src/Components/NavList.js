import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import MyContext from '../Context/MyContext';
import axios from "axios";


let arr = [];
class NavList extends Component{
    static contextType = MyContext ;

    fetchNeastedList = async ()=>{
        let result = await axios.get('https://moviesapi.ir/api/v1/genres')
        this.context.setState({
            base : {...this.context.state.base , genreList: result.data}
        })

        arr = result.data  
    }

    selectUl = () => {
        let selectLi = document.querySelector('.selectul');
        let pos = selectLi.getAttribute('accesskey');
        if(pos === 'close'){
            this.context.setState({
                base : {...this.context.state.base , toggleNav : true}
            })
            selectLi.setAttribute('accesskey' , 'open')
        }

        else if(pos === 'open')
        {
            this.context.setState({
                base : {...this.context.state.base , toggleNav : false}
            })
            selectLi.setAttribute('accesskey' , 'close')
        }
            
    }   


    onChange(){
        this.context.setState({
            base : {...this.context.state.base , reder : true}
        })
    }

    componentDidMount(){
        this.fetchNeastedList()
    }

    render(){
        let angel = this.context.state.base.toggleNav === true ? faAngleRight : faAngleDown;
        return(
            <ul className="navList-wrapper">
                
                <li className="navList-wrapper-li">
                    <Link to="/" >
                        <FontAwesomeIcon icon={faHouse}  className="navList-icons" />خانه
                    </Link>
                </li>
                <li onClick={this.selectUl} className="navList-wrapper-li selectul" accessKey="close">
                    <a  ><FontAwesomeIcon icon={faFilm}  className="navList-icons" />
                        ژانرها<FontAwesomeIcon icon={angel} className="angeldown"/>
                    </a>
                    <ul className="dropdown">

                        {
                            arr && 
                            arr.map(li => (
                            <li  style={this.context.state.base.toggleNav === true 
                                    ? {height : '40px' , borderTop : '1px solid #121212'} 
                                    : {height : '0px'}} >

                                <Link to={`/genres?genre=${li.id}&genreTitle=${li.name}`} className="dropdown-links" onClick={this.onChange} >
                                    {li.name}
                                </Link>
                            </li>))}
    
                        
                    </ul>
                </li>
    
                <li className="navList-wrapper-li">
                    <a href="#">
                        <FontAwesomeIcon icon={faMicrophone}  className="navList-icons" />دوبله فارسی
                    </a>
                </li>
    
                <li className="navList-wrapper-li">
                    <Link to='/bookmark'>
                        <FontAwesomeIcon icon={faBookmark}  className="navList-icons" />نشان شده ها
                    </Link>
                </li>
    
                <li className="navList-wrapper-li">
                    <a href="#"><FontAwesomeIcon icon={faStar}  className="navList-icons" />
                        فیلم های منتخب
                    </a>
                </li>
            </ul>
        )
    }
}


export default NavList;