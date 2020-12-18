import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {RootState} from '../store';
import { ILogin } from '../store/system/types';

// import { doLogin, clearNotification, addNotification } from '../store/system/actions'
import { doLogin, clearNotification, addNotification } from '../store/system/actions'

import Alert from './Alert';
import Spinner from './Spinner';

const Login: React.FC = () => {

  const dispatch = useDispatch();

  const selectSystem = (state: RootState) => state.system;
  const system = useSelector(selectSystem)

  const inputTextDefault: ILogin = { name: '', email: '', password: '', passwordConfirmation: '' }

  const [passwordError, setPasswordError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [isNewUser, setIsNewUser] = useState(false);
  const [inputText, setInputText] = useState(inputTextDefault)

  const message = [
    "Don't have an account?",
    "Already have an account?"
  ]

  const onHandleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPasswordError('');
    setEmailError('');
    setInputText({ ...inputText, [e.currentTarget.name]: e.currentTarget.value })
  }

  const onHandleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const expression = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let validEmail = expression.test(inputText.email.toLowerCase());
    if (!validEmail) {
      setEmailError('Please enter a valid email')
    }
    else if (inputText.password.trim() === '') {
      setPasswordError('Please enter a valid password')
    } else if (inputText.name === '' && isNewUser) {
      dispatch(addNotification('Name required'))
    }
    else {
      dispatch(doLogin(inputText))
      // setInputText(inputTextDefault)
      return <Redirect to="/" />
    }
  }

  return (
    <div className="login-box bg-light mt-4 shadow-lg rounded">
      <div className="row mt-4 justify-content-center" style={{ height: "100px" }}>
        <img src="shopping-cart-logo-lg.png" alt="cart" className="mt-5" style={{ width: "100px", height: "100px" }}></img>
      </div>
      <div className="display-3 text-center text-warning pt-5">Cart Compass</div>
      <div className="h3 text-center text-dark">Shop faster, shop smarter</div>

      <form>
        <div className="form-group login-form">

          <input
            type="email"
            name="email"
            className={
              emailError
                ? "form-control form-control-lg is-invalid"
                : "form-control form-control-lg"
            }
            aria-describedby="emailHelp"
            placeholder="Email"
            value={inputText.email}
            onChange={onHandleChange}
            onFocus={() => dispatch(clearNotification())}
          ></input>
          <div
            className={
              emailError ? "inline-errormsg text-danger" : "hidden"
            }
          >
            {emailError}
          </div>


          <input
            type="password"
            name="password"
            className={
              passwordError
                ? "form-control form-control-lg mt-3 is-invalid"
                : "form-control form-control-lg mt-3"
            }
            aria-describedby="passwordHelp"
            placeholder="Password"
            value={inputText.password}
            onChange={onHandleChange}
            onFocus={() => dispatch(clearNotification())}
          ></input>

          <div
            className={
              passwordError ? "inline-errormsg text-danger" : "hidden"
            }
          >
            {passwordError}
          </div>


          {isNewUser ?
            <div>
              <input
                type="password"
                name="passwordConfirmation"
                className={
                  passwordError
                    ? "form-control form-control-lg mt-3 is-invalid"
                    : "form-control form-control-lg mt-3"
                }
                aria-describedby="passwordHelp"
                placeholder="Confirm password"
                value={inputText.passwordConfirmation}
                onChange={onHandleChange}
                onFocus={() => dispatch(clearNotification())}
              ></input>

              <input
                type="text"
                name="name"
                className="form-control form-control-lg mt-3"
                aria-describedby="your name"
                placeholder="Your name"
                value={inputText.name}
                onChange={onHandleChange}
                onFocus={() => dispatch(clearNotification())}
              ></input>
            </div>
            : null
          }
          {
            system.notification.isError ? 
            <Alert/> :
            <button className="btn btn-primary btn-lg mt-3 w-100" type="submit" onClick={onHandleSubmit}>Continue</button>
          }
        </div>
      </form>
          { system.loading ? <Spinner/> : null }

      <div className="login-switch d-block">
        <p className="text-center">{isNewUser ? message[1] : message[0]}</p>
        <div 
          className="text-center text-primary h5" 
          onClick={() => {
            setIsNewUser(!isNewUser);
            setInputText((prevState) => ({...prevState, passwordConfirmation: ''}));
          }} 
          role="button">
          {!isNewUser ? 'Create account' : 'Login'}
        </div>
      </div>


    </div>
  )
}

export default Login