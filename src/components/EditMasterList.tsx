import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { XCircleIcon } from '@primer/octicons-react';

import { RootState } from '../store';
import { doRemoveFromMasterList } from '../store/masterlist/actions';

const EditMasterList: React.FC = () => {

  const dispatch = useDispatch();

  const selectCategories = (state: RootState) => state.categories;
  const { categories } = useSelector(selectCategories)

  const selectMasterLists = (state: RootState) => state.masterList;
  const { masterList } = useSelector(selectMasterLists)

  const [sortType, setSortType] = useState('name')

  const sort = () => {
    if (sortType === 'name') {
      return [...masterList].sort((a, b) => a.name.localeCompare(b.name));
    } else {
      return [...masterList].sort((a, b) => a.categoryId.localeCompare(b.categoryId));
    }
  }

  return (
    <React.Fragment>
      <div className="header">Edit master list</div>
      <div className="d-flex justify-content-around mb-5">
        <div className="py-2 px-4 hover-btn rounded-pill" role="button" onClick={() => setSortType('name')}>By NAME</div>
        <div className="py-2 px-4 hover-btn rounded-pill" role="button" onClick={() => setSortType('category')}>By CATEGORY</div>
      </div>
      <div className="h6 text-center text-warning">Deleting items here will delete item from ALL of your lists!</div>

      <div className="row mt-3 justify-content-center">
        {sort().map((item) => (
          <div
            className="row bg-light rounded py-1 mb-1 w-75 shadow-sm"
            key={item._id}
          >
            <div className="col-5">{item.name}</div>
            <div className="col-5 text-info">
              {categories.length ?
                (categories.find(category => category._id === item.categoryId))!
                  .name :
                null
              }
            </div>
            <div className="col-1">
              <button
                type="button"
                className="close"
                aria-label="Delete"
                onClick={() => dispatch(doRemoveFromMasterList(item._id))}
              >
                <XCircleIcon className="mb-1" size={16} />
              </button>
            </div>
          </div>
        )
        )}     
      </div>
    </React.Fragment>
  )
}

export default (EditMasterList);
