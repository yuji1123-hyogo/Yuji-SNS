import React, { useContext, useReducer, useRef } from 'react'
import "./Login.css"
import axios from 'axios';
import { AuthContext } from '../../states/AuthContext';
import { Link } from 'react-router-dom';

function Login() {
    const { dummystate, setState ,user,dispatch} = useContext(AuthContext)
    //ユーザーごとの画面表示に向けて
    //やること
    //①パスワード、emailの値を監視、取得　useref
    //②パスワードとemailでユーザーフェッチ　axios

    //aciton.type(フェッチ成功の可否）に応じてuseReducerでユーザー状態に対する処理を決定する
        //成功⇒state.ユーザー状態の更新,失敗⇒state.エラー状態の更新　reducerを定義
    //dispatchでreducer関数を実行。Emailとパスワードでユーザーフェッチングを試みる→stateを更新　
        //try{フェッチング;reducer(action.type=成功);}catch(reducer(action.type=失敗);)
    //③contextでユーザー状態を共有
     
    //EmailとパスワードをuseRefで監視
    const email = useRef();
    const password = useRef();
    

    // // reducer関数とuseReducerの定義
    // const initialState={
    //         user:false,
    //         error:false
    //      }


    // const reducer=(state,action)=>{
    //     switch(action.type){
    //         case "SUCCESS":
    //             return {
    //                 //reducer関数のreturn部分はstateの更新方法を記述
    //                 user:action.payload ,
    //                 error:false
    //             };
    //         case "ERROR":
    //             return {
    //                 user:false,
    //                 error:action.payload};
    //         default:
    //             return state;
    //          }
    //         }
            

    // const [state,dispatch]=useReducer(reducer,initialState);

    //！！！！！リロードするとディスパッチ前に戻るためuserがnullに戻ってしまう!!!!!!!
   ///ローカルストレージとuseEffectを組み合わせることによって状態を永続化できる!!!!
   //userstateが変わったタイミングでローカルストレージに保存
   //初期値をローカルストレージから取り出せばリロードを行っても状態を継続できる
   
   
  
    //fetchingとdispatchを行う関数logincallの定義
    const loginCall=async({email,password})=>{
        const email_val = email.current.value
        const password_val = password.current.value
        console.log(email_val )
        console.log(password_val  )
        try{
            const response =await axios.post("/auth/login",{email:email_val,password:password_val})
            const user = response.data
            //dispatchはstate引数を与えなくても勝手に入っていく。actionオブジェクトだけ書けばよい
            dispatch({type:"SUCCESS",payload:user})
            window.alert(`${user.username}がログインしました`)
        }catch(e){
            dispatch({type:"ERROR",payload:e})
        }
    }
    
    //logincall実行部分
    const submitHundler=(e)=>{
        e.preventDefault();
        loginCall({email,password})
    }



  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className='loginLogo'>SNS</h3>
                <span className="loginDesc">ようこそ</span>
              
            </div>
            <div className="loginRight">
                <form onSubmit={submitHundler} action="" className="loginBox">
                    <p className="loginMsg">ログインはこちら</p>
                    {/* email,passwordという名前でinput属性を監視 */}
                    <input   ref={email} type="text" className="loginInput" placeholder='Eメール'/>
                    <input  ref={password} type="text" className="loginInput" placeholder='パスワード'/>
                    <button className="loginButton">ログイン</button>
                    <span className="loginForgot">パスワードを忘れた方へ</span>
                    <Link to="/register" style={{ textDecoration: 'none', display: 'flex', width: '100%' }}  >
                      <button className="loginRegisterButton">新規登録</button>
                    </Link>
                    
                </form >
            </div>
        </div>
    </div>
  )
}

export default Login