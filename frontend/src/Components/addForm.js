import { useDispatch } from "react-redux"
import AddArticle from "./addArticle"
import { startAddUserArticle } from "../Actions/articleAction"

const AddForm=(props)=>{

    const dispatch=useDispatch()

    const submitForm=(formData,reset)=>{
        dispatch(startAddUserArticle(formData,reset))
    }

    return(
        <div>
            <AddArticle submitForm={submitForm} />
        </div>
    )
}
export default AddForm