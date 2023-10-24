import { SET_USER } from "../Actions/userAction"
const initialUserState = {
    data:{}
}

export const userReducer = (state = initialUserState, action)=>{
    switch(action.type){
        case SET_USER : {
            return {...state, data:action.payload}
        }
        default:{
            return {...state}
        }
    }
}