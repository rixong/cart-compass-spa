import React from 'react';
import { useSelector } from 'react-redux';

import {RootState} from '../store/'


const Alert: React.FC = () => {

  const selectSystem = (state: RootState) => state.system;
  const system = useSelector(selectSystem)

  return (
    <div className="alert alert-warning m-4 text-center" role="alert">
      {system.notification.message}
    </div>
  )
}

export default Alert