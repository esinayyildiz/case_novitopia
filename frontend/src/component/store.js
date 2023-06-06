import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import  KurulusListReducer, { KurulusCreateReducer, kurulusDeleteReducer, kurulusUpdateReducer } from '../reducer/KurulusListReducer'
import  {KurulusDetailsReducer} from '../reducer/KurulusListReducer'
import  {userDeleteReducer, userDetailReducer, userListRecuder, userRecuder, userRegisterRecuder, userUpdateProfileReducer, userUpdateReducer} from '../reducer/userReducer'
import { cartReducer } from '../reducer/cartReducer'


const reducer = combineReducers({
    kurulusList:KurulusListReducer,
    ListKurulusDetail:KurulusDetailsReducer,
    userLogin:userRecuder,
    userRegister:userRegisterRecuder,
    userDetails:userDetailReducer,
    userUpdateProfile:userUpdateProfileReducer,
    kurulusDelete:kurulusDeleteReducer,
    userList :userListRecuder,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,
    kurulusCreate:KurulusCreateReducer,
    kurulusUpdate:kurulusUpdateReducer,
    cart:cartReducer,


})
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;



const initialState ={
    cart:{
        cartItems:cartItemsFromStorage,


    },
    userLogin:{userInfo:userInfoFromStorage},
    userDetails:{user:userInfoFromStorage},
    userUpdateProfile:{success:userInfoFromStorage}
}
const middleware = [thunk]


const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middleware)))


export default store