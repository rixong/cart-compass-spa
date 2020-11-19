import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';

// import CurrentList from './CurrentList.txt';
import { doCreateNewList, doRemoveList } from '../store/lists/actions';
import { doSetCurrentList} from '../store/system/actions';

const ListHome = () => {

  const dispatch = useDispatch();
  // const selectSystem = (state: RootState) => state.system;
  // const system = useSelector(selectSystem)

  // useEffect(() => {
  //   dispatch(doCreateNewList('Costco'))
  // }, [dispatch])

  // useEffect(() => {
  //   dispatch(doRemoveList('5fb6783019078568b9d5d89a'))
  // }, [dispatch])

  // useEffect(() => {
  //   dispatch(doSetCurrentList('5fb684eb86b05273f7d1a817'))
  //   //dispatch(doSetCurrentList('5fb60a3e00fd686750f54b1a'))
  // }, [dispatch])


  return (
    <div className="container bg-light rounded list-home">
      <h3>Temp list home</h3>
      {/* <CurrentList/> */}
    </div>
  )
}
export default ListHome;