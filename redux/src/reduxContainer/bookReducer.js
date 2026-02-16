import { buy_book } from "./bookTypes"

// it can only one reducer for one feature
const initialState = {
    numberOfBooks: 20
}

// accect two parameter 
const bookReducer =(state = initialState, action)=>{
    // generally we wrtie switch case  statement

    switch(action.type){
        case buy_book: return {...state, numberOfBooks : state.numberOfBooks-1}
        default: return state
    }
}

export default bookReducer;