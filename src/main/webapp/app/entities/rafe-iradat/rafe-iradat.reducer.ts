import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRafeIradat, defaultValue } from 'app/shared/model/rafe-iradat.model';

export const ACTION_TYPES = {
  FETCH_RAFEIRADAT_LIST: 'rafeIradat/FETCH_RAFEIRADAT_LIST',
  FETCH_RAFEIRADAT: 'rafeIradat/FETCH_RAFEIRADAT',
  CREATE_RAFEIRADAT: 'rafeIradat/CREATE_RAFEIRADAT',
  UPDATE_RAFEIRADAT: 'rafeIradat/UPDATE_RAFEIRADAT',
  DELETE_RAFEIRADAT: 'rafeIradat/DELETE_RAFEIRADAT',
  RESET: 'rafeIradat/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRafeIradat>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type RafeIradatState = Readonly<typeof initialState>;

// Reducer

export default (state: RafeIradatState = initialState, action): RafeIradatState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_RAFEIRADAT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RAFEIRADAT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_RAFEIRADAT):
    case REQUEST(ACTION_TYPES.UPDATE_RAFEIRADAT):
    case REQUEST(ACTION_TYPES.DELETE_RAFEIRADAT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_RAFEIRADAT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RAFEIRADAT):
    case FAILURE(ACTION_TYPES.CREATE_RAFEIRADAT):
    case FAILURE(ACTION_TYPES.UPDATE_RAFEIRADAT):
    case FAILURE(ACTION_TYPES.DELETE_RAFEIRADAT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_RAFEIRADAT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_RAFEIRADAT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_RAFEIRADAT):
    case SUCCESS(ACTION_TYPES.UPDATE_RAFEIRADAT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_RAFEIRADAT):
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

const apiUrl = 'api/rafe-iradats';

// Actions

export const getEntities: ICrudGetAllAction<IRafeIradat> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_RAFEIRADAT_LIST,
    payload: axios.get<IRafeIradat>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IRafeIradat> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RAFEIRADAT,
    payload: axios.get<IRafeIradat>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IRafeIradat> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RAFEIRADAT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IRafeIradat> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RAFEIRADAT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRafeIradat> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RAFEIRADAT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
