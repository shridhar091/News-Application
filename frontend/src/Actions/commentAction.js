import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
export const ADD_COMMENT='ADD_COMMENT'
export const GET_COMMENT='GET_COMMENT'

const setComment=(comment)=>{
    return{
        type:ADD_COMMENT,
        payload:comment
    }
}
export const startCreateComment = (formData) => {
  return (dispatch) => {
    (async () => {
      try {
        const response = await axios.post(
          `http://localhost:3004/api/comment`,
          formData,
          { headers: { authorization: localStorage.getItem("token") } }
        );
        dispatch(setComment(response.data))
        toast.success('Comment Posted Successfully', {
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
    })();
  };
};

const getComment=(comment)=>{
    return{
        type:GET_COMMENT,
        payload:comment
    }
}
export const startGetAllComments=()=>{
    return(dispatch)=>{
        (
            async()=>{
                try {
                    const response = await axios.get('http://localhost:3004/api/comments',{ headers: { authorization: localStorage.getItem("token") }})
                    dispatch(getComment(response.data))
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