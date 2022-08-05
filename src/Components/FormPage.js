import React, { Component } from "react";
import axios from 'axios';
import MyContext from '../Context/MyContext';
import LoginAvatar from '../Adds/img/login-avatar.png';
class FormPage extends Component {

    static contextType = MyContext;
    onSubimt = (e)=>{
        e.preventDefault();
        let email = document.querySelector('.sign-email').value
        let name = document.querySelector('.sign-username').value
        let password = document.querySelector('.sign-password').value

        if( (email || name || password) === '' ){
            return false;
        }

        const formdata = new FormData();

        formdata.append('email' , email)
        formdata.append('name' , name)
        formdata.append('password' , password)

        axios.post('https://moviesapi.ir/api/v1/register' , formdata).then(res => {
            alert('با موفقیت ثبت نام شدید ')
        }).catch(res => {
            alert('ثبت نام ناموفق بود')
        })
        
    }

    onLogin = (e)=> {
        e.preventDefault();
        let username = document.querySelector('.login-user').value;
        let password = document.querySelector('.login-password').value;

        const formdata = new FormData();

        formdata.append('username' , username)
        
        formdata.append('password' , password)
        formdata.append('grant_type' , 'password')

        axios.post('https://moviesapi.ir/oauth/token' , formdata).then(res => {
            alert('با موفقیت وارد شدید')
            console.log(res)
            localStorage.setItem('access' , res.data.access_token)
            window.location.reload()
        }).catch(res => {
            alert('وارد نشدید')
        })

    }


    render(){
        return (
            <>
                <div className="form row" style={this.context.state.base.header.pos === 'night' 
                    ? {backgroundColor : '#222327'} 
                    : {backgroundColor : '#EDEFF4'}}>

                    <div className="form-login col-12 col-md-6">
                        <div className="form-login-wrapper" style={this.context.state.base.header.pos === 'night' 
                            ? {backgroundColor : '#121212'} 
                            : {backgroundColor : '#FFFFFF'}}>

                            <h4 className="form-login-title" style={this.context.state.base.header.pos === 'night' 
                                ? {color : '#fff'} 
                                : {color : '#262626'}} >ثبت نام کن
                            </h4>

                            <div className="form-login-inputs">
                                <input type='text' className="inp-login sign-username" placeholder="نام کاربری" />
                                <input type='email' className="inp-login sign-email" placeholder="ایمیل" />
                                <input type='password' className="inp-login sign-password" placeholder="رمز عبور" />
                            </div>

                            <button className="form-login-buttons" onClick={this.onSubimt}>
                                ثبت نام 
                            </button>
                        </div>
                    </div>

                    <div className="form-login col-12 col-md-6">
                        <div className="form-login-wrapper" style={this.context.state.base.header.pos === 'night' 
                            ? {backgroundColor : '#121212'} 
                            : {backgroundColor : '#FFFFFF'}}>
                            <h4 className="form-login-title" style={this.context.state.base.header.pos === 'night' 
                                ? {color : '#fff'} 
                                : {color : '#262626'}}>وارد شو
                            </h4>

                            <div className="form-login-inputs">
                                <input type='text' className="inp-login login-user" placeholder="نام کاربری" />
                                <input type='password' className="inp-login login-password" placeholder="رمز عبور" />
                            </div>

                            <button className="form-login-buttons" onClick={this.onLogin}>
                                ورود
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}





export default FormPage;