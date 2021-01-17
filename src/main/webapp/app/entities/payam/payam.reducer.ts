import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPayam, defaultValue } from 'app/shared/model/payam.model';

export const ACTION_TYPES = {
  FETCH_PAYAM_LIST: 'payam/FETCH_PAYAM_LIST',
  FETCH_PAYAM: 'payam/FETCH_PAYAM',
  CREATE_PAYAM: 'payam/CREATE_PAYAM',
  UPDATE_PAYAM: 'payam/UPDATE_PAYAM',
  DELETE_PAYAM: 'payam/DELETE_PAYAM',
  SET_BLOB: 'payam/SET_BLOB',
  RESET: 'payam/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPayam>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PayamState = Readonly<typeof initialState>;

// Reducer

export default (state: PayamState = initialState, action): PayamState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PAYAM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PAYAM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PAYAM):
    case REQUEST(ACTION_TYPES.UPDATE_PAYAM):
    case REQUEST(ACTION_TYPES.DELETE_PAYAM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PAYAM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PAYAM):
    case FAILURE(ACTION_TYPES.CREATE_PAYAM):
    case FAILURE(ACTION_TYPES.UPDATE_PAYAM):
    case FAILURE(ACTION_TYPES.DELETE_PAYAM):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAYAM_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAYAM):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PAYAM):
    case SUCCESS(ACTION_TYPES.UPDATE_PAYAM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PAYAM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/payams';

// Actions

export const getEntities: ICrudGetAllAction<IPayam> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PAYAM_LIST,
    payload: axios.get<IPayam>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IPayam> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PAYAM,
    payload: axios.get<IPayam>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPayam> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PAYAM,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPayam> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PAYAM,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPayam> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PAYAM,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
