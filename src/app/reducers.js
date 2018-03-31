import { combineReducers } from "redux"
import homeReducer from '../views/home/reducer'
//GENERATE_WRITE_IMPORT

/**
 * Defines mapping of individual view reducers to global state object.
 *
 * Every time a new view is created, entry for that view's reducer is required here.
 *
 * @type {Reducer<any>}
 */
export const reducers = combineReducers({
  home: homeReducer,
  //GENERATE_WRITE_REDUCER
});