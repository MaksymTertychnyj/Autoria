import React, {useState} from 'react';
import Data from '../../android/models/Data';
import DataDropDownList from '../../android/models/DTO/DataDropDownList';

const DataMapper = (data: Data[]) => {
  const arrayData = Array<DataDropDownList>();

  for (let item of data) {
    arrayData.push(Object.create({label: item?.name, value: item?.value}));
  }

  return arrayData;
};

export default DataMapper;
