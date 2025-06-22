import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import userContext from './UserContext';
function App() {

  return (
    <div>
      <h1>Context API Example</h1>
      <userContext.Provider value={{firstName: 'vikas', lastName: 'vishwakarma'}}>
      Hello i
        <Navbar />
        <Footer/>
      </userContext.Provider>
      {/* The context provider should wrap the components that need access to the context */}
  
    </div>
  )
}

export default App
