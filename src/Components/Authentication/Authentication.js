import { useState } from "react";
import Login from "./Login";
import classes from './Authentication.module.css';
import { useDispatch } from "react-redux";
import ForgotPassword from "./ForgotPassword";
import SignUp from "./SignUp";
import { authAction } from "../store/auth-reducer";
import { useHistory } from "react-router-dom";


const Authentication = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [isForgot, setIsForgot] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();



    const SignUpHandler = (email, password) => {
        fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD61trb_TQ27ZLrT4ybyyFKWkht-DaUa0o',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true
                    }),
                    headers:{
                        "Content-Type": "application/json",
                    }
                }
            )
            .then((res) => {
                if(res.ok){
                  return res.json()
                }else{
                  return res.json().then((data) => {
                    const errormsg = data.error.message;
                    throw new Error(errormsg)
                  })
                }
              })
              .then((data) => {
                console.log('successfully created account');
                console.log(data);
              })
              .catch((err) => {
                alert(err.message);
              })
        }

    const LoginHandler = (email, password) => {
            fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD61trb_TQ27ZLrT4ybyyFKWkht-DaUa0o',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true
                    }),
                    headers:{
                        "Content-Type": "application/json",
                    }
                }
            )
            .then((res) => {
                if(res.ok){
                  return res.json()
                }else{
                  return res.json().then((data) => {
                    const errormsg = data.error.message;
                    throw new Error(errormsg)
                  })
                }
              })
              .then((data) => {
                const loginObj={idToken: data.idToken, email: data.email}
                dispatch(authAction.login(loginObj))
                console.log(data);
                console.log('successfully loggedIn');
                history.replace('/home');
              })
              .catch((err) => {
                alert(err.message);
              })     
        };

        const forgotPasswordHandler = (email) => {
          fetch(
              'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBNKcwJ85YxV00sJT8V4pSH2dMBTCWv77k',
              {
                  method: 'POST',
                  body: JSON.stringify({
                      email: email,
                      requestType: 'PASSWORD_RESET'
                  }),
                  headers:{
                      "Content-Type": "application/json",
                  }
              }
          )
          .then((res) => {
              if(res.ok){
                return res.json()
              }else{
                return res.json().then((data) => {
                  const errormsg = data.error.message;
                  throw new Error(errormsg)
                })
              }
            })
            .then((data) => {
              console.log(data);
            })
            .catch((err) => {
              alert(err.message);
            })     
      };


        const onClickSignUpHandler = () => {
            setIsLogin(true)
        };

        const onClickLoginHandler = () => {
            setIsLogin(false)
        };
        const onClickPasswordHandler = () => {
          setIsForgot(true)
        }

    return (
        <div className={classes.auth}>
          <div >
          {!isLogin &&<SignUp onSignUp={SignUpHandler} />}
            {isLogin && <Login onLogin={LoginHandler} />}
            {!isLogin && (
                <button 
                    className={classes.changebtn}
                    onClick={onClickSignUpHandler}>
                    Have an account? Login
                </button>
            )}
            </div>
            <div className={classes.forgot}>
            {isForgot && <ForgotPassword  onForgot={forgotPasswordHandler}/> }
            {isLogin && (
              <button 
                className={classes.button}
                onClick={onClickPasswordHandler}>
                Forgot password ?  
              </button>
            )}
            </div>
            <br />
            <br />
            <div>
            {isLogin && (
                <button 
                    className={classes.changebtn}
                    onClick={onClickLoginHandler}>
                    Don't have an account? Sign up
                </button>
            )}
            </div>
        </div>
    )
};

export default Authentication;