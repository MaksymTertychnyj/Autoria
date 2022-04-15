import ResponseAVG from '../models/ResponseAVG';
import APIConfig from './APIConfig';

let response: ResponseAVG;

const APIRoutes = {
  getResponseAdvertisement: (selectedPosition: string, key: string) =>
    APIConfig.URL + 'info?api_key=' + key + '&auto_id=' + selectedPosition,

  setResponse: (data: ResponseAVG) => (response = data),

  getResponse: () => {
    return response;
  },

  getRequestAVG: (sublink: string, key: string) =>
    APIConfig.URL + 'average_price?api_key=' + key + sublink,

  getTypeTransport: (key: string) =>
    APIConfig.URL + 'categories/?api_key=' + key,

  getMarkTransport: (type: string, key: string) =>
    APIConfig.URL + 'categories/' + type + '/marks?api_key=' + key,

  getModelTransport: (type: string, mark: string, key: string) =>
    APIConfig.URL +
    'categories/' +
    type +
    '/marks/' +
    mark +
    '/models?api_key=' +
    key,

  getRegion: (key: string) => APIConfig.URL + 'states?api_key=' + key,

  getCities: (region: string, key: string) =>
    APIConfig.URL + 'states/' + region + '/cities?api_key=' + key,

  getFuelType: (key: string) => APIConfig.URL + 'type?api_key=' + key,

  getKPPtype: (key: string, type: string) =>
    APIConfig.URL + 'categories/' + type + '/gearboxes?api_key=' + key,
};

export default APIRoutes;
