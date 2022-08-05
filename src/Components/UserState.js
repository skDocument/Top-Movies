import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import DefaultAvatar from '../Adds/img/default-avatar.png';
import loginAvatar from '../Adds/img/login-avatar.png';
import MyContext from '../Context/MyContext';

class UserState extends Component{
    static contextType = MyContext;
    state = {
        log : {
            showneasted : false,
            userState : 'کاربر مهمان',
            avatar : DefaultAvatar,
        } 

    }
    showUserAcountMenu = ()=> {
        if(this.state.log.showneasted === false){
            this.setState({
                log : {...this.state.log, showneasted : true}
            })
        }
        else{
            this.setState({
                log : {...this.state.log, showneasted : false}
            })
        }
    }
    componentDidMount(){
        if(localStorage.getItem('access'))
        {
            this.setState({
                log : {...this.state.log, userState : 'لاگین شده' , avatar : loginAvatar}
            })
            
        }
        else{
             this.setState({
                log : {...this.state.log, userState : 'کاربر مهمان' , avatar : DefaultAvatar}
            })
        }
    }
    logOutUser = ()=> {
        localStorage.removeItem('access')
        window.location.reload()
    }

    render (){

        
        return(
            <>
                <img src={this.state.log.avatar }  className="userAcount-avatar"/>
    
                <ul className="useracount-ul">
                    <li onClick={this.showUserAcountMenu} className="userAcount-username">
                        {this.state.log.userState}
                        <FontAwesomeIcon icon={faAngleDown} className='userAcount-arrow'/> 

                        <ul className="nested-usrname">

                            <li style={this.state.log.showneasted === false 
                                ? {height : '0px'} 
                                : {height : '30px' }}>پرفایل
                            </li>

                            <li onClick={this.logOutUser} style={this.state.log.showneasted === false 
                                ? {height : '0px'} 
                                : {height : '30px' , borderTop: '1px solid #121212' }}>خروج
                            </li>
                            
                        </ul>
                    </li>

                </ul>

            </>
        )
    }
}

export default UserState;