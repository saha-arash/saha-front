import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBarnameHesabResi, defaultValue } from 'app/shared/model/barname-hesab-resi.model';

export const ACTION_TYPES = {
  FETCH_BARNAMEHESABRESI_LIST: 'barnameHesabResi/FETCH_BARNAMEHESABRESI_LIST',
  FETCH_BARNAMEHESABRESI: 'barnameHesabResi/FETCH_BARNAMEHESABRESI',
  CREATE_BARNAMEHESABRESI: 'barnameHesabResi/CREATE_BARNAMEHESABRESI',
  UPDATE_BARNAMEHESABRESI: 'barnameHesabResi/UPDATE_BARNAMEHESABRESI',
  DELETE_BARNAMEHESABRESI: 'barnameHesabResi/DELETE_BARNAMEHESABRESI',
  RESET: 'barnameHesabResi/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBarnameHesabResi>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type BarnameHesabResiState = Readonly<typeof initialState>;

// Reducer

export default (state: BarnameHesabResiState = initialState, action): BarnameHesabResiState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BARNAMEHESABRESI_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BARNAMEHESABRESI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_BARNAMEHESABRESI):
    case REQUEST(ACTION_TYPES.UPDATE_BARNAMEHESABRESI):
    case REQUEST(ACTION_TYPES.DELETE_BARNAMEHESABRESI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_BARNAMEHESABRESI_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BARNAMEHESABRESI):
    case FAILURE(ACTION_TYPES.CREATE_BARNAMEHESABRESI):
    case FAILURE(ACTION_TYPES.UPDATE_BARNAMEHESABRESI):
    case FAILURE(ACTION_TYPES.DELETE_BARNAMEHESABRESI):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_BARNAMEHESABRESI_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_BARNAMEHESABRESI):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_BARNAMEHESABRESI):
    case SUCCESS(ACTION_TYPES.UPDATE_BARNAMEHESABRESI):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_BARNAMEHESABRESI):
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

const apiUrl = 'api/barname-hesab-resis';

// Actions

export const getEntities: ICrudGetAllAction<IBarnameHesabResi> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_BARNAMEHESABRESI_LIST,
  payload: axios.get<IBarnameHesabResi>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IBarnameHesabResi> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BARNAMEHESABRESI,
    payload: axios.get<IBarnameHesabResi>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IBarnameHesabResi> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BARNAMEHESABRESI,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBarnameHesabResi> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BARNAMEHESABRESI,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBarnameHesabResi> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BARNAMEHESABRESI,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
