import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { XCircleFillIcon } from '@primer/octicons-react'

import {RootState} from '../store';
// import { doCreateNewList, doRemoveList, doChangeCurrentList } from '../store/lists/actions';
import { doCreateNewList } from '../store/lists/actions';
import { addNotification, clearNotification} from '../store/system/actions';

const MyLists = () => {

  const dispatch = useDispatch();

  const selectSystem = (state: RootState) => state.system;
  const system = useSelector(selectSystem);
  
  const selectLists = (state: RootState) => state.lists;
  const lists = useSelector(selectLists)

  // useEffect(()=> {
  //   console.log('Effect');
    
  //   dispatch(doCreateNewList('Target'))
  // }, [dispatch])

  // const sortedLists = [...lists].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  // const [queryTerm, setQueryTerm] = useState('');

  // const onHandleChange = (e: React.FormEvent<HTMLInputElement>) => {
  //   setQueryTerm(e.target.value)
  // }

  // const onHandleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   if (!queryTerm.trim()) {
  //     addNotification('Enter a name for the list.')
  //   } else {
  //     doCreateNewList(queryTerm)
  //     setQueryTerm('')
  //   }
  // }

  // const onSelectList = (listId) => {
  //   clearNotification()
  //   doChangeCurrentList(listId)
  // }

  // const onClickDeleteList = (e :React.FormEvent, id) => {
  //   e.stopPropagation()
  //   if (id === curUser.currentList) {
  //     addNotification('You can not delete current list. Select another before deleting this list.')
  //   } else {
  //     doRemoveList(id)
  //   }
  // }

  // const defaultClass = "list-group-item d-flex justify-content-between pl-0 mb-2 rounded shadow"

  return (
    <React.Fragment>

<h3>MyLists</h3>
    </React.Fragment>
  )
}

export default MyLists;