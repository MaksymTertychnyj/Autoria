import React, {useState} from 'react';
import DataResponse from '../../../android/models/DTO/DataResponse';
import ResponseAVG from '../../../android/models/ResponseAVG';

const DataMapper = (data: ResponseAVG) => {
  const arrayData = Array<DataResponse>();
  arrayData.length = 0;

  if (data?.classifieds && data.prices) {
    for (let index = 0; index < data.classifieds.length; index++) {
      arrayData.push(
        Object.create({
          classified: data.classifieds[index],
          price: data.prices[index],
        }),
      );
    }
  }
  return arrayData;
};

export default DataMapper;
