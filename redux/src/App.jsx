
import { Provider } from 'react-redux'
import store from './reduxContainer/store.js'
import BookContainer from './reduxContainer/bookContainer.jsx'
function App() {

  return (
    <Provider store={store}>
      <div>
        <BookContainer/>
      </div>
    </Provider>
  )
}

export default App
