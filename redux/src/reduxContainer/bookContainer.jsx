import react from 'react'
import { useSelector,useDispatch } from 'react-redux'
import purcheseBook from '../reduxContainer/bookAction.js'
const BookContainer = () => {
    const number_of_books= useSelector(state => state.numberOfBooks)// useSelector hook accepts a function as a parameter and that function receives the state as an argument and useSelecor hook returns the value
    const dispatch = useDispatch();
    return (
        <div>
            <h1>book container</h1>
            <p>Number of books  {number_of_books}</p>
            <button onClick={()=>{dispatch(purcheseBook())}}>buy book</button>
        </div>
    )
} 
export default BookContainer