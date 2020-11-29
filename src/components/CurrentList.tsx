import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

import { IList, ICompleteItem } from '../store/lists/types';

// import { doGetCurrentListItems } from '../store/lists/actions';

import ListGroup from './ListGroup'

const CurrentList: React.FC = () => {

  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

  const selectSystem = (state: RootState) => state.system;
  const system = useSelector(selectSystem)

  const selectLists = (state: RootState) => state.lists;
  const { lists, sortOrder } = useSelector(selectLists)

  const selectMasterLists = (state: RootState) => state.masterList;
  const { masterList } = useSelector(selectMasterLists)

  const selectCategories = (state: RootState) => state.categories;
  const { categories } = useSelector(selectCategories)

  const [currentList, setCurrentList] = useState<IList>();

  useEffect(() => {
    if (lists && lists.length && categories.length) {
      const curList = lists.find((list: IList) => list._id === system.curUser.currentList);
      setCurrentList(curList);
      // const curListItems: IListItem[] = curList.listItems;
      // const items = makeItems(curListItems);
      // console.log(items);
      // console.log(divideListByCategory(items));
    }
  }, [lists, system.curUser.currentList, categories])

  const makeItems = (listItems: any) => {

    // if (listItems.length && masterList.length) {
    let items: any = listItems.map((item: any) => {
      let curMasteritem: any = masterList.find((ele) => ele._id === item.masterItemId);
      let curSortOrder: any = sortOrder.find((ele) => ele.categoryId === curMasteritem.categoryId);
      if (curMasteritem && curSortOrder) {
        return {
          name: curMasteritem.name,
          id: item._id,
          quantity: item.quantity,
          active: item.active,
          categoryId: curMasteritem.categoryId,
          sortOrder: curSortOrder.order,
        }
      }
    })
    return items.sort((a: any, b: any) => a.sortOrder - b.sortOrder);
    // }
  }

  const divideListByCategory = (curListItems: ICompleteItem[]) => {
    const divided: any = {};
    let divs: any = [];
    curListItems.forEach((listItem: ICompleteItem) => {
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
        <div className="d-flex flex-wrap justify-content-center align-items-end mt-4">
          <div className="h2 pb-0 text-primary">{currentList.name} </div>
          <div className="h5 ml-4 pb-1"> ({moment(currentList.dateCreated).format('MMM Do')})</div>
        </div>
        : null}
      {currentList ? divideListByCategory(makeItems(currentList.listItems)) : null}
    </div>
  )

}
export default CurrentList;