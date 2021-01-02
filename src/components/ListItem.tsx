import React from 'react';
import {useDispatch} from 'react-redux';

import { ICompleteItem } from '../store/lists/types';
import {doChangeItemStatus} from '../store/lists/actions';

interface ListItemProps {
  item: ICompleteItem
}

const ListItem: React.FC<ListItemProps> = ({item}) => {

  const dispatch = useDispatch();

  const onHandleClick = () => {    
    dispatch(doChangeItemStatus(item.name));
  }

  // let name = masterList.find(el => item.item_id === el.id).name
  // name = name.split(' ').map(ele => ele.slice(0,1).toUpperCase() + ele.slice(1).toLowerCase()).join(' ');
  // console.log(name)

  const nameClassDefault = 'row'
  const nameClassFinal = item.isActive ?
    `${nameClassDefault} text-dark`
    : `${nameClassDefault} strike`

  return (
      <li className="list-group-item bg-light py-1 my-1 h6 shadow-sm" role="button" onClick={onHandleClick}>
        <div className={nameClassFinal}>
          <div className="col-8">{item.name}</div>
          <div className="col-4 border-left">{item.quantity}</div>
        </div>
      </li>
  )
}

export default ListItem;