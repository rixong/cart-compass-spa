import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

import { IList, ICompleteItem } from '../store/lists/types';

// import { doFetchCurrentListItems } from '../store/lists/actions';

import ListGroup from './ItemsGroup'

const ItemsList: React.FC = () => {

  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

  const selectSystem = (state: RootState) => state.system;
  const system = useSelector(selectSystem)

  const selectLists = (state: RootState) => state.lists;
  const { lists, curListItems } = useSelector(selectLists)

  // const selectMasterLists = (state: RootState) => state.masterList;
  // const { masterList } = useSelector(selectMasterLists)

  const selectCategories = (state: RootState) => state.categories;
  const { categories, sortOrder } = useSelector(selectCategories)

  const [currentList, setCurrentList] = useState<IList>();

  useEffect(() => {
    if (lists && lists.length && categories.length) {
      const curList = lists.find((list: IList) => list._id === system.curUser.currentList);
      setCurrentList(curList);
    }
  }, [lists, system.curUser.currentList, categories])

  const makeItems = (listItems: any) => {
    // console.log(listItems);

    // if (listItems.length && masterList.length) {
    if ( listItems.length ) {
      let items: any = listItems.map((item: any) => {
        // let curMasteritem: any = masterList.find((ele) => ele._id === item.masterItemId);
        let curSortOrder: any = sortOrder.find((ele) => ele.categoryId === item.categoryId);
        // if (curMasteritem && curSortOrder) {
        if (curSortOrder) {
          return {
            name: item.name,
            id: item._id,
            quantity: item.quantity,
            isActive: item.isActive,
            categoryId: item.categoryId,
            sortOrder: curSortOrder.order,
          }
        }
        return null
      })
      return items.sort((a: any, b: any) => a.sortOrder - b.sortOrder);
    }
  }

  const divideListByCategory = (curItems: ICompleteItem[]) => {
    const divided: any = {};
    let divs: any = [];
    curItems.forEach((listItem: ICompleteItem) => {
      if (!divided[listItem.categoryId]) {
        divided[listItem.categoryId] = [listItem];
      } else {
        divided[listItem.categoryId].push(listItem);
      }
    })

    for (const categoryKey in divided) {
      const curCategories = categories.find((el) => el._id === categoryKey)
      if (curCategories) {
        // console.log(curCategories.name);
        divs.push(<ListGroup categoryName={curCategories.name} items={divided[categoryKey]} key={categoryKey} />)
      }
    }
    return divs;
  }

  return (
    <div className="col-md overflow-auto bg-light" style={{ height: vh }}>
      {currentList ?
        <div className="display-block justify-content-center">
          <div className="row h2 text-primary">{currentList.name} </div>
          <div className="row h6"> {moment(currentList.dateCreated).format('dddd, MMMM D')}</div>
        </div>
        : null}
      {curListItems.length ? divideListByCategory(makeItems(curListItems)) : null}
    </div>
  )

}
export default ItemsList;