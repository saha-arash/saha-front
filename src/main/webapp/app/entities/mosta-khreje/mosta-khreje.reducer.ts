import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMostaKhreje, defaultValue } from 'app/shared/model/mosta-khreje.model';

export const ACTION_TYPES = {
  FETCH_MOSTAKHREJE_LIST: 'mostaKhreje/FETCH_MOSTAKHREJE_LIST',
  FETCH_MOSTAKHREJE: 'mostaKhreje/FETCH_MOSTAKHREJE',
  CREATE_MOSTAKHREJE: 'mostaKhreje/CREATE_MOSTAKHREJE',
  UPDATE_MOSTAKHREJE: 'mostaKhreje/UPDATE_MOSTAKHREJE',
  DELETE_MOSTAKHREJE: 'mostaKhreje/DELETE_MOSTAKHREJE',
  RESET: 'mostaKhreje/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMostaKhreje>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type MostaKhrejeState = Readonly<typeof initialState>;

// Reducer

export default (state: MostaKhrejeState = initialState, action): MostaKhrejeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MOSTAKHREJE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MOSTAKHREJE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MOSTAKHREJE):
    case REQUEST(ACTION_TYPES.UPDATE_MOSTAKHREJE):
    case REQUEST(ACTION_TYPES.DELETE_MOSTAKHREJE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MOSTAKHREJE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MOSTAKHREJE):
    case FAILURE(ACTION_TYPES.CREATE_MOSTAKHREJE):
    case FAILURE(ACTION_TYPES.UPDATE_MOSTAKHREJE):
    case FAILURE(ACTION_TYPES.DELETE_MOSTAKHREJE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MOSTAKHREJE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_MOSTAKHREJE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MOSTAKHREJE):
    case SUCCESS(ACTION_TYPES.UPDATE_MOSTAKHREJE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MOSTAKHREJE):
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

const apiUrl = 'api/mosta-khrejes';

// Actions

export const getEntities: ICrudGetAllAction<IMostaKhreje> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_MOSTAKHREJE_LIST,
    payload: axios.get<IMostaKhreje>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IMostaKhreje> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MOSTAKHREJE,
    payload: axios.get<IMostaKhreje>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMostaKhreje> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MOSTAKHREJE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMostaKhreje> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MOSTAKHREJE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMostaKhreje> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MOSTAKHREJE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
