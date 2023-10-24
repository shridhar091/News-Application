import { ADD_ARTICLE, DELETE_ARTICLE, EDIT_ARTICLE, GET_ARTICLE, GET_USER_ARTICLE, SEARCH_DATA, SET_EDIT_ID, SORT_DATA } from "../Actions/articleAction"


const intialArticleState={
    data:[],
    searchData:[],
    editId:'',
    error:{}
}

const articleReducer=(state=intialArticleState,action)=>{
    switch(action.type){
        case GET_ARTICLE:{
            return{ ...state, data:action.payload }
        }
        case GET_USER_ARTICLE:{
            return{...state,data:action.payload}
        }
        case ADD_ARTICLE:{
            return  {...state, data:[...state.data, action.payload]}
        }
        case EDIT_ARTICLE : {
            return {...state,data:state.data.map((ele)=>{
                if(ele._id===action.payload._id){
                    return {...ele,...action.payload}
                }else{
                    return {...ele}
                }
            })}
        }
        case SET_EDIT_ID:{
            return {...state,editId:action.payload}
        }
        case SEARCH_DATA:{
            return {...state,searchData:action.payload}
        }
        case DELETE_ARTICLE:{
            return {...state,data:[...state.data.filter((ele)=>{
                return ele._id!==action.payload._id
            })]}
        }
        case SORT_DATA:{
            return {...state, data:action.payload}
        }
        default:{
            return{...state}
        }
    }
}

export default articleReducer