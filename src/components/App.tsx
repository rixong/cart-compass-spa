import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {doLogin} from '../store/system/actions'

const App: React.FC = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    function login() {
      dispatch(doLogin({email: 'george@gmail.com', password:'1234'}))
      // console.log("here");
    }
    login();

  }, [dispatch])


  return (
    <div className="App">
      <h1>Hello App</h1>
    </div>
  );
}

export default App;
