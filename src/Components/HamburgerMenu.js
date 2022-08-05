import React, { useContext } from 'react';
import MyContext from '../Context/MyContext';




const HamburgerMenu = () => {
    const context = useContext(MyContext) ;
    
    return(
        <React.Fragment>
            <div className='hamburger-menu' onClick={() => {
                    context.setState({
                        base : {...context.state.base , header: {...context.state.base.header , hamburgerMenuToggle : true} },
                    })
                }} accessKey="close" >
            
                <label for="check" className='menu' >
                    <div className='menu-line menu-line1' style={context.state.base.header.pos === 'night' ? {backgroundColor : '#fff'} : {backgroundColor : '#000000'}}></div>
                    <div className='menu-line menu-line2' style={context.state.base.header.pos === 'night' ? {backgroundColor : '#fff'} : {backgroundColor : '#000000'}}></div>
                    <div className='menu-line menu-line3' style={context.state.base.header.pos === 'night' ? {backgroundColor : '#fff'} : {backgroundColor : '#000000'}}></div>
                </label>

            </div>
        </React.Fragment>

    )
    

}


export default HamburgerMenu;