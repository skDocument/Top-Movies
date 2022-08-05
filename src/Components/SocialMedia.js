import React, { useContext } from "react";
import MyContext from '../Context/MyContext';


const SocialMedia = ()=>{
    const context = useContext(MyContext)
    return(
        <ul className={ context.state.base.header.pos === 'night' 
            ? "socialMedia-content " 
            : 'socialMedia-content-day'} >
            <li>
                <a href="#"  >
                    <i className="fab fa-instagram socialLogo"/><span>اینستاگرام</span>
                </a>
            </li>

            <li>
                <a href="#"  >
                    <i class="fab fa-facebook-square socialLogo"/><span>فیسبوک</span>
                </a>
            </li>

            <li>
                <a href="#"  >
                    <i class="fab fa-youtube socialLogo" /><span>یوتیوب</span>
                </a>
            </li>

            <li>
                <a href="#"  >
                    <i class="fab fa-telegram socialLogo"/><span>تلگرام</span>
                </a>
            </li>
        </ul>
    )
}


export default SocialMedia;