import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IKholaseGozaresh, defaultValue } from 'app/shared/model/kholase-gozaresh.model';

export const ACTION_TYPES = {
  FETCH_KHOLASEGOZARESH_LIST: 'kholaseGozaresh/FETCH_KHOLASEGOZARESH_LIST',
  FETCH_KHOLASEGOZARESH: 'kholaseGozaresh/FETCH_KHOLASEGOZARESH',
  CREATE_KHOLASEGOZARESH: 'kholaseGozaresh/CREATE_KHOLASEGOZARESH',
  UPDATE_KHOLASEGOZARESH: 'kholaseGozaresh/UPDATE_KHOLASEGOZARESH',
  DELETE_KHOLASEGOZARESH: 'kholaseGozaresh/DELETE_KHOLASEGOZARESH',
  RESET: 'kholaseGozaresh/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IKholaseGozaresh>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type KholaseGozareshState = Readonly<typeof initialState>;

// Reducer

export default (state: KholaseGozareshState = initialState, action): KholaseGozareshState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_KHOLASEGOZARESH_LIST):
    case REQUEST(ACTION_TYPES.FETCH_KHOLASEGOZARESH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_KHOLASEGOZARESH):
    case REQUEST(ACTION_TYPES.UPDATE_KHOLASEGOZARESH):
    case REQUEST(ACTION_TYPES.DELETE_KHOLASEGOZARESH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_KHOLASEGOZARESH_LIST):
    case FAILURE(ACTION_TYPES.FETCH_KHOLASEGOZARESH):
    case FAILURE(ACTION_TYPES.CREATE_KHOLASEGOZARESH):
    case FAILURE(ACTION_TYPES.UPDATE_KHOLASEGOZARESH):
    case FAILURE(ACTION_TYPES.DELETE_KHOLASEGOZARESH):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_KHOLASEGOZARESH_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_KHOLASEGOZARESH):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_KHOLASEGOZARESH):
    case SUCCESS(ACTION_TYPES.UPDATE_KHOLASEGOZARESH):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_KHOLASEGOZARESH):
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

const apiUrl = 'api/kholase-gozareshes';

// Actions

export const getEntities: ICrudGetAllAction<IKholaseGozaresh> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_KHOLASEGOZARESH_LIST,
    payload: axios.get<IKholaseGozaresh>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IKholaseGozaresh> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_KHOLASEGOZARESH,
    payload: axios.get<IKholaseGozaresh>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IKholaseGozaresh> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_KHOLASEGOZARESH,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IKholaseGozaresh> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_KHOLASEGOZARESH,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IKholaseGozaresh> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_KHOLASEGOZARESH,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
