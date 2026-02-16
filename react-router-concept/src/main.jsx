// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import About from './components/About/About.jsx'
import { Layout } from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import Contact from './components/Contact/Contact.jsx'
import User from './components/User/User.jsx'
import Github, { githubInfoLoader } from './components/Github/Github.jsx'

//createBrowserRouter takes an array of route objects.
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/about",
//         element: <About />,
//       },
//       {
//         path: "/contact",
//         element: <Contact />,
//       }
//     ]
//   }
// ])

// 2nd way
const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />}>
    <Route index element={<Home />} />
    <Route path='about' element={<About />} />
    <Route path='contact' element={<Contact />} />
    <Route path='user/:userid' element={<User />} />
    <Route
      loader={()=>{
        return githubInfoLoader();
      }}
      path='github'
      element={<Github />}
    />
    {/* Loader => Fetches data before component renders when user clicks the route
        Unlike useEffect, data loads immediately (not after render)
        Results are cached to prevent repeated API calls
    */}

  </Route>
))

createRoot(document.getElementById('root')).render(
  // this is old way
  // <BrowserRouter>
  //   <App />
  // </BrowserRouter>,
  <RouterProvider router={router} />
)
