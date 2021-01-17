import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBankEtelaati, defaultValue } from 'app/shared/model/bank-etelaati.model';

export const ACTION_TYPES = {
  FETCH_BANKETELAATI_LIST: 'bankEtelaati/FETCH_BANKETELAATI_LIST',
  FETCH_BANKETELAATI: 'bankEtelaati/FETCH_BANKETELAATI',
  CREATE_BANKETELAATI: 'bankEtelaati/CREATE_BANKETELAATI',
  UPDATE_BANKETELAATI: 'bankEtelaati/UPDATE_BANKETELAATI',
  DELETE_BANKETELAATI: 'bankEtelaati/DELETE_BANKETELAATI',
  RESET: 'bankEtelaati/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBankEtelaati>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type BankEtelaatiState = Readonly<typeof initialState>;

// Reducer

export default (state: BankEtelaatiState = initialState, action): BankEtelaatiState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BANKETELAATI_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BANKETELAATI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_BANKETELAATI):
    case REQUEST(ACTION_TYPES.UPDATE_BANKETELAATI):
    case REQUEST(ACTION_TYPES.DELETE_BANKETELAATI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_BANKETELAATI_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BANKETELAATI):
    case FAILURE(ACTION_TYPES.CREATE_BANKETELAATI):
    case FAILURE(ACTION_TYPES.UPDATE_BANKETELAATI):
    case FAILURE(ACTION_TYPES.DELETE_BANKETELAATI):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_BANKETELAATI_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_BANKETELAATI):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_BANKETELAATI):
    case SUCCESS(ACTION_TYPES.UPDATE_BANKETELAATI):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_BANKETELAATI):
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

const apiUrl = 'api/bank-etelaatis';

// Actions

export const getEntities: ICrudGetAllAction<IBankEtelaati> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_BANKETELAATI_LIST,
    payload: axios.get<IBankEtelaati>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IBankEtelaati> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BANKETELAATI,
    payload: axios.get<IBankEtelaati>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IBankEtelaati> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BANKETELAATI,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBankEtelaati> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BANKETELAATI,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBankEtelaati> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BANKETELAATI,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
