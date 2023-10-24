import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
export const GET_ARTICLE = 'GET_ARTICLE'
export const GET_USER_ARTICLE='GET_USER_ARTICLE'
export const EDIT_ARTICLE='EDIT_ARTICLE'
export const ADD_ARTICLE='ADD_ARTICLE'
export const SEARCH_DATA='SEARCH_DATA'
export const SET_EDIT_ID='SET_EDIT_ID'
export const DELETE_ARTICLE='DELETE_ARTICLE'
export const SORT_DATA='SORT_DATA'

const getArticles=(article)=>{
    return{
        type:GET_ARTICLE,
        payload:article
    }
}
export const startGetAllArticles =()=>{
    return(dispatch)=>{
        (
            async()=>{
                try {
                    const response=await axios.get('http://localhost:3004/api/listall',{ headers: { authorization: localStorage.getItem("token") }})
                    dispatch(getArticles(response.data))
                } catch (err) {
                    alert(err)
                }
            }
        )()
    }
}

const getUserArticles=(article)=>{
    return{
        type:GET_USER_ARTICLE,
        payload:article
    }
}
export const startGetUserArticles = (userId) =>{
    return(dispatch)=>{
        (
            async()=>{
                try {
                    const response= await axios.get(`http://localhost:3004/api/list/${userId}`,{ headers: { authorization: localStorage.getItem("token") }})
                    dispatch(getUserArticles(response.data))
                } catch (err) {
                    alert(err)
                }
            }
        )()
    }
}

const addArticle=(article)=>{
    return{
        type:ADD_ARTICLE,
        payload:article
    }
}
export const startAddUserArticle =(formData,reset)=>{
    return(dispatch)=>{
        (
            async()=>{
                try {
                    const response = await axios.post('http://localhost:3004/api/article',formData,{ headers: { authorization: localStorage.getItem("token") }})
                    dispatch(addArticle(response.data))
                    reset()
                    toast.success('Article Posted Successfully', {
                        position: "top-right",
                        autoClose: 1000,
                        theme: "colored"
                        });
                } catch (err) {
                    toast.error(err, {
                        position: "top-right",
                        autoClose: 1000,
                        theme: "colored"
                        });
                }
            }
        )()
    }
}

const setEditArticle=(article)=>{
    return{
        type:EDIT_ARTICLE,
        payload:article
    }  
}
export const startEditArticle =(formData,reset,id)=>{
    return(dispatch)=>{
        (
            async()=>{
                try {
                    const article=await axios.put(`http://localhost:3004/api/update/${id}`,formData,{ headers: { authorization: localStorage.getItem("token") }})
                    dispatch(setEditArticle(article.data))
                    reset()
                    toast.success('Edit Successfully', {
                        position: "top-right",
                        autoClose: 1000,
                        theme: "colored"
                        });
                } catch (err) {
                    toast.error(err, {
                        position: "top-right",
                        autoClose: 1000,
                        theme: "colored"
                        });
                }
            }
        )()
    }
}

const setEditId=(id)=>{
    return{
        type:SET_EDIT_ID,
        payload:id
    }  
}
export const startSetEditId =(id)=>{
    return(dispatch)=>{
        (
            async()=>{
                try {
                    if(id){
                        const article=await axios.get(`http://localhost:3004/api/article/${id}`,{ headers: { authorization: localStorage.getItem("token") }})
                        dispatch(setEditId(article.data._id))
                    }else{
                        dispatch(setEditId(''))
                    }
                } catch (err) {
                    alert(err)
                }
            }
        )()
    }
}


const searchData=(article)=>{
    return{
        type:SEARCH_DATA,
        payload:article
    }
}
export const startGetSearchedArticles = (value)=>{
    return (dispatch)=>{
        (   
            async()=>{
                try {
                    const response = await axios.get(`http://localhost:3004/api/articles/search?search=${value}`,{ headers: { authorization: localStorage.getItem("token") }})
                    dispatch(searchData(response.data))
                } catch (err) {
                    alert(err)          
                }
            }
        )()
    }
}

const sortData=(select)=>{
    return{
        type:SORT_DATA,
        payload:select
    }
}
export const startSortArticle=(select)=>{
    return(dispatch)=>{
        (
            async()=>{
                try {
                    const response = await axios.get(`http://localhost:3004/api/filter/sort?type=${select}`,{headers:{authorization:localStorage.getItem("token")}})
                    dispatch(sortData(response.data))
                } catch (err) {
                    alert(err)
                }
            }
        )()
    }
}

const deleteArticle=(article)=>{
    return{
        type:DELETE_ARTICLE,
        payload:article
    }
}
export const startDeleteArticle=(id)=>{
    return(dispatch)=>{
        (
            async()=>{
                try {
                    const response=await axios.delete(`http://localhost:3004/api/delete/${id}`,{ headers: { authorization: localStorage.getItem("token") }})
                    dispatch(deleteArticle(response.data))
                    toast.info('Post Deleted Permently', {
                        position: "top-right",
                        autoClose: 1000,
                        theme: "colored"
                        });
                } catch (err) {
                    toast.error(err, {
                        position: "top-right",
                        autoClose: 1000,
                        theme: "colored"
                        });
                }
            }
        )()
    }
}