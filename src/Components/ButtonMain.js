import React , {useContext, useState} from "react";
import { Link } from "react-router-dom";
import MyContext from '../Context/MyContext.js';

const ButtonMain = ()=>{
    const context  = useContext(MyContext);

    return(
        <React.Fragment>
            <div className="buttonMain-join" >
                <Link to='/form' style={context.state.base.header.pos === 'night' 
                    ? {color : '#fff'} 
                    : {color : '#000000'}}>ثبت نام
                </Link>
            </div>
            <div className="buttonMain-logIn">
                <Link to='/form' style={context.state.base.header.pos === 'night' 
                    ? {color : '#fff'} 
                    : {color : '#000000'}}>ورود
                </Link>
            </div>
        </React.Fragment>

    )
}


export default ButtonMain; 