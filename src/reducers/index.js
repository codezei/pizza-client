import {combineReducers, createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"
import {productsReducer} from "./productsReducer.js"
import {userReducer} from "./userReducer.js"
import {appReducer} from "./appReducer.js"
import {cartReducer} from "./cartReducer.js"
import {orderReducer} from "./orderReducer.js"


const rootReducer = combineReducers({
    products: productsReducer,
    user: userReducer,
    app: appReducer,
    cart: cartReducer,
    order: orderReducer
    
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store