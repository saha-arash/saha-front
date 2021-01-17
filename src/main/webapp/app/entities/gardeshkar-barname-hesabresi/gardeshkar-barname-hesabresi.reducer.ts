import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IGardeshkarBarnameHesabresi, defaultValue } from 'app/shared/model/gardeshkar-barname-hesabresi.model';

export const ACTION_TYPES = {
  FETCH_GARDESHKARBARNAMEHESABRESI_LIST: 'gardeshkarBarnameHesabresi/FETCH_GARDESHKARBARNAMEHESABRESI_LIST',
  FETCH_GARDESHKARBARNAMEHESABRESI: 'gardeshkarBarnameHesabresi/FETCH_GARDESHKARBARNAMEHESABRESI',
  CREATE_GARDESHKARBARNAMEHESABRESI: 'gardeshkarBarnameHesabresi/CREATE_GARDESHKARBARNAMEHESABRESI',
  UPDATE_GARDESHKARBARNAMEHESABRESI: 'gardeshkarBarnameHesabresi/UPDATE_GARDESHKARBARNAMEHESABRESI',
  DELETE_GARDESHKARBARNAMEHESABRESI: 'gardeshkarBarnameHesabresi/DELETE_GARDESHKARBARNAMEHESABRESI',
  RESET: 'gardeshkarBarnameHesabresi/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IGardeshkarBarnameHesabresi>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type GardeshkarBarnameHesabresiState = Readonly<typeof initialState>;

// Reducer

export default (state: GardeshkarBarnameHesabresiState = initialState, action): GardeshkarBarnameHesabresiState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_GARDESHKARBARNAMEHESABRESI_LIST):
    case REQUEST(ACTION_TYPES.FETCH_GARDESHKARBARNAMEHESABRESI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_GARDESHKARBARNAMEHESABRESI):
    case REQUEST(ACTION_TYPES.UPDATE_GARDESHKARBARNAMEHESABRESI):
    case REQUEST(ACTION_TYPES.DELETE_GARDESHKARBARNAMEHESABRESI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_GARDESHKARBARNAMEHESABRESI_LIST):
    case FAILURE(ACTION_TYPES.FETCH_GARDESHKARBARNAMEHESABRESI):
    case FAILURE(ACTION_TYPES.CREATE_GARDESHKARBARNAMEHESABRESI):
    case FAILURE(ACTION_TYPES.UPDATE_GARDESHKARBARNAMEHESABRESI):
    case FAILURE(ACTION_TYPES.DELETE_GARDESHKARBARNAMEHESABRESI):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_GARDESHKARBARNAMEHESABRESI_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_GARDESHKARBARNAMEHESABRESI):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_GARDESHKARBARNAMEHESABRESI):
    case SUCCESS(ACTION_TYPES.UPDATE_GARDESHKARBARNAMEHESABRESI):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_GARDESHKARBARNAMEHESABRESI):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/gardeshkar-barname-hesabresis';

// Actions

export const getEntities: ICrudGetAllAction<IGardeshkarBarnameHesabresi> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_GARDESHKARBARNAMEHESABRESI_LIST,
    payload: axios.get<IGardeshkarBarnameHesabresi>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IGardeshkarBarnameHesabresi> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_GARDESHKARBARNAMEHESABRESI,
    payload: axios.get<IGardeshkarBarnameHesabresi>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IGardeshkarBarnameHesabresi> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_GARDESHKARBARNAMEHESABRESI,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IGardeshkarBarnameHesabresi> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_GARDESHKARBARNAMEHESABRESI,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IGardeshkarBarnameHesabresi> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_GARDESHKARBARNAMEHESABRESI,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
