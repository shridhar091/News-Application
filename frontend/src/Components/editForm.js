import { useDispatch } from "react-redux"
import AddArticle from "./addArticle"
import { startEditArticle, startSetEditId } from "../Actions/articleAction"

const EditForm =(props)=>{

    const dispatch=useDispatch()

    const submitForm=(formData,reset,id)=>{
        dispatch(startEditArticle(formData,reset,id))
        dispatch(startSetEditId(''))
    }
    return(
        <div>
            <AddArticle submitForm={submitForm} />
        </div>
    )
}

export default EditForm