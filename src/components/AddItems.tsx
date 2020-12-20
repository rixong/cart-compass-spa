import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../store';
// import { IList } from '../store/lists/types';
import { IMasterListItem } from '../store/masterlist/types';
import { doAddItemToMasterList, } from '../store/masterlist/actions';
import { addNotification, clearNotification } from '../store/system/actions';

import Alert from './Alert';

const AddItems = () => {

  const dispatch = useDispatch();

  const selectSystem = (state: RootState) => state.system;
  const { notification } = useSelector(selectSystem)

  // const selectLists = (state: RootState) => state.lists;
  // const { lists } = useSelector(selectLists)

  const selectCategories = (state: RootState) => state.categories;
  const { categories, sortOrder } = useSelector(selectCategories)

  const selectMasterLists = (state: RootState) => state.masterList;
  const { masterList } = useSelector(selectMasterLists)

  // if (lists && lists.length && categories.length) {
  //   const curList = lists.find((list: IList) => list._id === curUser.currentList);
  // }
  const queryDefault = { name: '', quantity: '', category: '0' }

  const [queryTerm, setQueryTerm] = useState(queryDefault)
  const [searchResults, setSearchResults] = useState<IMasterListItem[]>([]);

  const onHandleChange = (e: any) => {
    dispatch(clearNotification());
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
    if (item) {
      setQueryTerm({ ...queryTerm, name: item.name, category: item.categoryId })
      setSearchResults([]);
    }
  }

  const onClickSubmit = () => {   // DRY Fail!

    if (queryTerm.category === '0') {
      dispatch(addNotification("Choose a category"));
      return;
    }

    if (!queryTerm.name.trim()) {
      dispatch(addNotification('Enter an item'));
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

      <div className="header">Add some groceries</div>

      <div className="row justify-content-center">

      <form>
        <div className="form-group mt-15" >
          <label className="ml-1 mb-1" htmlFor="name-input">Item name</label>
          <input
            className="form-control w-100"
            type="text"
            id="name-input"
            placeholder="carrots"
            value={queryTerm.name}
            onChange={(e) => onHandleChange(e)}
            onFocus={() => dispatch(clearNotification())}
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

        <div className="form-group mt-15">
          <label className="ml-1 mb-1" htmlFor="quantity-input">Comment (maybe the quantity?)</label>
          <input
            className="form-control w-100"
            id="quantity-input"
            type="text"
            placeholder="1 bunch"
            value={queryTerm.quantity}
            onChange={(e) => onHandleChange(e)}
            aria-label="enter quantity"
            name="quantity"
          ></input>
        </div>

        <div className="form-group mt-15">
          <label className="ml-1 mb-1" htmlFor="category-select">Select category</label>
          <select
            className="form-control w-100"
            onChange={(e) => onHandleChange(e)}
            name="category"
            id="category-select"
            value={queryTerm.category}
          >
            <option value="0">Category</option>
            {sortOrder.map(sort =>
              <option
                value={sort.categoryId}
                key={sort._id}>
                {categories.find((cat) => cat._id === sort.categoryId)!.name}
              </option>)}
          </select>
        </div>

        {
        notification.isError ?
        <Alert/>:
        <button
          className="btn btn-lg btn-primary mt-4 w-100 rounded-pill"
          type="button"
          id="button-addon2"
          onClick={onClickSubmit}
        >ADD ITEM
        </button>
        }      

      </form>
      </div>

      {/* {notification.isError ? <Alert /> : <p className="h4 text-warning text-center"></p>} */}
    </React.Fragment>
  )
}

export default AddItems;