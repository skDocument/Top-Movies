import React, { useContext } from "react";
import { Link } from "react-router-dom";
import SiteLogo from "../Components/SiteLogo";
import SocialMedia from "../Components/SocialMedia";
import MyContext from '../Context/MyContext';

const Footer = ()=>{
    const context = useContext(MyContext)

    return(
        <footer >
            <div className="footer" style={context.state.base.header.pos === 'night' 
                ? {backgroundColor : '#121212'} 
                : {backgroundColor : '#b8b8b8'}}>

                <div className="footer-menu-socialMedia">
                    <h3 className="socialMedia-title" style={context.state.base.header.pos === 'night' 
                        ? {color : '#fff'} 
                        : { color : 'black'}}>ما را در شبکه های اجتماعی دنبال کنید 
                    </h3>

                    <SocialMedia />
                </div>

                <div className={ context.state.base.header.pos === 'night' 
                    ? "footer-menu-conectUs " 
                    : 'footer-menu-conectUs-day'}>

                    <h3 className="conectUs-title" >راه های ارتباطی با ما</h3>
                    <ul >
                        <li ><a href="#"><i />تماس با ما</a></li>
                        <li><a  href="#"><i />درباره ما</a></li>
                        <li><a  href="#"><i />همکاری با ما</a></li>
                        <li><Link  to="/programmerInfo"><i />درباره برنامه نویس</Link></li>
                    </ul>
                </div>

                <div className="footer-brand">
                    <SiteLogo />
                    <div className="copy-right">
                        <p  style={context.state.base.header.pos === 'night' 
                            ? {color : '#fff'} 
                            : { color : 'black'}}>

                            &copy;کپی رایت. تمام حقوق این سایت متعلق به تاپ مووی است
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}


export default Footer;