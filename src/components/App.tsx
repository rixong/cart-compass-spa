import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import Login from './Login'
import { doAutoLogin } from '../store/system/actions';


const App: React.FC = () => {
  
  const dispatch = useDispatch();
  
  const selectSystem = (state: RootState) => state.system;
  const system = useSelector(selectSystem)

  useEffect(() => {
    
    if (localStorage.getItem('token') && !system.curUser.id) {
      console.log('here');
      dispatch(doAutoLogin());
    }
  }, [dispatch, system.curUser.id ]);

  
  return (
    <div className="App">
      <h1>Hello App</h1>
  <h3>Hi, {system.curUser.name}</h3>
      <Login/>
    </div>
  );
}

export default App;
