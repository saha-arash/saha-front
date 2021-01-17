import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBilanSeSalGhabl, defaultValue } from 'app/shared/model/bilan-se-sal-ghabl.model';

export const ACTION_TYPES = {
  FETCH_BILANSESALGHABL_LIST: 'bilanSeSalGhabl/FETCH_BILANSESALGHABL_LIST',
  FETCH_BILANSESALGHABL: 'bilanSeSalGhabl/FETCH_BILANSESALGHABL',
  CREATE_BILANSESALGHABL: 'bilanSeSalGhabl/CREATE_BILANSESALGHABL',
  UPDATE_BILANSESALGHABL: 'bilanSeSalGhabl/UPDATE_BILANSESALGHABL',
  DELETE_BILANSESALGHABL: 'bilanSeSalGhabl/DELETE_BILANSESALGHABL',
  RESET: 'bilanSeSalGhabl/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBilanSeSalGhabl>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type BilanSeSalGhablState = Readonly<typeof initialState>;

// Reducer

export default (state: BilanSeSalGhablState = initialState, action): BilanSeSalGhablState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BILANSESALGHABL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BILANSESALGHABL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_BILANSESALGHABL):
    case REQUEST(ACTION_TYPES.UPDATE_BILANSESALGHABL):
    case REQUEST(ACTION_TYPES.DELETE_BILANSESALGHABL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_BILANSESALGHABL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BILANSESALGHABL):
    case FAILURE(ACTION_TYPES.CREATE_BILANSESALGHABL):
    case FAILURE(ACTION_TYPES.UPDATE_BILANSESALGHABL):
    case FAILURE(ACTION_TYPES.DELETE_BILANSESALGHABL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_BILANSESALGHABL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_BILANSESALGHABL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_BILANSESALGHABL):
    case SUCCESS(ACTION_TYPES.UPDATE_BILANSESALGHABL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_BILANSESALGHABL):
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

const apiUrl = 'api/bilan-se-sal-ghabls';

// Actions

export const getEntities: ICrudGetAllAction<IBilanSeSalGhabl> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_BILANSESALGHABL_LIST,
    payload: axios.get<IBilanSeSalGhabl>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IBilanSeSalGhabl> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BILANSESALGHABL,
    payload: axios.get<IBilanSeSalGhabl>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IBilanSeSalGhabl> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BILANSESALGHABL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBilanSeSalGhabl> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BILANSESALGHABL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBilanSeSalGhabl> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BILANSESALGHABL,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
