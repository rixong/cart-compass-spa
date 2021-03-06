import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../store';
import moment from 'moment';
import { XCircleIcon, CheckCircleIcon } from '@primer/octicons-react'

import { doSetCurrentList, addNotification, clearNotification } from '../store/system/actions'
import { doRemoveList } from '../store/lists/actions';
import { IList } from '../store/lists/types';

interface MyListProps {
  list: IList
}

const MyList: React.FC<MyListProps> = ({ list }) => {
  const dispatch = useDispatch();

  const selectSystem = (state: RootState) => state.system;
  const { curUser } = useSelector(selectSystem);

  const [emailInput, setEmailInput] = useState<string>('');

  const onHandleChange = (e: any) => {
    setEmailInput(e.target.value)
  }

  const onSelectList = (listId: string) => {
    clearNotification();
    if (listId !== curUser.currentList) {
      dispatch(doSetCurrentList(listId));
    }
  }

  const onClickDeleteList = (e: React.FormEvent, id: string) => {
    e.stopPropagation();
    if (id === curUser.currentList) {
      addNotification('You can not delete the current list. Select another before deleting this list.');
    } else {
      dispatch(doRemoveList(id));
    }
  }

  const defaultClass = "list-group-item d-flex justify-content-between pl-0 mb-2 rounded"

  return (
    <li
      className={`${defaultClass} ${list._id === curUser.currentList ? 'bg-dark text-info' : 'text-primary'}`}
      key={list._id}
      role="button"
      onClick={() => onSelectList(list._id)}
    >
      <div className="col-10">
        <strong>{list.name}</strong> - {moment(list.dateCreated).format('ddd, MMM D')}
      </div>
      <div className="col-2">
        {list._id === curUser.currentList ?
          <CheckCircleIcon size={24} /> :
          <button
            type="button"
            className="close"
            aria-label="Delete"
            onClick={(e) => onClickDeleteList(e, list._id)}
          >
            <XCircleIcon size={24} />
          </button>
        }
      </div>
      <div className="input-group mb-3">
        <input 
          type="text" 
          className="form-control" 
          placeholder="email" 
          aria-label="email" 
          aria-describedby="basic-addon2"
          value={emailInput}
          onChange={(e) => onHandleChange(e)}
        >
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button">Button</button>
          </div>
        </input>
      </div>
    </li>
  )
}

export default MyList