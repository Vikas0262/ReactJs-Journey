
import React from 'react'
import './App.css'
import DataTable from './components/DataTable'
// React.lazy() is a function that allows you to load a component lazily, which means that the component will only be loaded when it is needed. This can help to improve the performance of your application by reducing the initial load time.
const LazyComponent = React.lazy(() => import('./LazyComponent'))

function App() {

  return (
    <>
      <h1>Learning Lazy Loading in React</h1>

      {/* suspense = React.Suspense provides a fallback which used to display a loading indicator while the lazy component is being loaded */}
      <React.Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </React.Suspense>
      
      <hr style={{ margin: '40px 0' }} />
      
      <DataTable />
    </>
  )
}

export default App
