import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { XCircleFillIcon } from '@primer/octicons-react';

import {RootState} from '../store';
import { doRemoveFromMasterList } from '../store/masterlist/actions';

const EditMasterList: React.FC = () => {

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
      <div className="h5 text-center">Deleting items here will delete item from ALL of your lists!</div>
      <div className="row justify-content-center">
        <div className="d-flex justify-content-between rounded mt-3">
          <div className="py-2 px-5 hover-btn" role="button" onClick={() => setSortType('name')}>NAME</div>
          <div className="py-2 px-5 hover-btn"  role="button" onClick={() => setSortType('category')}>CATEGORY</div>
        </div>
        <div className=" pl-0 mt-3 " >
          {sort().map((item) => (
            <div
              className=" d-flex justify-content-between pl-0 py-1 mb-2 rounded shadow"
              key={item._id}>
              <div className="ml-3">{item.name.split(' ').map(ele => ele.slice(0,1).toUpperCase() + ele.slice(1).toLowerCase()).join(' ')}</div>
              <div className="">{categories.length ? (categories.find(category => category._id === item.categoryId))!.name : null }</div>
              <div className="">
                <button
                  type="button"
                  className="close"
                  aria-label="Delete"
                  onClick={() => doRemoveFromMasterList(item._id)}
                >
                  <XCircleFillIcon size={24} />
                </button>
              </div>
            </div>)
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

export default (EditMasterList);
