import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
export const SET_USER = "SET_USER"

export const startRegisterUser=(formData,props)=>{
    return (dispatch)=>{
        (
            async ()=>{
                try{
                    const user = await axios.post('http://localhost:3004/api/register',formData)
                    if(user.data._id){
                        toast.success('Registered Succesfully', {
                            position: "top-right",
                            autoClose: 1000,
                            theme: "colored",
                            });
                        props.history.push('/login')
                    }else if(user.data._message){
                        alert(user.data._message)
                    }
                }catch(err){
                    toast.error(err, {
                        position: "top-right",
                        autoClose: 1000,
                        theme: "colored",
                        });
                }
            }
        )()
    }
}

export const startLoginUser =(formData,reset,history)=>{
    return(dispatch)=>{
        (
            async ()=>{
                try {
                    const user = await axios.post('http://localhost:3004/api/login',formData)
                    localStorage.setItem('token',user.data.token)
                    if(localStorage.getItem('token')!=='undefined'){
                        reset()
                        toast.success('Logins Successfully', {
                            position: "top-right",
                            autoClose: 1000,
                            theme: "colored",
                            });
                        history.push('/')
                    }else{
                        toast.error('Invalid Email or Password', {
                            position: "top-right",
                            autoClose: 1000,
                            theme: "colored",
                            });
                    }
                } catch (err) {
                    toast.error(err, {
                        position: "top-right",
                        autoClose: 1000,
                        theme: "colored",
                        
                        });
                }
            }
        )()
    }
}

export const setLoggedInUser = (user)=>{
    return  {
        type:SET_USER,
        payload:user
    }
}
export const startGetLoggedInUser = () =>{
    return (dispatch)=>{
        (async ()=>{
            try{
                const response = await axios.get('http://localhost:3004/api/account',{headers:{"Authorization":localStorage.getItem('token')}})
                dispatch(setLoggedInUser(response.data))
            }catch(e){
                alert(e)
            }
        })()
    }
}