import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IGozaresh, defaultValue } from 'app/shared/model/gozaresh.model';

export const ACTION_TYPES = {
  FETCH_GOZARESH_LIST: 'gozaresh/FETCH_GOZARESH_LIST',
  FETCH_GOZARESH: 'gozaresh/FETCH_GOZARESH',
  CREATE_GOZARESH: 'gozaresh/CREATE_GOZARESH',
  UPDATE_GOZARESH: 'gozaresh/UPDATE_GOZARESH',
  DELETE_GOZARESH: 'gozaresh/DELETE_GOZARESH',
  RESET: 'gozaresh/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IGozaresh>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type GozareshState = Readonly<typeof initialState>;

// Reducer

export default (state: GozareshState = initialState, action): GozareshState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_GOZARESH_LIST):
    case REQUEST(ACTION_TYPES.FETCH_GOZARESH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_GOZARESH):
    case REQUEST(ACTION_TYPES.UPDATE_GOZARESH):
    case REQUEST(ACTION_TYPES.DELETE_GOZARESH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_GOZARESH_LIST):
    case FAILURE(ACTION_TYPES.FETCH_GOZARESH):
    case FAILURE(ACTION_TYPES.CREATE_GOZARESH):
    case FAILURE(ACTION_TYPES.UPDATE_GOZARESH):
    case FAILURE(ACTION_TYPES.DELETE_GOZARESH):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_GOZARESH_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_GOZARESH):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_GOZARESH):
    case SUCCESS(ACTION_TYPES.UPDATE_GOZARESH):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_GOZARESH):
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

const apiUrl = 'api/gozareshes';

// Actions

export const getEntities: ICrudGetAllAction<IGozaresh> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_GOZARESH_LIST,
  payload: axios.get<IGozaresh>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IGozaresh> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_GOZARESH,
    payload: axios.get<IGozaresh>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IGozaresh> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_GOZARESH,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IGozaresh> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_GOZARESH,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IGozaresh> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_GOZARESH,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
