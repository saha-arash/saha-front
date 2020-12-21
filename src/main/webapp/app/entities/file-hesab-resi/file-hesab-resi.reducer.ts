import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFileHesabResi, defaultValue } from 'app/shared/model/file-hesab-resi.model';

export const ACTION_TYPES = {
  FETCH_FILEHESABRESI_LIST: 'fileHesabResi/FETCH_FILEHESABRESI_LIST',
  FETCH_FILEHESABRESI: 'fileHesabResi/FETCH_FILEHESABRESI',
  CREATE_FILEHESABRESI: 'fileHesabResi/CREATE_FILEHESABRESI',
  UPDATE_FILEHESABRESI: 'fileHesabResi/UPDATE_FILEHESABRESI',
  DELETE_FILEHESABRESI: 'fileHesabResi/DELETE_FILEHESABRESI',
  SET_BLOB: 'fileHesabResi/SET_BLOB',
  RESET: 'fileHesabResi/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFileHesabResi>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type FileHesabResiState = Readonly<typeof initialState>;

// Reducer

export default (state: FileHesabResiState = initialState, action): FileHesabResiState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FILEHESABRESI_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FILEHESABRESI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FILEHESABRESI):
    case REQUEST(ACTION_TYPES.UPDATE_FILEHESABRESI):
    case REQUEST(ACTION_TYPES.DELETE_FILEHESABRESI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FILEHESABRESI_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FILEHESABRESI):
    case FAILURE(ACTION_TYPES.CREATE_FILEHESABRESI):
    case FAILURE(ACTION_TYPES.UPDATE_FILEHESABRESI):
    case FAILURE(ACTION_TYPES.DELETE_FILEHESABRESI):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FILEHESABRESI_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FILEHESABRESI):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FILEHESABRESI):
    case SUCCESS(ACTION_TYPES.UPDATE_FILEHESABRESI):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FILEHESABRESI):
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

const apiUrl = 'api/file-hesab-resis';

// Actions

export const getEntities: ICrudGetAllAction<IFileHesabResi> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FILEHESABRESI_LIST,
  payload: axios.get<IFileHesabResi>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IFileHesabResi> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FILEHESABRESI,
    payload: axios.get<IFileHesabResi>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFileHesabResi> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FILEHESABRESI,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFileHesabResi> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FILEHESABRESI,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFileHesabResi> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FILEHESABRESI,
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
