import { api } from '../helper/apiConstant';
import { method } from '../helper/constants';
import { makeAPIRequest } from '../helper/globalFunction';
import {GET_DISTANCE, GET_LAT_LONG_FROM_ADDRESS} from './types';

export const getLatLongFromAddress = request => async dispatch => {
  return makeAPIRequest({
    baseURL: api.baseURL,
    method: method.get,
    url: api.getLatLongApi,
    params: request?.params,
  })
    .then(response => {
      console.log('response', response);
      dispatch({type: GET_LAT_LONG_FROM_ADDRESS, payload: response?.data});
      if (request.onSuccess) request.onSuccess(response?.data);
    })
    .catch(err => {
      console.log('Err', err.response);
      if (request.onFail) request.onFail(err);
    });
};

export const getDistance = request => async dispatch => {
  return makeAPIRequest({
    baseURL: api.distBaseURL,
    method: method.get,
    url: api.distanceAPI,
    params: request?.params,
  })
    .then(response => {
      console.log('Distance Response ::--', response);
      dispatch({type: GET_DISTANCE, payload: response?.data?.rows?.[0]?.elements?.[0]});
      if (request.onSuccess) request.onSuccess(response?.data?.rows?.[0]?.elements?.[0]);
    })
    .catch(err => {
      console.log('Distance Error ::--', err);
      if (request.onFail) request.onFail(err);
    });
};
