import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { RootState } from '../store';
import { doAutoLogin,  } from '../store/system/actions';
import { doAddCategories} from '../store/categories/actions';

import Navbar from './Navbar';
import Login from './Login';
import Spinner from './Spinner';
import Footer from './Footer';
import SplitPanels from './SplitPanels'
import ListHome from './ListHome'

const App: React.FC = () => {

  const dispatch = useDispatch();

  const selectSystem = (state: RootState) => state.system;
  const system = useSelector(selectSystem)

  useEffect(() => {
    // console.log(localStorage.getItem('token'), system.curUser.id);
    console.log('From App');
    
    if (localStorage.getItem('token') && !system.curUser.id) {
      dispatch(doAutoLogin());
    }
  }, [dispatch, system.curUser.id]);

  return (
    <Router>
      {!system.curUser.id && !localStorage.getItem('token') ? <Login /> :
        <div className="container shadow bg-dark">
          <Navbar />
          {/* {!system.curUser.id || system.loading ? */}
          {system.loading ?
            <Spinner />
            :
            <Switch>
              <Route exact path="/" component={ListHome}></Route>
              <SplitPanels />
            </Switch>
          }
          <Footer />
        </div>
      }
    </Router>
  )
}

export default App