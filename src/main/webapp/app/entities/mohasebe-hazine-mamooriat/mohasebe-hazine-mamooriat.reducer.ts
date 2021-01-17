import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMohasebeHazineMamooriat, defaultValue } from 'app/shared/model/mohasebe-hazine-mamooriat.model';

export const ACTION_TYPES = {
  FETCH_MOHASEBEHAZINEMAMOORIAT_LIST: 'mohasebeHazineMamooriat/FETCH_MOHASEBEHAZINEMAMOORIAT_LIST',
  FETCH_MOHASEBEHAZINEMAMOORIAT: 'mohasebeHazineMamooriat/FETCH_MOHASEBEHAZINEMAMOORIAT',
  CREATE_MOHASEBEHAZINEMAMOORIAT: 'mohasebeHazineMamooriat/CREATE_MOHASEBEHAZINEMAMOORIAT',
  UPDATE_MOHASEBEHAZINEMAMOORIAT: 'mohasebeHazineMamooriat/UPDATE_MOHASEBEHAZINEMAMOORIAT',
  DELETE_MOHASEBEHAZINEMAMOORIAT: 'mohasebeHazineMamooriat/DELETE_MOHASEBEHAZINEMAMOORIAT',
  RESET: 'mohasebeHazineMamooriat/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMohasebeHazineMamooriat>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type MohasebeHazineMamooriatState = Readonly<typeof initialState>;

// Reducer

export default (state: MohasebeHazineMamooriatState = initialState, action): MohasebeHazineMamooriatState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MOHASEBEHAZINEMAMOORIAT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MOHASEBEHAZINEMAMOORIAT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MOHASEBEHAZINEMAMOORIAT):
    case REQUEST(ACTION_TYPES.UPDATE_MOHASEBEHAZINEMAMOORIAT):
    case REQUEST(ACTION_TYPES.DELETE_MOHASEBEHAZINEMAMOORIAT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MOHASEBEHAZINEMAMOORIAT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MOHASEBEHAZINEMAMOORIAT):
    case FAILURE(ACTION_TYPES.CREATE_MOHASEBEHAZINEMAMOORIAT):
    case FAILURE(ACTION_TYPES.UPDATE_MOHASEBEHAZINEMAMOORIAT):
    case FAILURE(ACTION_TYPES.DELETE_MOHASEBEHAZINEMAMOORIAT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MOHASEBEHAZINEMAMOORIAT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_MOHASEBEHAZINEMAMOORIAT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MOHASEBEHAZINEMAMOORIAT):
    case SUCCESS(ACTION_TYPES.UPDATE_MOHASEBEHAZINEMAMOORIAT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MOHASEBEHAZINEMAMOORIAT):
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

const apiUrl = 'api/mohasebe-hazine-mamooriats';

// Actions

export const getEntities: ICrudGetAllAction<IMohasebeHazineMamooriat> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_MOHASEBEHAZINEMAMOORIAT_LIST,
    payload: axios.get<IMohasebeHazineMamooriat>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IMohasebeHazineMamooriat> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MOHASEBEHAZINEMAMOORIAT,
    payload: axios.get<IMohasebeHazineMamooriat>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMohasebeHazineMamooriat> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MOHASEBEHAZINEMAMOORIAT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMohasebeHazineMamooriat> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MOHASEBEHAZINEMAMOORIAT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMohasebeHazineMamooriat> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MOHASEBEHAZINEMAMOORIAT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
