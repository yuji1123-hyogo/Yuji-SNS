import { createContext, useEffect, useReducer, useState } from "react";

//流したい情報:stateとdispatch
const initialState={
    user: JSON.parse(localStorage.getItem("user")) || null,
    error:false
 }


const reducer=(state,action)=>{
    switch(action.type){
        case "SUCCESS":
            return {
                //reducer関数のreturn部分はstateの更新方法を記述
                user:action.payload ,
                error:false
            };
        case "ERROR":
            return {
                user:false,
                error:action.payload};
        default:
            return state;
         }
        }
    
// コンテキストを作成
export const AuthContext = createContext();

// プロバイダコンポーネント
export const AuthProvider = ({ children }) => {

    const [state,dispatch]=useReducer(reducer,initialState);
    const [dummystate, setState] = useState(0); // 0から始まるシンプルな状態

    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(state.user))
    },[state.user])

    return (
        <AuthContext.Provider value={{ dummystate, setState ,user:state.user,dispatch}}>
            {children}
        </AuthContext.Provider>
    );
};

