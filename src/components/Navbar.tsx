import React from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {doLogoutUser} from '../store/system/actions';
import { RootState } from '../store';

const Navbar = () => {
  const selectSystem = (state: RootState) => state.system;
  const system = useSelector(selectSystem);

  const dispatch =  useDispatch()
  const onLogout = async () => {
    await dispatch(doLogoutUser());
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark pt-2">
      <Link className="nav-link" to="/">
        <div className="h2 text-warning" >
          Cart Compass
          <img src='/shopping-cart-logo-lg.png' alt="shopping cart" style={{ width: "50px" }}></img>
        </div></Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
            <Link className="nav-link" to="/add">Add Items</Link>
          </li>
          <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
            <Link className="nav-link" to="/mylists">Lists</Link>
          </li>
          <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
            <Link className="nav-link" to="/sort">Categories</Link>
          </li>
          <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
            <Link className="nav-link" to="/edit">Items</Link>
          </li>
          <li className="nav-item ml-5">
        <div className="nav-link" role='button' onClick={onLogout}>Logout {system.curUser.name}</div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar