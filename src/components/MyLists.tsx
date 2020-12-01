/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { XCircleFillIcon } from '@primer/octicons-react'

import { RootState } from '../store';
import { doSetCurrentList, addNotification, clearNotification} from '../store/system/actions'
import { doCreateNewList, doRemoveList } from '../store/lists/actions';
import { IList } from '../store/lists/types';

const MyLists = () => {

  const dispatch = useDispatch();

  const selectSystem = (state: RootState) => state.system;
  const {curUser} = useSelector(selectSystem);

  const selectLists = (state: RootState) => state.lists;
  const {lists} = useSelector(selectLists)

  const sortedLists: IList[] = [...lists].sort((a, b) => b.dateCreated.localeCompare(a.dateCreated));
  const [queryTerm, setQueryTerm] = useState<string>('');

  const onHandleChange = (e: any) => {
    setQueryTerm(e.target.value)
  }

  const onHandleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!queryTerm.trim()) {
      addNotification('Enter a name for the list.')
    } else {
      dispatch(doCreateNewList(queryTerm));
      setQueryTerm('')
    }
  }

  const onSelectList = (listId: string) => {
    clearNotification();
    dispatch(doSetCurrentList(listId));
  }

  const onClickDeleteList = (e :React.FormEvent, id: string) => {
    e.stopPropagation();
    if (id === curUser.currentList) {
      addNotification('You can not delete the current list. Select another before deleting this list.');
    } else {
      dispatch(doRemoveList(id));
    }
  }

  const defaultClass = "list-group-item d-flex justify-content-between pl-0 mb-2 rounded shadow"

  return (
    <React.Fragment>

      <ul className="list-group">
        {sortedLists.map(list =>
          (<li
            className={`${defaultClass} ${list._id === curUser.currentList ? 'bg-dark text-info' : 'text-primary'}`}
            key={list._id}
            role="button"
            onClick={() => onSelectList(list._id)}
          >
            <div className="col-10">
              <strong>{list.name}</strong> - {moment(list.dateCreated).format('ddd, MMM Do')}
            </div>
            {list._id === curUser.currentList ? null :
              <div className="col-2">
                <button
                  type="button"
                  className="close"
                  aria-label="Delete"
                  onClick={(e) => onClickDeleteList(e, list._id)}
                >
                  <XCircleFillIcon size={24} />
                </button>
              </div>
            }
          </li>)
        )}
      </ul>

      <hr></hr>

      {/* <div className="h4 text-center">Make a new list</div> */}
      <form>
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
          className="btn btn-outline-primary btn-lg w-100 mt-3"
          onClick={(e) => onHandleSubmit(e)}
        >
          Make a new list
        </button>
      </form>

    </React.Fragment>
  )
}

export default MyLists;