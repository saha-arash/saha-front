import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IHesabResi, defaultValue } from 'app/shared/model/hesab-resi.model';

export const ACTION_TYPES = {
  FETCH_HESABRESI_LIST: 'hesabResi/FETCH_HESABRESI_LIST',
  FETCH_HESABRESI: 'hesabResi/FETCH_HESABRESI',
  CREATE_HESABRESI: 'hesabResi/CREATE_HESABRESI',
  UPDATE_HESABRESI: 'hesabResi/UPDATE_HESABRESI',
  DELETE_HESABRESI: 'hesabResi/DELETE_HESABRESI',
  RESET: 'hesabResi/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IHesabResi>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type HesabResiState = Readonly<typeof initialState>;

// Reducer

export default (state: HesabResiState = initialState, action): HesabResiState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_HESABRESI_LIST):
    case REQUEST(ACTION_TYPES.FETCH_HESABRESI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_HESABRESI):
    case REQUEST(ACTION_TYPES.UPDATE_HESABRESI):
    case REQUEST(ACTION_TYPES.DELETE_HESABRESI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_HESABRESI_LIST):
    case FAILURE(ACTION_TYPES.FETCH_HESABRESI):
    case FAILURE(ACTION_TYPES.CREATE_HESABRESI):
    case FAILURE(ACTION_TYPES.UPDATE_HESABRESI):
    case FAILURE(ACTION_TYPES.DELETE_HESABRESI):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_HESABRESI_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_HESABRESI):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_HESABRESI):
    case SUCCESS(ACTION_TYPES.UPDATE_HESABRESI):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_HESABRESI):
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

const apiUrl = 'api/hesab-resis';

// Actions

export const getEntities: ICrudGetAllAction<IHesabResi> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_HESABRESI_LIST,
  payload: axios.get<IHesabResi>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IHesabResi> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_HESABRESI,
    payload: axios.get<IHesabResi>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IHesabResi> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_HESABRESI,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IHesabResi> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_HESABRESI,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IHesabResi> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_HESABRESI,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
