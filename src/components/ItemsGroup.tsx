import React from 'react';
// import { connect } from 'react-redux';
import Item from './Item' ;
import {ICompleteItem} from '../store/lists/types';

interface ListGroupProps {
  categoryName: string,
  items: ICompleteItem[],
}

const ListGroup: React.FC<ListGroupProps> = ({categoryName, items}) => {
  return (
    <div className="mb-3" >
      <div className="text-light bg-dark h5 pl-4  mb-1 rounded">{categoryName}</div>
      <ul className="list-group">
        {items.map(item => <Item item={item} key={item.id} />)}
      </ul>
    </div>
  )
}
export default ListGroup;