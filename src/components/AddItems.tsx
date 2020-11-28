import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../store';
import { IListItem, IList, ISortOrder, ICompleteItem } from '../store/lists/types';
import {IMasterListItem} from '../store/masterlist/types';
import Alert from './Alert';
import Collapse from './Collapse';
// import MyLists from './MyLists';

import { doAddItemToMasterList, } from '../store/masterlist/actions';
import { addNotification, clearNotification } from '../store/system/actions';

const AddItems = () => {

  const selectSystem = (state: RootState) => state.system;
  const {curUser, notification } = useSelector(selectSystem)

  const selectLists = (state: RootState) => state.lists;
  const { lists, sortOrder } = useSelector(selectLists)


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
    let nameValue: string = e.target.name
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

    doAddItemToMasterList({
      name: trimmedName,
      category_id: queryTerm.category,
      quantity: queryTerm.quantity,
    }, curUser._id, curList.id);

    setQueryTerm(queryDefault);
  }

  return (
    <React.Fragment>
      <Collapse />

      {notification.error ? <Alert /> : <p className="h4 text-warning text-center">&mdash;&mdash;</p>}
      <div className="header">Add items to <span className="text-primary">{curList.name}</span></div>
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
                    key={item.id}
                    className="list-group-item py-1"
                    role="button"
                    onClick={(e) => onSelectItem(e)}
                    data-id={item.id}
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
              {categories.sort((a, b) => a.sort_order - b.sort_order).map(cat => <option value={cat.id} key={cat.id}>{cat.name}</option>)}
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
    </React.Fragment>
  )
}

export default AddItems;