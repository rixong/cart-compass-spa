/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { XCircleIcon, CheckCircleIcon } from '@primer/octicons-react'

import { RootState } from '../store';
import { doSetCurrentList, addNotification, clearNotification } from '../store/system/actions'
import { doCreateNewList, doRemoveList } from '../store/lists/actions';
import { IList } from '../store/lists/types';
import MyList from './MyList';

const MyLists = () => {

  const dispatch = useDispatch();

  const selectSystem = (state: RootState) => state.system;
  const { curUser } = useSelector(selectSystem);

  const selectLists = (state: RootState) => state.lists;
  const { lists } = useSelector(selectLists)

  const myLists: IList[] = [...lists]
    .filter((list) => list.userId === curUser.id)
    .sort((a, b) => b.dateCreated.localeCompare(a.dateCreated));
  
  const sharedLists: IList[] = [...lists]
    .filter((list) => list.userId !== curUser.id)
    .sort((a, b) => b.dateCreated.localeCompare(a.dateCreated));
  
  const [queryTerm, setQueryTerm] = useState<string>('');

  const onHandleChange = (e: any) => {
    setQueryTerm(e.target.value)
  }

  const onHandleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!queryTerm.trim()) {
      addNotification('Enter a name for this list')
    } else {
      dispatch(doCreateNewList(queryTerm));
      setQueryTerm('')
    }
  }

  // const onSelectList = (listId: string) => {
  //   clearNotification();
  //   if (listId !== curUser.currentList) {
  //     dispatch(doSetCurrentList(listId));
  //   }
  // }

  // const onClickDeleteList = (e: React.FormEvent, id: string) => {
  //   e.stopPropagation();
  //   if (id === curUser.currentList) {
  //     addNotification('You can not delete the current list. Select another before deleting this list.');
  //   } else {
  //     dispatch(doRemoveList(id));
  //   }
  // }

  const defaultClass = "list-group-item d-flex justify-content-between pl-0 mb-2 rounded"

  return (
    <React.Fragment>
      <div className="header">Your lists</div>
      <div className="row justify-content-center">
        <ul className="list-group">
          {myLists.map(list =>
            <MyList list={list}/>
          )}
        </ul>
      </div>
      <div className="header">Shared lists</div>
      <ul className="list-group">
          {sharedLists.map(list =>
            <MyList list={list}/>
          )}
        </ul>
      <hr></hr>

      <div className="h4 text-center">Make a new list</div>
      <form className="w-100">
        <label className="ml-1 mb-1">List name</label>
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            id="list-input"
            placeholder="List name..."
            value={queryTerm}
            onChange={(e) => onHandleChange(e)}
            onFocus={() => clearNotification()}
            name="name"
            aria-label="Enter a list name"
          ></input>
        </div>
        <button
          className="btn btn-primary btn-lg w-100 rounded-pill mt-3"
          onClick={(e) => onHandleSubmit(e)}
        >
          ADD THE LIST
        </button>
      </form>

    </React.Fragment>
  )
}

export default MyLists;