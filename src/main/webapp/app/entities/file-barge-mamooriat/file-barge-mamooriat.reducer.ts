import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFileBargeMamooriat, defaultValue } from 'app/shared/model/file-barge-mamooriat.model';

export const ACTION_TYPES = {
  FETCH_FILEBARGEMAMOORIAT_LIST: 'fileBargeMamooriat/FETCH_FILEBARGEMAMOORIAT_LIST',
  FETCH_FILEBARGEMAMOORIAT: 'fileBargeMamooriat/FETCH_FILEBARGEMAMOORIAT',
  CREATE_FILEBARGEMAMOORIAT: 'fileBargeMamooriat/CREATE_FILEBARGEMAMOORIAT',
  UPDATE_FILEBARGEMAMOORIAT: 'fileBargeMamooriat/UPDATE_FILEBARGEMAMOORIAT',
  DELETE_FILEBARGEMAMOORIAT: 'fileBargeMamooriat/DELETE_FILEBARGEMAMOORIAT',
  SET_BLOB: 'fileBargeMamooriat/SET_BLOB',
  RESET: 'fileBargeMamooriat/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFileBargeMamooriat>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type FileBargeMamooriatState = Readonly<typeof initialState>;

// Reducer

export default (state: FileBargeMamooriatState = initialState, action): FileBargeMamooriatState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FILEBARGEMAMOORIAT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FILEBARGEMAMOORIAT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FILEBARGEMAMOORIAT):
    case REQUEST(ACTION_TYPES.UPDATE_FILEBARGEMAMOORIAT):
    case REQUEST(ACTION_TYPES.DELETE_FILEBARGEMAMOORIAT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FILEBARGEMAMOORIAT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FILEBARGEMAMOORIAT):
    case FAILURE(ACTION_TYPES.CREATE_FILEBARGEMAMOORIAT):
    case FAILURE(ACTION_TYPES.UPDATE_FILEBARGEMAMOORIAT):
    case FAILURE(ACTION_TYPES.DELETE_FILEBARGEMAMOORIAT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FILEBARGEMAMOORIAT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FILEBARGEMAMOORIAT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FILEBARGEMAMOORIAT):
    case SUCCESS(ACTION_TYPES.UPDATE_FILEBARGEMAMOORIAT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FILEBARGEMAMOORIAT):
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

const apiUrl = 'api/file-barge-mamooriats';

// Actions

export const getEntities: ICrudGetAllAction<IFileBargeMamooriat> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FILEBARGEMAMOORIAT_LIST,
  payload: axios.get<IFileBargeMamooriat>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getFileBargeMamooriatsById: ICrudGetAllAction<IFileBargeMamooriat> = (page, size, sort, id) => ({
  type: ACTION_TYPES.FETCH_FILEBARGEMAMOORIAT_LIST,
  payload: axios.get<IFileBargeMamooriat>(`${apiUrl}/barge-mamooriat/${id}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IFileBargeMamooriat> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FILEBARGEMAMOORIAT,
    payload: axios.get<IFileBargeMamooriat>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFileBargeMamooriat> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FILEBARGEMAMOORIAT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getFileBargeMamooriatsById());
  return result;
};

export const updateEntity: ICrudPutAction<IFileBargeMamooriat> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FILEBARGEMAMOORIAT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getFileBargeMamooriatsById());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFileBargeMamooriat> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FILEBARGEMAMOORIAT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getFileBargeMamooriatsById());
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
