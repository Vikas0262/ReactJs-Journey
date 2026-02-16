// redux store holds the global state of the application

import {createStore} from 'redux'
import bookReducer from './bookReducer'

const store = createStore(bookReducer);
export default store;