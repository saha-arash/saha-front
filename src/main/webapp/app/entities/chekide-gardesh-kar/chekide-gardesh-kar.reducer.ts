import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IChekideGardeshKar, defaultValue } from 'app/shared/model/chekide-gardesh-kar.model';

export const ACTION_TYPES = {
  FETCH_CHEKIDEGARDESHKAR_LIST: 'chekideGardeshKar/FETCH_CHEKIDEGARDESHKAR_LIST',
  FETCH_CHEKIDEGARDESHKAR: 'chekideGardeshKar/FETCH_CHEKIDEGARDESHKAR',
  CREATE_CHEKIDEGARDESHKAR: 'chekideGardeshKar/CREATE_CHEKIDEGARDESHKAR',
  UPDATE_CHEKIDEGARDESHKAR: 'chekideGardeshKar/UPDATE_CHEKIDEGARDESHKAR',
  DELETE_CHEKIDEGARDESHKAR: 'chekideGardeshKar/DELETE_CHEKIDEGARDESHKAR',
  RESET: 'chekideGardeshKar/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IChekideGardeshKar>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ChekideGardeshKarState = Readonly<typeof initialState>;

// Reducer

export default (state: ChekideGardeshKarState = initialState, action): ChekideGardeshKarState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CHEKIDEGARDESHKAR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CHEKIDEGARDESHKAR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CHEKIDEGARDESHKAR):
    case REQUEST(ACTION_TYPES.UPDATE_CHEKIDEGARDESHKAR):
    case REQUEST(ACTION_TYPES.DELETE_CHEKIDEGARDESHKAR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CHEKIDEGARDESHKAR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CHEKIDEGARDESHKAR):
    case FAILURE(ACTION_TYPES.CREATE_CHEKIDEGARDESHKAR):
    case FAILURE(ACTION_TYPES.UPDATE_CHEKIDEGARDESHKAR):
    case FAILURE(ACTION_TYPES.DELETE_CHEKIDEGARDESHKAR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHEKIDEGARDESHKAR_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHEKIDEGARDESHKAR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CHEKIDEGARDESHKAR):
    case SUCCESS(ACTION_TYPES.UPDATE_CHEKIDEGARDESHKAR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CHEKIDEGARDESHKAR):
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

const apiUrl = 'api/chekide-gardesh-kars';

// Actions

export const getEntities: ICrudGetAllAction<IChekideGardeshKar> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_CHEKIDEGARDESHKAR_LIST,
    payload: axios.get<IChekideGardeshKar>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IChekideGardeshKar> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CHEKIDEGARDESHKAR,
    payload: axios.get<IChekideGardeshKar>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IChekideGardeshKar> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CHEKIDEGARDESHKAR,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IChekideGardeshKar> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CHEKIDEGARDESHKAR,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IChekideGardeshKar> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CHEKIDEGARDESHKAR,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
