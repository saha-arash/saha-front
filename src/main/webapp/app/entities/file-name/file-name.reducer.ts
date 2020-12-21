import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFileName, defaultValue } from 'app/shared/model/file-name.model';

export const ACTION_TYPES = {
  FETCH_FILENAME_LIST: 'fileName/FETCH_FILENAME_LIST',
  FETCH_FILENAME: 'fileName/FETCH_FILENAME',
  CREATE_FILENAME: 'fileName/CREATE_FILENAME',
  UPDATE_FILENAME: 'fileName/UPDATE_FILENAME',
  DELETE_FILENAME: 'fileName/DELETE_FILENAME',
  SET_BLOB: 'fileName/SET_BLOB',
  RESET: 'fileName/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFileName>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type FileNameState = Readonly<typeof initialState>;

// Reducer

export default (state: FileNameState = initialState, action): FileNameState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FILENAME_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FILENAME):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FILENAME):
    case REQUEST(ACTION_TYPES.UPDATE_FILENAME):
    case REQUEST(ACTION_TYPES.DELETE_FILENAME):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FILENAME_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FILENAME):
    case FAILURE(ACTION_TYPES.CREATE_FILENAME):
    case FAILURE(ACTION_TYPES.UPDATE_FILENAME):
    case FAILURE(ACTION_TYPES.DELETE_FILENAME):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FILENAME_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FILENAME):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FILENAME):
    case SUCCESS(ACTION_TYPES.UPDATE_FILENAME):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FILENAME):
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

const apiUrl = 'api/file-names';

// Actions

export const getEntities: ICrudGetAllAction<IFileName> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FILENAME_LIST,
  payload: axios.get<IFileName>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IFileName> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FILENAME,
    payload: axios.get<IFileName>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFileName> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FILENAME,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFileName> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FILENAME,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFileName> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FILENAME,
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
