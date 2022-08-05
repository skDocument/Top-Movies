import React from "react";
import ButtonMain from "../Components/ButtonMain";
import HamburgerMenu from "../Components/HamburgerMenu";
import NavList from "../Components/NavList";
import NightAndDaytoggle from "../Components/NightAndDayToggle";
import MyContext from '../Context/MyContext';
import UserState from "../Components/UserState";
import SearchBox from "../Components/SearchBox";

class Navbar extends React.Component {
    static contextType = MyContext;
    render(){
        return(
            <nav >
                <div className="focusNav" style={this.context.state.base.header.hamburgerMenuToggle === true 
                    ? {opacity : .7 , zIndex : 14} 
                    : {opacity : -1 , zIndex : -5}}>  
                </div>
                
                <HamburgerMenu />
                
                <div className='navigation'  style={this.context.state.base.header.hamburgerMenuToggle === true 
                    ? {right : '0px'} 
                    : {right : '-100vw'}} >
                    
                    <div className="navigation-closeBtn" onClick={()=> {
                        this.context.setState({
                            base : {...this.context.state.base , header : {...this.context.state.base.header , hamburgerMenuToggle : false}},
                        })
                    }}>
                        <div className="closeline line1"></div>
                        <div className="closeline line2"></div>
                    </div>
                    <div className="buttonMain">
                        <ButtonMain />
                    </div> 
                    <div className="navigation-options  ">
                        <div className="searchWrapper ">
                            <SearchBox />
                        </div>
    
                        <div className="userAcount ">
                            <UserState />
                        </div>
                        <div className="nightAndDay-toggle ">
                            <NightAndDaytoggle />
                        </div>
                    </div>
                    
                    
                    <div className="navigation-navList">
                        <NavList />
                    </div>
    
                </div>
            </nav>
        )
    }
    
}


export default Navbar;