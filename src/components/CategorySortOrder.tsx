import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { ThreeBarsIcon } from '@primer/octicons-react';
import {RootState} from '../store';

import { doReorderCategories } from '../store/categories/actions';

const CategorySortOrder = () => {

  const dispatch = useDispatch();

  const selectSystem = (state: RootState) => state.system;
  const {curUser, notification } = useSelector(selectSystem)

  const selectCategories = (state: RootState) => state.categories;
  const { categories } = useSelector(selectCategories)

  const SortableItem = sortableElement(({ value }) =>
    <li className="list-group-item py-1 category-sort-display">
      <ThreeBarsIcon size={16} className="mr-3" />
      {value.name}
    </li>);

  const SortableContainer = sortableContainer(({ children }) => {
    return <ul className="list-group category-list">{children}</ul>;
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    // console.log(oldIndex, newIndex)
    const newOrder = arrayMove(categories, oldIndex, newIndex)
    const ids = newOrder.map(el => el.id)
    doReorderCategories(curUser.id, ids)
  };

  return (
    <React.Fragment>
      <div className="header">Move categories</div>
      <div className="row justify-content-center">
        <SortableContainer onSortEnd={onSortEnd}>
          {categories.map((value, index) => (
            <SortableItem key={`item-${value.name}`} index={index} value={value} />
          ))}
        </SortableContainer>
      </div>
    </React.Fragment>
  )
}

export default CategorySortOrder;