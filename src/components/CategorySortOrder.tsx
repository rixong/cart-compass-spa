import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { ThreeBarsIcon } from '@primer/octicons-react';

import {RootState} from '../store';
import {ISortOrder} from '../store/categories/types';
import { doReorderSortOrder } from '../store/categories/actions';

//https://github.com/clauderic/react-sortable-hoc/blob/master/examples/drag-handle.js

const CategorySortOrder = () => {
  
  const dispatch = useDispatch();

  const selectCategories = (state: RootState) => state.categories;
  const { categories, sortOrder } = useSelector(selectCategories)

  const findCategoryName = (id: string) => {
    return categories.find((cat) => cat._id === id)?.name;
  }

  const SortableItem = SortableElement(({ value }: {value:ISortOrder}) =>
    <li className="list-group-item py-1 category-sort-display">
      <ThreeBarsIcon size={16} className="mr-3" />
      {findCategoryName(value.categoryId)}
    </li>);

  const SortableList = SortableContainer(({ children }: {children: {}[]}) => {
    return <ul className="list-group category-list">{children}</ul>;
  });

  const renderSortedList = ({ oldIndex, newIndex }: {oldIndex: number, newIndex: number}) => {
    const newOrder = arrayMove(sortOrder, oldIndex, newIndex)
    const resetOrder = newOrder.map((ele, idx) => {
      ele.order = idx
      return ele;
    })
    dispatch(doReorderSortOrder(resetOrder));
  };

  return (
    <React.Fragment>
      <div className="header">Move categories</div>
      <div className="row justify-content-center">
        <SortableList onSortEnd={renderSortedList}>
          {sortOrder.map((value, index) => (
            <SortableItem key={`item-${value.categoryId}`} index={index} value={value} />
          ))}
        </SortableList>
      </div>
    </React.Fragment>
  )
}

export default CategorySortOrder;