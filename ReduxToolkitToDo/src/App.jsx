
import './App.css'
import AddTodo from './components/AddTodo'
import Todos from './components/Todos'

function App() {
  
  return (
    <div>
      <h1 className='text-red-500 text-2xl font-bold'>Learn About The Redux ToolKit</h1>
      <AddTodo />
      <Todos />
    </div>
  )
}

export default App
