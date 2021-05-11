import {createStore, combineReducers} from 'redux'
import searchReducer from "./reducers/SearchReducer";
import graphReducer from "./reducers/GraphReducer";
import navReducer from "./reducers/NavReducer";

const rootReducer = combineReducers({
  searchReducer: searchReducer,
  graphReducer: graphReducer,
  navReducer: navReducer
})

const configureStore = () => createStore(rootReducer);

export default configureStore;
