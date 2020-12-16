import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../store';
import { IList} from '../store/lists/types';
import {IMasterListItem} from '../store/masterlist/types';
import { doAddItemToMasterList, } from '../store/masterlist/actions';
import { addNotification, clearNotification } from '../store/system/actions';

import Alert from './Alert';
import Collapse from './Collapse';
import MyLists from './MyLists';

const AddItems = () => {

  const dispatch = useDispatch();

  const selectSystem = (state: RootState) => state.system;
  const {curUser, notification } = useSelector(selectSystem)

  const selectLists = (state: RootState) => state.lists;
  const { lists } = useSelector(selectLists)

  const selectCategories = (state: RootState) => state.categories;
  const { categories, sortOrder } = useSelector(selectCategories)

  const selectMasterLists = (state: RootState) => state.masterList;
  const { masterList } = useSelector(selectMasterLists)

  // if (lists && lists.length && categories.length) {
  const curList = lists.find((list: IList) => list._id === curUser.currentList);
  // }
  const queryDefault = { name: '', quantity: '', category: '0' }

  const [queryTerm, setQueryTerm] = useState(queryDefault)
  const [searchResults, setSearchResults] = useState<IMasterListItem[]>([]);

  const onHandleChange = (e: any) => {
    // clearNotification()
    // console.log(e.target.value);
    
    let nameValue: string = e.target.value
    setQueryTerm({ ...queryTerm, [e.target.name]: nameValue.toLowerCase() })
    if (nameValue !== '') {
      setSearchResults(masterList.filter(item => item.name.includes(nameValue)));
    } else {
      setSearchResults([]);
    }
  }

  const onSelectItem = (e: any) => {
    const item = masterList.find(item => item.name === e.target.textContent);
    if (item){
      setQueryTerm({ ...queryTerm, name: item.name, category: item.categoryId })
      setSearchResults([]);
    }
  }

  const onClickSubmit = () => {   // DRY Fail!

    if (queryTerm.category === '0') {
      addNotification("Choose a category!");
      return;
    }

    if (!queryTerm.name.trim()) {
      addNotification('Enter an item!');
      setQueryTerm(queryDefault);
      return;
    }

    const trimmedName = queryTerm.name.trim().toLowerCase();
    
    dispatch(doAddItemToMasterList({
      name: trimmedName,
      categoryId: queryTerm.category,
      quantity: queryTerm.quantity,
    }));

    setQueryTerm(queryDefault);
  }

  return (
    <React.Fragment>

      {notification.error ? <Alert /> : <p className="h4 text-warning text-center">&mdash;&mdash;</p>}
      <div className="header">Add items to <span className="text-primary">{curList?.name || 'Set a current list'}</span></div>
      <form>
        <div className="row mb-2">
          <div className="col-md-5 mb-3 px-1">
            <input
              className="form-control"
              type="text"
              id="name-input"
              placeholder="Add a new item..."
              value={queryTerm.name}
              onChange={(e) => onHandleChange(e)}
              onFocus={() => clearNotification()}
              name="name"
              aria-label="enter item name"
              required
            ></input>

            <ul className="list-group itemSearchList">
              {searchResults ?
                searchResults.map((item) =>
                  <li
                    key={item._id}
                    className="list-group-item py-1"
                    role="button"
                    onClick={(e) => onSelectItem(e)}
                    data-id={item._id}
                  >{item.name}</li>)
                : null}
            </ul>
          </div>
          <div className="col-md-3 mb-3 px-1">
            <input
              className="form-control"
              id="quantity-input"
              type="text"
              placeholder="Quantity..."
              value={queryTerm.quantity}
              onChange={(e) => onHandleChange(e)}
              aria-label="enter quantity"
              name="quantity"
            ></input>
          </div>

          <div className="col-md-4 px-1">
            <select
              className="form-control"
              onChange={(e) => onHandleChange(e)}
              name="category"
              id="category-select"
              value={queryTerm.category}
            >
              <option value="0">Category...</option>
                {/* {categories.map(cat => <option value={cat._id} key={cat._id}>{cat.name}</option>)} */}
              { sortOrder.map(sort => 
                  <option
                  value={sort.categoryId}
                  key={sort._id}>
                    {categories.find((cat) => cat._id === sort.categoryId)!.name}
                  </option>)}
            </select>
          </div>
        </div>

        <div className="row justify-content-center my-3">
          <button
            className="btn-lg btn-primary w-75"
            type="button"
            id="button-addon2"
            onClick={onClickSubmit}
          >Add item</button>
        </div>

      </form>
      <MyLists />
    </React.Fragment>
  )
}

export default AddItems;