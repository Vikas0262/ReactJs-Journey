# React Router DOM - Complete Guide

## 📚 Table of Contents
1. [Version Information](#version-information)
2. [React Router vs React Router DOM](#react-router-vs-react-router-dom)
3. [Introduction](#introduction)
4. [Routing Basics](#routing-basics)
5. [Navigation Components](#navigation-components)
6. [Loader in React Router](#loader-in-react-router)
7. [Outlet Component](#outlet-component)
8. [Difference Between Components](#difference-between-components)
9. [Interview Questions](#interview-questions)

---

## Version Information

### Latest React Router DOM Version

**Current Version:** `v6.x.x` (Latest stable)

### Installation

```bash
npm install react-router-dom
# or
yarn add react-router-dom
```

### Version History Important Notes:

| Version | Release Date | Key Changes |
|---------|--------------|-------------|
| **v6.0+** | July 2021 | RouterProvider + createBrowserRouter, BrowserRouter less recommended | 
| **v5.x** | March 2020 | BrowserRouter + Routes component pattern (older way) |
| **v4.x** | Old versions | Legacy routing approach |

### Important: BrowserRouter Deprecation Pattern

❌ **NOT USED AFTER v6:** While BrowserRouter still works in React Router v6+, it is **no longer the recommended approach**.

- **Before v6:** BrowserRouter was the primary way to set up routing
- **From v6 onwards:** RouterProvider + createBrowserRouter is the recommended pattern
- **Why?** The new approach gives better control, flexibility, and is more suitable for modern applications

```jsx
// ❌ Old Way (Still works, but not recommended in v6+)
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// ✅ New Way (Recommended in v6+)
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
```

---

## React Router vs React Router DOM

### What is the Difference?

**React Router** and **React Router DOM** are two different packages:

| Feature | React Router | React Router DOM |
|---------|--------------|------------------|
| **Package Name** | `react-router` | `react-router-dom` |
| **Purpose** | Core routing library (framework agnostic) | Web-specific routing for React |
| **Use Case** | Universal routing logic, can be used in React Native, Remix, etc. | Only for browser-based React applications |
| **Components** | Provides core routing components | Provides browser-specific components (Link, NavLink, useNavigate) |
| **Installation** | `npm install react-router` | `npm install react-router-dom` |
| **Who Uses It** | React Native, Electron, Universal apps | Web applications |
| **Exports** | Routes, Route, Switch, match, history | Everything from react-router + Link, NavLink, BrowserRouter, etc. |

### When to Use Which?

**Use React Router DOM when:**
- Building web applications with React
- You need browser-specific components like `<Link>`, `<NavLink>`
- You're using standard React for the browser

```jsx
// For Web Applications
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
```

**Use React Router when:**
- You're building universal/isomorphic applications
- You're using React Native
- You're using Remix or other frameworks

```jsx
// For React Native or Universal apps
import { useParams, useNavigate } from 'react-router';
```

### In Most Cases

For web development, **always use `react-router-dom`** because:
- It includes everything you need for the browser
- It automatically includes React Router as a dependency
- It provides browser-specific features

```jsx
// This is what you'll use 99% of the time
import { RouterProvider, createBrowserRouter, Link, NavLink } from 'react-router-dom';
```

---

## Introduction

### RouterProvider and React Router DOM

**Key Points:**

To handle routing in React Router DOM, you need to use **RouterProvider**.
- RouterProvider takes a prop: `router={router}`
- You create the router variable first, and define all routes inside it

```jsx
import { RouterProvider } from 'react-router-dom';
import router from './router';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

---

## Routing Basics

### 1️⃣ createBrowserRouter - Array Method

To create a router, we use **createBrowserRouter**.
- It is a function that takes an array of route objects
- Inside each object, we define the `path` and `element`

**Example:**

```jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Home from './components/Home/Home';
import About from './components/About/About';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ]
  }
]);

export default router;
```

### 2️⃣ createRoutesFromElements - JSX Method

There is another way to define routes:
- We still use **createBrowserRouter**
- But we pass **createRoutesFromElements** inside it
- Inside createRoutesFromElements, we use the `<Route />` component and pass `path` and `element` props

**Example:**

```jsx
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Home from './components/Home/Home';
import About from './components/About/About';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      <Route path='user/:userid' element={<User />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

---

## Navigation Components

### Link Component

**What is it:**
- Basic navigation element
- Replaces the anchor tag
- Page does not reload (SPA behavior)

**Example:**

```jsx
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}
```

### NavLink Component

**What is it:**
- Advanced version of Link
- **Automatically provides active styling**
- Can identify the current route

**Example:**

```jsx
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <nav>
      <NavLink 
        to="/" 
        className={({ isActive }) => 
          isActive ? "text-blue-600 font-bold" : "text-gray-600"
        }
      >
        Home
      </NavLink>
      
      <NavLink 
        to="/about"
        className={({ isActive }) => 
          isActive ? "text-blue-600 font-bold" : "text-gray-600"
        }
      >
        About
      </NavLink>
    </nav>
  );
}
```

### useNavigate Hook

**What is it:**
- Used for programmatic navigation
- Used to navigate based on events or conditions

**Example:**

```jsx
import { useNavigate } from 'react-router-dom';

function LoginButton() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Login logic here
    navigate('/dashboard'); // Send user to dashboard
  };

  return <button onClick={handleLogin}>Login</button>;
}
```

### useParams Hook

**What is it:**
- Used to access URL parameters
- Used to extract data from dynamic routes

**Example:**

```jsx
import { useParams } from 'react-router-dom';

function User() {
  const { userid } = useParams();
  
  return <div>User: {userid}</div>;
}

// Route definition:
// <Route path='user/:userid' element={<User />} />
```

---

## Loader in React Router

### What is Loader?

**Key Points:**
- **Loader => Fetches data before component renders**
- When a user clicks on a route, the component does not render until data is loaded
- This is *different from useEffect*
- In useEffect, the component renders first, then data loads
- In Loader, data loads first, then the component renders

### Loader Example:

```jsx
// Define loader function
export const githubInfoLoader = async () => {
  const response = await fetch('https://api.github.com/users/octocat');
  return response.json();
};

// Use in route
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='github'
      element={<Github />}
      loader={githubInfoLoader}
    />
  )
);

// Access loader data in component
import { useLoaderData } from 'react-router-dom';

function Github() {
  const data = useLoaderData();
  
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.bio}</p>
    </div>
  );
}
```

### Loader with Lambda Function:

```jsx
<Route
  path='github'
  element={<Github />}
  loader={() => githubInfoLoader()}
/>
```

---

## BrowserRouter Component

### What is BrowserRouter?

**Note:** 
- **BrowserRouter** is the old way to do routing
- **RouterProvider + createBrowserRouter** is the new way (recommended)
- In BrowserRouter, you define individual Routes with the Routes element

### BrowserRouter Example (Old Way):

```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
```

---

## Outlet Component

### What is Outlet?

**Key Points:**
- **Outlet** is used to render child routes
- We place Outlet in the parent layout component
- Where Outlet is placed, the matched child route element will be rendered

**Real World Example:**

```
Layout Component
├── Header (NavBar)
├── <Outlet /> ← Child routes render here
└── Footer
```

### Outlet Implementation:

```jsx
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

export const Layout = () => {
  return (
    <>
      <Header />
      {/* Outlet is used to render the matched child route */}
      <Outlet />
      <Footer />
    </>
  );
};
```

### Route Structure with Outlet:

```jsx
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      {/* These child routes will render in the <Outlet /> */}
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
    </Route>
  )
);
```

---

## Difference Between Components

| Feature | Link | NavLink | useNavigate |
|---------|------|---------|-------------|
| **Type** | Component | Component | Hook |
| **Use Case** | Simple navigation links | Active route tracking | Programmatic navigation |
| **Active Styling** | ❌ No | ✅ Yes (isActive) | ❌ No |
| **On Click** | Navigate to route | Navigate + track active | Call function, then navigate |
| **Arguments** | `to` prop | `to` prop | Path string |
| **Example** | `<Link to="/home">` | `<NavLink to="/home">` | `navigate('/home')` |
| **Syntax** | Declarative | Declarative | Imperative |

### Router Creation Methods Comparison

| Feature | Array Method | JSX Method |
|---------|-------------|-----------|
| **Function Used** | `createBrowserRouter([...])` | `createBrowserRouter(createRoutesFromElements(...))` |
| **Syntax** | Object notation | JSX components |
| **Readability** | Detailed and explicit | Clean and JSX-like |
| **Flexibility** | Good | Better for complex structures |
| **Nesting** | Nested objects | Nested JSX elements |
| **Example** | `{ path, element, children }` | `<Route path element><Route /></Route>` |

---

## Interview Questions

### ❓ Q1: What is RouterProvider?
**Answer:** RouterProvider is a component that wraps the entire app. It makes the router configuration available throughout the app and enables routing functionality.

### ❓ Q2: What is the difference between Link and NavLink?
**Answer:** 
- **Link:** Used for simple navigation when you don't need active styling
- **NavLink:** Comes with active route tracking and automatically provides active class/styling

### ❓ Q3: What are the benefits of Loader?
**Answer:** Loader fetches data before the component renders. This means the user doesn't see a loading state or empty page. Data loads first, then the component renders.

### ❓ Q4: What is the purpose of Outlet?
**Answer:** Outlet is used to render child routes in the parent component. We place Outlet in the Layout, and all child routes will render in place of the Outlet.

### ❓ Q5: What is the difference between the two methods of createBrowserRouter?
**Answer:**
- **Array Method:** Uses object arrays - more explicit
- **JSX Method:** Uses JSX syntax - more readable and maintainable

### ❓ Q6: How do you create Dynamic Routes?
**Answer:** 
```jsx
<Route path='user/:userid' element={<User />} />
// Access :userid using the useParams() hook
const { userid } = useParams();
```

### ❓ Q7: What is the difference between BrowserRouter and RouterProvider + createBrowserRouter?
**Answer:** 
- BrowserRouter is the old way
- RouterProvider + createBrowserRouter is the new way which is more flexible
- You should use RouterProvider in new projects

### ❓ Q8: What is the use of useNavigate hook?
**Answer:** It is used for programmatic navigation. When you need to redirect after an event or condition, you use the useNavigate hook.

```jsx
const navigate = useNavigate();
const handleSubmit = () => {
  // Form submit logic
  navigate('/success');
};
```

### ❓ Q9: What is the syntax for creating Nested Routes?
**Answer:** 
```jsx
<Route path='/' element={<Layout />}>
  <Route path='about' element={<About />} />
  <Route path='contact' element={<Contact />} />
  {/* These routes are nested inside the parent */}
</Route>
```

### ❓ Q10: How do you extract parameters from the URL?
**Answer:** Use the `useParams()` hook:
```jsx
const { userid } = useParams();
// Get the parameter from :userid in the URL
```

### ❓ Q11: How do you prevent redirect/navigation?
**Answer:** Using `useBlocker` or `useBeforeUnload`, or through form validation

### ❓ Q12: Can we use both loader and useEffect?
**Answer:** Yes, but it's better to use loader because:
- In Loader, data loads first
- In useEffect, the component renders first then data loads
- Using both can lead to unnecessary requests

---

## Practical Project Structure

```
react-router/
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── Layout.jsx (Parent component with Outlet)
│   └── components/
│       ├── Header/Header.jsx (Uses NavLink)
│       ├── Home/Home.jsx
│       ├── About/About.jsx
│       ├── Contact/Contact.jsx
│       ├── User/User.jsx (Dynamic route with useParams)
│       ├── Github/Github.jsx (Uses Loader)
│       └── Footer/Footer.jsx
```

---

## Summary

✅ **Router Setup:** RouterProvider + createBrowserRouter  
✅ **Navigation:** Link (simple), NavLink (active tracking)  
✅ **Programmatic:** useNavigate hook  
✅ **Dynamic Routes:** useParams hook  
✅ **Data Fetching:** Loader function  
✅ **Layout:** Outlet component  
✅ **Route Definition:** Array or JSX methods
✅ **Latest Version:** React Router DOM v6+
✅ **Recommended Setup:** RouterProvider + createBrowserRouter (not BrowserRouter)

---

**Happy Routing! 🚀**
