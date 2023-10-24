import {createStore,combineReducers ,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import articleReducer from '../Reducers/articleReducer'
import { userReducer } from '../Reducers/userReducer'
import { commentReducer } from '../Reducers/commentReducer'

const configureStore = () =>{
    const store = createStore(combineReducers({
        comment:commentReducer,
        article:articleReducer,
        user:userReducer
    }),applyMiddleware(thunk))
    return store
}
export default configureStore