import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';

// import CurrentList from './CurrentList.txt';
import { doCreateNewList } from '../store/lists/actions';
const ListHome = () => {

  const dispatch = useDispatch();
  // const selectSystem = (state: RootState) => state.system;
  // const system = useSelector(selectSystem)

  useEffect(() => {
    dispatch(doCreateNewList('Pizza'))
  }, [dispatch])


  return (
    <div className="container bg-light rounded list-home">
      <h3>Temp list home</h3>
      {/* <CurrentList/> */}
    </div>
  )
}
export default ListHome;