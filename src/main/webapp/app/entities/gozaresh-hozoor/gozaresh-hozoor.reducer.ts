import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IGozareshHozoor, defaultValue } from 'app/shared/model/gozaresh-hozoor.model';

export const ACTION_TYPES = {
  FETCH_GOZARESHHOZOOR_LIST: 'gozareshHozoor/FETCH_GOZARESHHOZOOR_LIST',
  FETCH_GOZARESHHOZOOR: 'gozareshHozoor/FETCH_GOZARESHHOZOOR',
  CREATE_GOZARESHHOZOOR: 'gozareshHozoor/CREATE_GOZARESHHOZOOR',
  UPDATE_GOZARESHHOZOOR: 'gozareshHozoor/UPDATE_GOZARESHHOZOOR',
  DELETE_GOZARESHHOZOOR: 'gozareshHozoor/DELETE_GOZARESHHOZOOR',
  RESET: 'gozareshHozoor/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IGozareshHozoor>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type GozareshHozoorState = Readonly<typeof initialState>;

// Reducer

export default (state: GozareshHozoorState = initialState, action): GozareshHozoorState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_GOZARESHHOZOOR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_GOZARESHHOZOOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_GOZARESHHOZOOR):
    case REQUEST(ACTION_TYPES.UPDATE_GOZARESHHOZOOR):
    case REQUEST(ACTION_TYPES.DELETE_GOZARESHHOZOOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_GOZARESHHOZOOR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_GOZARESHHOZOOR):
    case FAILURE(ACTION_TYPES.CREATE_GOZARESHHOZOOR):
    case FAILURE(ACTION_TYPES.UPDATE_GOZARESHHOZOOR):
    case FAILURE(ACTION_TYPES.DELETE_GOZARESHHOZOOR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_GOZARESHHOZOOR_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_GOZARESHHOZOOR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_GOZARESHHOZOOR):
    case SUCCESS(ACTION_TYPES.UPDATE_GOZARESHHOZOOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_GOZARESHHOZOOR):
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

const apiUrl = 'api/gozaresh-hozoors';

// Actions

export const getEntities: ICrudGetAllAction<IGozareshHozoor> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_GOZARESHHOZOOR_LIST,
    payload: axios.get<IGozareshHozoor>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IGozareshHozoor> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_GOZARESHHOZOOR,
    payload: axios.get<IGozareshHozoor>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IGozareshHozoor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_GOZARESHHOZOOR,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IGozareshHozoor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_GOZARESHHOZOOR,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IGozareshHozoor> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_GOZARESHHOZOOR,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
