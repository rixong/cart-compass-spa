import React from 'react';
import { Route, Switch } from 'react-router-dom'

import CurrentList from './ItemsList';
import AddItems from './AddItems';
import EditMasterList from './EditMasterList';
import MyLists from './Lists';
import CategorySortOrder from './CategorySortOrder';



const SplitPanels = () => {
  return (
    <div className="row justify-content-center">
      <div className="col-md pb-5 left-column">
        <Switch>
          <Route path="/add" component={AddItems}></Route>
          <Route path="/edit" component={EditMasterList}></Route>
          <Route path="/mylists" component={MyLists}></Route>
          <Route path="/sort" component={CategorySortOrder}></Route>
        </Switch>
      </div>
      <CurrentList />
    </div>
  )
}
export default SplitPanels;