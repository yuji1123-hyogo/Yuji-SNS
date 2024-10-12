import React, { useRef } from 'react'
import "./Register.css"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
function Register() {
    const usernameRef=useRef();
    const emailRef=useRef();
    const passwordRef=useRef();
    const passwordConfirmRef=useRef();
    const navigate = useNavigate();


  const registerCall=async (e)=>{
    
    e.preventDefault();
    if(passwordRef.current.value !== passwordConfirmRef.current.value){
        window.alert("パスワード/確認用パスワードが異なります")
        return;
    }else{
        const user ={
            username:usernameRef.current.value,
            email:emailRef.current.value,
            password:passwordRef.current.value,
        }
        try{
           await axios.post("/auth/register",user)
           window.alert("登録が完了しました！");
           navigate("/login")
        }catch(e){
            console.log(e)
        }
    }
  }

  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className='loginLogo'>SNS</h3>
                <span className="loginDesc">ようこそ</span>
            </div>
            <div className="loginRight">
                <form onSubmit={registerCall} action="" className="loginBox">
                    <p  className="loginMsg">新規登録はこちら</p>
                    <input ref={usernameRef} type="text" className="loginInput" placeholder='ユーザー名'/>
                    <input ref={emailRef} type="email" className="loginInput" placeholder='Eメール'/>
                    <input ref={passwordRef} type="password" className="loginInput" placeholder='パスワード'/>
                    <input ref={passwordConfirmRef} type="password" className="loginInput" placeholder='確認用パスワード'/>
                    <button className="loginButton" type="submit">サインアップ</button>
                    <Link to="/login" style={{ textDecoration: 'none', display: 'flex', width: '100%' }} >
                    <button className="loginRegisterButton">ログイン</button>
                    </Link>
                    
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register