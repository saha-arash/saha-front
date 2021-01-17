import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFileGozaresh, defaultValue } from 'app/shared/model/file-gozaresh.model';

export const ACTION_TYPES = {
  FETCH_FILEGOZARESH_LIST: 'fileGozaresh/FETCH_FILEGOZARESH_LIST',
  FETCH_FILEGOZARESH: 'fileGozaresh/FETCH_FILEGOZARESH',
  CREATE_FILEGOZARESH: 'fileGozaresh/CREATE_FILEGOZARESH',
  UPDATE_FILEGOZARESH: 'fileGozaresh/UPDATE_FILEGOZARESH',
  DELETE_FILEGOZARESH: 'fileGozaresh/DELETE_FILEGOZARESH',
  SET_BLOB: 'fileGozaresh/SET_BLOB',
  RESET: 'fileGozaresh/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFileGozaresh>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type FileGozareshState = Readonly<typeof initialState>;

// Reducer

export default (state: FileGozareshState = initialState, action): FileGozareshState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FILEGOZARESH_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FILEGOZARESH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FILEGOZARESH):
    case REQUEST(ACTION_TYPES.UPDATE_FILEGOZARESH):
    case REQUEST(ACTION_TYPES.DELETE_FILEGOZARESH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FILEGOZARESH_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FILEGOZARESH):
    case FAILURE(ACTION_TYPES.CREATE_FILEGOZARESH):
    case FAILURE(ACTION_TYPES.UPDATE_FILEGOZARESH):
    case FAILURE(ACTION_TYPES.DELETE_FILEGOZARESH):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FILEGOZARESH_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_FILEGOZARESH):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FILEGOZARESH):
    case SUCCESS(ACTION_TYPES.UPDATE_FILEGOZARESH):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FILEGOZARESH):
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

const apiUrl = 'api/file-gozareshes';

// Actions

export const getEntities: ICrudGetAllAction<IFileGozaresh> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_FILEGOZARESH_LIST,
    payload: axios.get<IFileGozaresh>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IFileGozaresh> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FILEGOZARESH,
    payload: axios.get<IFileGozaresh>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFileGozaresh> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FILEGOZARESH,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFileGozaresh> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FILEGOZARESH,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFileGozaresh> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FILEGOZARESH,
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
