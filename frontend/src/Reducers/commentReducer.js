import { ADD_COMMENT , GET_COMMENT} from "../Actions/commentAction"


const initialCommentState = {
    data:[]
}

export const commentReducer = (state = initialCommentState, action)=>{
    switch(action.type){
        case ADD_COMMENT : {
            return {...state, data:[...state.data, action.payload]}
        }
        case GET_COMMENT:{
            return {...state, data:action.payload}
        }
        default:{
            return {...state}
        }
    }
}