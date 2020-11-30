import React, { ReactComponentElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { ThreeBarsIcon } from '@primer/octicons-react';
import {RootState} from '../store';
import {ISortOrder} from '../store/lists/types';

import { doReorderCategories } from '../store/categories/actions';

//https://github.com/clauderic/react-sortable-hoc/blob/master/examples/drag-handle.js


const CategorySortOrder = () => {
  
  // const dispatch = useDispatch();

  // const selectSystem = (state: RootState) => state.system;
  // const {curUser, notification } = useSelector(selectSystem)

  const selectCategories = (state: RootState) => state.categories;
  const { categories } = useSelector(selectCategories)

  const selectLists = (state: RootState) => state.lists;
  const { lists, sortOrder } = useSelector(selectLists)

  const SortableItem = SortableElement(({ value }: {value:ISortOrder}) =>
    <li className="list-group-item py-1 category-sort-display">
      <ThreeBarsIcon size={16} className="mr-3" />
      {value._id}
    </li>);

  const SortableList = SortableContainer(({ children }: {children: {}[]}) => {
    return <ul className="list-group category-list">{children}</ul>;
  });

  const onSortEnd = ({ oldIndex, newIndex }: {oldIndex: number, newIndex: number}) => {
    // console.log(oldIndex, newIndex)
    const newOrder = arrayMove(sortOrder, oldIndex, newIndex)
    // const ids = newOrder.map(el => el.id)
    // doReorderCategories(curUser.id, ids)
  };

  return (
    <React.Fragment>
      <div className="header">Move categories</div>
      <div className="row justify-content-center">
        <SortableList onSortEnd={onSortEnd}>
          {sortOrder.map((value, index) => (
            <SortableItem key={`item-${value.categoryId}`} index={index} value={value} />
          ))}
        </SortableList>
      </div>
    </React.Fragment>
  )
}

export default CategorySortOrder;