import React from 'react';
// import { connect } from 'react-redux';
// import ListItem from './ListItem';

interface ListGroupProps {
  categoryName: string,
  items: []
}

const ListGroup: React.FC<ListGroupProps> = props => {
  return (
    <div className="mb-3" >
      {/* <div className="text-light bg-dark h5 pl-4  mb-1 rounded">{categoryName}</div>
      <ul className="list-group">
        {items.map(item => <ListItem item={item} key={item.id} />)}
      </ul> */}
    </div>
  )
}
// const mapStateToProps = state => {
//   return {
//     categories: state.categories
//   }
// };
export default ListGroup;