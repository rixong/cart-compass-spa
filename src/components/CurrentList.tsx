import React, { useEffect } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

import { IListItem, IList, ISortOrder, ICompleteItem } from '../store/lists/types';
import { IMasterListItem } from '../store/masterlist/types';

// import { doGetCurrentListItems } from '../store/lists/actions';
// import ListGroup from './ListGroup'

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

  const curCategories = new Set();
  useEffect(() => {

    // let curListItems: IListItem[];
    if (lists && lists.length) {
      const curList: any = lists.find((list: IList) => list._id === system.curUser.currentList);
      const curListItems: IListItem[] = curList.listItems;
      const categoryHash = makeCategoryHash()
      // console.log(categoryHash);
      const items = makeItems(categoryHash, curListItems);
      console.log(divideListByCategory(items));

    }
  }, [lists, system.curUser.currentList, categories])

  const makeCategoryHash = () => {
    const hashMap: any = {};
    categories.forEach(cat => {
      const orderObj = sortOrder.find((order) => order.categoryId === cat._id)
      if (orderObj) {
        hashMap[cat._id] = {
          name: cat.name,
          order: orderObj.order
        }
      }
    })
    return hashMap;
  }

  const makeItems = (categoryHash: any, listItems: any) => {
    let itemsFromHash: any = listItems.map((item: any) => {
      let masteritem: any = masterList.find((ele) => ele._id === item.masterItemId)
      if (masteritem) {
        return {
          name: masteritem.name,
          quantity: item.quantity,
          active: item.active,
          category: categoryHash[masteritem.categoryId].name,
          sortOrder: categoryHash[masteritem.categoryId].order,
        }
      }
    })
    return itemsFromHash.sort((a:any , b: any) => a.sortOrder - b.sortOrder);
  }

  const divideListByCategory = (curListItems: ICompleteItem[]) => {

    const divided: any = {};
    let divs: HTMLElement[] = [];

    curListItems.forEach((listItem: ICompleteItem) => {
      // let item = masterList.masterList.find(el => listItem.masterItemId === el._id)
      if (!divided[listItem.category]) {
        divided[listItem.category] = [listItem];
      } else {
        divided[listItem.category].push(listItem);
      }
    })

    const currentCategories = 
  //   categories.forEach(cat => {
  //     if (divided[cat.id]) {
  //       divs.push(<ListGroup categoryName={cat.name} items={divided[cat.id]} key={cat.id} />)
  //     }
    return divided;
  }

  return (
    <div className="col-md overflow-auto bg-light" style={{ height: vh }}>
      <h5>Temp List Home</h5>
      <div className="d-flex flex-wrap justify-content-center align-items-end mt-4">
        {/* <div className="h2 pb-0 text-primary">{curList.name} </div>
        <div className="h5 ml-4 pb-1"> ({moment(curList.created_at).format('MMM Do')})</div> */}
      </div>
      {/* { divideListByCategory()} */}

    </div>
  )
}

export default CurrentList;