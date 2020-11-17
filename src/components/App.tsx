import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {doLogin} from '../store/system/actions'
import Login from './Login'

const App: React.FC = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    function login() {
      dispatch(doLogin({email: 'wally@gmail.com', password:'1234'}))
      // dispatch(doLogin({name: 'Wally', email: 'wally@gmail.com', password:'1234', passwordConfirmation: '1234'}))
      // console.log("here");
    }
    login();

  }, [dispatch])


  return (
    <div className="App">
      <h1>Hello App</h1>
      <Login/>
    </div>
  );
}

export default App;
