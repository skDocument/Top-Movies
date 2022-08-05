import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSun} from "@fortawesome/free-solid-svg-icons";
import {faMoon} from "@fortawesome/free-solid-svg-icons";
import MyContext from '../Context/MyContext';


class NightAndDaytoggle extends React.Component{
    static contextType = MyContext;
    toggleDayandNight = async(e)=>{
        
        let pos = this.context.state.base.header.pos
        if(pos === 'night')
        {
            localStorage.setItem('mod' , 'day')
            this.context.setState({
                base : {...this.context.state.base, header : {...this.context.state.base.header , pos : 'day'}}
            })

        }
        else if(pos === 'day')
        {
            localStorage.setItem('mod' , 'night')
            this.context.setState({
                base : {...this.context.state.base, header : {...this.context.state.base.header , pos : 'night'}}
            })
        }
    } 
    render(){

        return(
            <div className="toggle-wrapper row justify-content-end" >
                <div className="toggle" onClick={this.toggleDayandNight} style={this.context.state.base.header.pos == 'night' 
                    ? { left : '0px'}
                    : {left : '40px'} }>
                    <FontAwesomeIcon icon={ this.context.state.base.header.pos === 'night' ? faSun : faMoon}/>
                </div>
            </div>
        )
    }
}


export default NightAndDaytoggle;