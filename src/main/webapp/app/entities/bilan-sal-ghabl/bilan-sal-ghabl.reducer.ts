import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBilanSalGhabl, defaultValue } from 'app/shared/model/bilan-sal-ghabl.model';

export const ACTION_TYPES = {
  FETCH_BILANSALGHABL_LIST: 'bilanSalGhabl/FETCH_BILANSALGHABL_LIST',
  FETCH_BILANSALGHABL: 'bilanSalGhabl/FETCH_BILANSALGHABL',
  CREATE_BILANSALGHABL: 'bilanSalGhabl/CREATE_BILANSALGHABL',
  UPDATE_BILANSALGHABL: 'bilanSalGhabl/UPDATE_BILANSALGHABL',
  DELETE_BILANSALGHABL: 'bilanSalGhabl/DELETE_BILANSALGHABL',
  RESET: 'bilanSalGhabl/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBilanSalGhabl>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type BilanSalGhablState = Readonly<typeof initialState>;

// Reducer

export default (state: BilanSalGhablState = initialState, action): BilanSalGhablState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BILANSALGHABL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BILANSALGHABL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_BILANSALGHABL):
    case REQUEST(ACTION_TYPES.UPDATE_BILANSALGHABL):
    case REQUEST(ACTION_TYPES.DELETE_BILANSALGHABL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_BILANSALGHABL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BILANSALGHABL):
    case FAILURE(ACTION_TYPES.CREATE_BILANSALGHABL):
    case FAILURE(ACTION_TYPES.UPDATE_BILANSALGHABL):
    case FAILURE(ACTION_TYPES.DELETE_BILANSALGHABL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_BILANSALGHABL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_BILANSALGHABL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_BILANSALGHABL):
    case SUCCESS(ACTION_TYPES.UPDATE_BILANSALGHABL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_BILANSALGHABL):
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

const apiUrl = 'api/bilan-sal-ghabls';

// Actions

export const getEntities: ICrudGetAllAction<IBilanSalGhabl> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_BILANSALGHABL_LIST,
    payload: axios.get<IBilanSalGhabl>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IBilanSalGhabl> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BILANSALGHABL,
    payload: axios.get<IBilanSalGhabl>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IBilanSalGhabl> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BILANSALGHABL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBilanSalGhabl> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BILANSALGHABL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBilanSalGhabl> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BILANSALGHABL,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
