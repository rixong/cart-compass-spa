import React from 'react';
import {useDispatch} from 'react-redux';

const App: React.FC = () => {
  
  const dispatch = useDispatch()

  
  return (
    <div className="App">
      <h1>Hello App</h1>
    </div>
  );
}

export default App;
