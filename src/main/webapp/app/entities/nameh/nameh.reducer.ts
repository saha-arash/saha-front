import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { INameh, defaultValue } from 'app/shared/model/nameh.model';

export const ACTION_TYPES = {
  FETCH_NAMEH_LIST: 'nameh/FETCH_NAMEH_LIST',
  FETCH_NAMEH: 'nameh/FETCH_NAMEH',
  CREATE_NAMEH: 'nameh/CREATE_NAMEH',
  UPDATE_NAMEH: 'nameh/UPDATE_NAMEH',
  DELETE_NAMEH: 'nameh/DELETE_NAMEH',
  RESET: 'nameh/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<INameh>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type NamehState = Readonly<typeof initialState>;

// Reducer

export default (state: NamehState = initialState, action): NamehState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_NAMEH_LIST):
    case REQUEST(ACTION_TYPES.FETCH_NAMEH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_NAMEH):
    case REQUEST(ACTION_TYPES.UPDATE_NAMEH):
    case REQUEST(ACTION_TYPES.DELETE_NAMEH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_NAMEH_LIST):
    case FAILURE(ACTION_TYPES.FETCH_NAMEH):
    case FAILURE(ACTION_TYPES.CREATE_NAMEH):
    case FAILURE(ACTION_TYPES.UPDATE_NAMEH):
    case FAILURE(ACTION_TYPES.DELETE_NAMEH):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_NAMEH_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_NAMEH):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_NAMEH):
    case SUCCESS(ACTION_TYPES.UPDATE_NAMEH):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_NAMEH):
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

const apiUrl = 'api/namehs';

// Actions

export const getEntities: ICrudGetAllAction<INameh> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_NAMEH_LIST,
    payload: axios.get<INameh>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<INameh> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_NAMEH,
    payload: axios.get<INameh>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<INameh> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_NAMEH,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<INameh> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_NAMEH,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<INameh> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_NAMEH,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
