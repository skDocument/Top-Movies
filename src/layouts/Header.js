import React, { useContext } from 'react';
import ButtonMain from '../Components/ButtonMain';
import SiteLogo from '../Components/SiteLogo';
import MyContext from '../Context/MyContext';
const Header = ()=>{

    const context = useContext(MyContext)
    return(
        <React.Fragment>
            <header>

                <div className="header" style={context.state.base.header.pos === 'night' 
                    ? {backgroundColor : '#121212'} 
                    : {backgroundColor : '#b8b8b8'}}>
                    
                    <div className="buttonMain"  >
                        <ButtonMain />
                    </div> 
                    <SiteLogo />
                </div>

            </header>
        </React.Fragment>
    )
}


export default Header;