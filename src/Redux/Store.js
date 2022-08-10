import {
    legacy_createStore as createStore,
    combineReducers,
    applyMiddleware,
  } from "redux";
  import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { getAllAddress, getSingleAddress } from "./Reducers";

const reducer = combineReducers({
    address: getAllAddress,
    addressById: getSingleAddress
})

const store = createStore(
    reducer,
    {},
    composeWithDevTools(applyMiddleware(thunk))
)

export default store