# React Hooks Learning Notes

## Table of Contents
1. [useState](#usestate)
2. [useEffect](#useeffect)
3. [useContext](#usecontext)
4. [useReducer](#usereducer)
5. [Custom Hooks](#custom-hooks)

---

## useState

### Definition
`useState` is a Hook that lets you add state (memory) to functional components. State is a way to store and update data that affects what the component displays.

### Rules of Using Hooks ⚠️
1. **Must be inside function components** - Only call hooks inside React functional components
2. **Must import** - Always import the hook from React
3. **Must call at top level** - Call hooks at the top level of your component, not inside loops, conditions, or nested functions
4. **Cannot be conditional** - Don't call hooks inside if statements or any conditional logic

### Syntax
```jsx
const [state, setState] = useState(initialValue);
```
- `state` - Current value
- `setState` - Function to update the value
- `initialValue` - First value when component loads

### Basic Usage (Simple Example)
```jsx
import { useState } from 'react';

export const Counter = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>Count = {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```
✅ **Important**: Use `() => setCount(count + 1)` - wrap the update in an arrow function, don't call it directly!

---

### 🔴 Direct Update vs ✅ Functional Update

#### What is Direct Update? (❌ Can cause problems)
```jsx
const [count, setCount] = useState(0);

// WRONG - This is direct update
const increment = () => {
  setCount(count + 1); // Uses current value
  setCount(count + 1); // Still uses OLD value, not 2!
};
// Result: count becomes 1, not 2
```

#### What is Functional Update? (✅ Better way)
```jsx
const [count, setCount] = useState(0);

// CORRECT - This is functional update
const increment = () => {
  setCount((prevCount) => prevCount + 1); // Uses previous value
  setCount((prevCount) => prevCount + 1); // Uses updated value
};
// Result: count becomes 2 ✅
```

#### Comparison Table
| Aspect | Direct Update | Functional Update |
|--------|---------------|-------------------|
| **When to use** | Simple, one-time updates | When update depends on previous value |
| **Problem** | Stale state issues with multiple updates | Solves stale state problems |
| **Example** | `setCount(5)` | `setCount(prev => prev + 1)` |
| **Use Case** | Setting exact value | Incrementing/decrementing |

---

### Different Types of Initial State

#### 1️⃣ Primitive Values (Number, String, Boolean)
```jsx
const [count, setCount] = useState(0);           // Number
const [name, setName] = useState('');            // String
const [isActive, setIsActive] = useState(true);  // Boolean
```

#### 2️⃣ Objects
```jsx
const [user, setUser] = useState({
  firstname: 'vikas',
  lastname: 'vishwakarma'
});

// Update with spread operator (don't lose other properties)
const updateFirstname = () => {
  setUser({
    ...user,
    firstname: 'ankit'
  });
};
// ✅ This keeps lastname, only changes firstname
```

#### 3️⃣ Arrays
```jsx
const [items, setItems] = useState([]);

// Add new item
const addItem = () => {
  setItems([...items, `Item ${items.length + 1}`]);
};

// Remove item
const removeItem = (index) => {
  setItems(items.filter((_, i) => i !== index));
};
```

---

### Multiple State Variables
```jsx
// Separate states for different data
const [count, setCount] = useState(0);
const [string, setString] = useState('hello');
const [state, setState] = useState({ count: 0, click: 0 });
const [items, setItems] = useState([]);
```

**Better way**: Group related states together
```jsx
// Instead of multiple separate states
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [age, setAge] = useState(0);

// Do this - one state object
const [user, setUser] = useState({
  firstName: '',
  lastName: '',
  age: 0
});

// Update
const updateFirstName = () => {
  setUser((prevUser) => ({
    ...prevUser,
    firstName: 'Yoshita'
  }));
};
```

---

### ❌ Common Mistakes to Avoid

#### Mistake 1: Modifying State Directly
```jsx
// ❌ WRONG
const [count, setCount] = useState(0);
count = count + 1;  // This won't work!

// ✅ CORRECT
setCount(count + 1);  // Always use the setter function
```

#### Mistake 2: Forgetting to Initialize State
```jsx
// ❌ WRONG
const [user, setUser] = useState();
console.log(user.name);  // Error! user is undefined

// ✅ CORRECT
const [user, setUser] = useState({ name: '', age: 0 });
console.log(user.name);  // Works! user is an object
```

#### Mistake 3: Not Using Functional Update for Dependent Values
```jsx
// ❌ WRONG - Stale state issue
const handleClick = () => {
  setCount(count + 1);
  setCount(count + 1);
  // Only increments by 1, not 2
};

// ✅ CORRECT
const handleClick = () => {
  setCount((prev) => prev + 1);
  setCount((prev) => prev + 1);
  // Correctly increments by 2
};
```

#### Mistake 4: Calling setState Directly in JSX
```jsx
// ❌ WRONG
<button onClick={setCount(count + 1)}>Click</button>
// This calls setCount immediately!

// ✅ CORRECT
<button onClick={() => setCount(count + 1)}>Click</button>
// This only calls when button is clicked
```

#### Mistake 5: Too Many State Variables
```jsx
// ❌ WRONG
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
const [address, setAddress] = useState('');

// ✅ CORRECT
const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  address: ''
});
```

---

### Interview Tips 💡
1. **Why use useState?** - To store data that changes and cause re-renders when updated
2. **Why can't hooks be conditional?** - React relies on hook call order. Conditional calls change the order and break the logic
3. **What's the difference between direct and functional updates?** - Functional updates use the latest state value, preventing stale state issues
4. **When should you group state?** - When data is related or updated together
5. **Why immutability?** - React detects changes by comparing references. Direct mutations don't create new references, so React doesn't know to re-render

---

## useEffect

### Definition
`useEffect` is a Hook that allows you to perform **side effects** in function components. A **side effect** is anything that happens **after the component renders** but is **not part of the UI return**.

### What Are Side Effects? 
Things that happen outside the component's normal rendering:
- **Fetching data from an API**
- **Updating the DOM**
- **Running Timers** (setInterval, setTimeout)
- **Listening for user actions** (scrolling, resizing)
- **Cleaning up resources** (removing listeners, clearing intervals)

### Why Do We Need useEffect?
Function components don't have lifecycle methods like class components (`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`). **useEffect replaces all three lifecycle methods** in one hook!

### Syntax
```jsx
useEffect(() => {
  // Side effect code runs here
  // This runs after component renders
  
  return () => {
    // Cleanup function (optional)
    // Runs when component unmounts or before effect runs again
  };
}, [dependencies]); // Dependency array - controls when effect runs
```

### Three Dependency Array Patterns

#### 1️⃣ **No Dependency Array** → Runs after EVERY render ⚠️ (Usually bad!)
```jsx
useEffect(() => {
  console.log('Runs after EVERY render');
  setCount(count + 1);
  // Causes infinite loop!
});
```

#### 2️⃣ **Empty Dependency Array `[]`** → Runs ONCE on mount (Like componentDidMount)
```jsx
useEffect(() => {
  console.log('Runs only once when component mounts');
  // Perfect for fetching initial data
}, []);
```

#### 3️⃣ **Dependency Array with values `[dependency]`** → Runs when dependency changes
```jsx
useEffect(() => {
  console.log('Runs when "count" changes');
}, [count]);
```

---

### Basic Example - Simple Logger
```jsx
import { useState, useEffect } from 'react';

export const SimpleLogger = () => {
  const [number, setNumber] = useState(10);
  
  // Runs only when "number" changes
  useEffect(() => {
    console.log('Number changed:', number);
  }, [number]);
  
  return (
    <div>
      <h1>Number: {number}</h1>
      <button onClick={() => setNumber(number + 1)}>Increment</button>
    </div>
  );
};
```

---

### Example 1: Timer (from your code)
```jsx
const [count, setCount] = useState(0);

useEffect(() => {
  // React 18 Strict Mode runs useEffect twice
  const interval = setInterval(() => {
    setCount((prev) => prev + 1);
  }, 1000);
  
  // Cleanup function - clears interval when component unmounts
  return () => clearInterval(interval);
}, []); // Empty array = runs once on mount

return <div>Timer: {count}</div>;
```

**Why cleanup?** Without cleanup, the interval keeps running even after component unmounts → memory leak!

---

### Example 2: API Fetching (from your code)
```jsx
const [data, setData] = useState();

useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/todos')
    .then((response) => response.json())
    .then((json) => setData(json))
    .catch((error) => console.log(error));
}, []); // Empty array = fetch data only once on mount

return data ? <div>{data[0].title}</div> : <div>Loading...</div>;
```

**Key point:** Without `[]`, API would be called on every render → too many requests!

---

### Example 3: Debounce Search (from your code)
```jsx
const [searchTerm, setSearchTerm] = useState('');
const [debounceTerm, setDebounceTerm] = useState('');

useEffect(() => {
  // Wait 500ms after user stops typing
  const timeout = setTimeout(() => {
    setDebounceTerm(searchTerm);
  }, 500);
  
  // Cleanup: cancel timeout if user types again
  return () => clearTimeout(timeout);
}, [searchTerm]); // Runs when searchTerm changes

return (
  <div>
    <input 
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
    <p>Debounced term: {debounceTerm}</p>
  </div>
);
```

**What is debounce?** Wait for user to stop typing before making API call (improves performance)

---

### 🧹 Cleanup Function Explained
The **return statement** in useEffect is the cleanup function. It runs:
1. When the component **unmounts** (leaves the page)
2. **Before** the effect runs again (if dependency changed)

```jsx
useEffect(() => {
  // Setup
  const interval = setInterval(() => console.log('running'), 1000);
  
  // Cleanup
  return () => {
    clearInterval(interval); // Stop the interval
  };
}, []);
```

**Cleanup is essential for:**
- Clearing intervals/timeouts
- Removing event listeners
- Cancelling API requests
- Closing websocket connections

---

### ❌ Common Mistakes to Avoid

#### Mistake 1: Updating State Without Dependency Array
```jsx
// ❌ WRONG - Infinite loop!
useEffect(() => {
  setCount(count + 1); // No dependency array
  // Runs after every render → triggers re-render → runs again...
});

// ✅ CORRECT
useEffect(() => {
  setCount((prev) => prev + 1);
}, [count]); // Only runs when count changes
```

#### Mistake 2: Forgetting Cleanup Function
```jsx
// ❌ WRONG - Memory leak!
useEffect(() => {
  const interval = setInterval(() => {
    console.log('running');
  }, 1000);
  // No cleanup → interval keeps running forever
}, []);

// ✅ CORRECT
useEffect(() => {
  const interval = setInterval(() => {
    console.log('running');
  }, 1000);
  return () => clearInterval(interval);
}, []);
```

#### Mistake 3: Calling API Without Dependency Array
```jsx
// ❌ WRONG - Fetches on every render!
useEffect(() => {
  fetch(url).then(r => r.json()).then(data => setData(data));
  // No dependency array = keeps fetching
});

// ✅ CORRECT
useEffect(() => {
  fetch(url).then(r => r.json()).then(data => setData(data));
}, []); // Fetch only once on mount
```

#### Mistake 4: Missing Dependencies
```jsx
// ❌ WRONG - Uses stale data!
useEffect(() => {
  console.log(count);
}, []); // count is never updated, always logs 0

// ✅ CORRECT
useEffect(() => {
  console.log(count);
}, [count]); // Logs current count value
```

#### Mistake 5: Not Using .catch() for API Errors
```jsx
// ❌ WRONG
.then((error) => console.log(error))  // This is NOT error handling!

// ✅ CORRECT
.catch((error) => console.log(error))  // Use .catch() for errors
```

---

### Interview Tips 💡

1. **What's a side effect?** - Any code that runs after render but isn't part of returning JSX (API calls, timers, DOM updates)

2. **Why empty dependency array?** - Runs once on component mount. Perfect for fetching initial data without infinite loops

3. **What's the cleanup function?** - Returns a function that cleans up resources before effect runs again or component unmounts. Prevents memory leaks

4. **Stale state problem?** - Using a state variable inside useEffect without including it in dependencies. Effect uses old value

5. **useEffect vs useLayoutEffect?** - useEffect runs after render (safer), useLayoutEffect runs before browser paint (for DOM measurements)

6. **Can you fetch data on every render?** - No! That causes performance issues. Use empty `[]` to fetch once, or add specific dependencies

7. **React 18 Strict Mode?** - Intentionally runs effects twice in development to catch bugs. Disable with cleanup functions

8. **What are the three lifecycle replacements?** 
   - `[]` = componentDidMount (runs once)
   - `[dependency]` = componentDidUpdate (runs when dependency changes)
   - `return () => {}` = componentWillUnmount (cleanup)

---

### Best Practices ✅
- Always include dependency array (unless you want to run on every render)
- Always cleanup side effects (clear intervals, remove listeners, cancel requests)
- Don't update state without dependencies (creates infinite loops)
- Fetch data only when needed (use `[]` for once, or specific dependencies)
- Name your effects logically: comments explain what side effect you're doing
- Use .catch() for error handling in fetch, not .then()

---

## useContext

### Definition
`useContext` is a Hook that lets you subscribe to React context without introducing nesting.

### Syntax
```jsx
const value = useContext(MyContext);
```

### Key Points
- Coming soon...

### Examples
```jsx
// Coming soon...
```

---

## useRef

### Definition
`useRef` is a special React Hook that lets you **store a value or get a direct reference to a DOM element, without causing the component to re-render**.

### Key Features ✅
- **Keeps values even when component updates** - Value stays same without re-render
- **Useful for interacting with DOM elements directly** - Focus, blur, get value, change styles
- **Ideal for keeping track of values that don't need to trigger re-renders** - Like previous states, timers, counters

### Syntax
```jsx
const myRef = useRef(initialValue);
```
- `myRef` - Ref object
- `myRef.current` - Access the actual value or DOM element
- `initialValue` - Starting value (can be null, number, object, etc.)

### Basic Example - Focus Input
```jsx
import { useRef } from 'react';

export const FocusExample = () => {
  const inputRef = useRef();
  
  const handleFocus = () => {
    inputRef.current.focus();  // Focus on input without state change
  };
  
  return (
    <>
      <input type="text" ref={inputRef} placeholder="Type here..." />
      <button onClick={handleFocus}>Focus Input</button>
    </>
  );
};
```

**Key point:** No re-render happens when you access `inputRef.current`! Unlike useState.

---

### Example From Your Code

#### Your Timer Example (from UseRefExample.jsx)
```jsx
const inputRef = useRef();
const [name, setName] = useState('vikas');

const handleReset = () => {
  setName('');
  inputRef.current.focus();  // Focus input after reset
};

const handleChange = () => {
  inputRef.current.style.color = 'red';  // Change style directly
};

return (
  <>
    <input 
      type="text" 
      ref={inputRef}           // Connect ref to input
      value={name} 
      onChange={(e) => setName(e.target.value)} 
    />
    <button onClick={handleReset}>Reset</button>
    <button onClick={handleChange}>Change Color</button>
  </>
);
```

---

### Different Use Cases

#### 1️⃣ **Storing a Value Without Re-render**
```jsx
const clickCountRef = useRef(0);

const handleClick = () => {
  clickCountRef.current = clickCountRef.current + 1;
  console.log('Clicked:', clickCountRef.current); // Logs correctly
  // Component does NOT re-render
};

return <button onClick={handleClick}>Click Me</button>;
```

**vs useState:**
```jsx
const [count, setCount] = useState(0);
// This WILL re-render every time
```

#### 2️⃣ **Accessing DOM Elements Directly**
```jsx
const inputRef = useRef();
const videoRef = useRef();

const playVideo = () => {
  videoRef.current.play();  // Call DOM method directly
};

const getValue = () => {
  console.log(inputRef.current.value);  // Get input value without onChange
};
```

#### 3️⃣ **Storing Timer/Interval References**
```jsx
const intervalRef = useRef();

const startTimer = () => {
  intervalRef.current = setInterval(() => {
    console.log('Timer running');
  }, 1000);
};

const stopTimer = () => {
  clearInterval(intervalRef.current);  // Stop using stored reference
};
```

#### 4️⃣ **Tracking Previous State**
```jsx
const prevCountRef = useRef();

useEffect(() => {
  prevCountRef.current = count;  // Store current count
}, [count]);

return <div>Now: {count}, Before: {prevCountRef.current}</div>;
```

---

### 🔴 useRef vs ✅ useState

| Feature | useState | useRef |
|---------|----------|--------|
| **Triggers re-render?** | ✅ Yes | ❌ No |
| **Stores values across renders?** | ✅ Yes | ✅ Yes |
| **Best for updating UI?** | ✅ Yes | ❌ No |
| **Best for storing timers, previous values, DOM refs?** | ❌ No | ✅ Yes |
| **Access value** | Direct: `count` | Via `.current`: `ref.current` |
| **Update value** | Via setter: `setCount(5)` | Direct: `ref.current = 5` |

**Simple rule:**
- Use `useState` when you need to **update the UI**
- Use `useRef` when you need to **store a value without re-rendering**

---

### ❌ Common Mistakes to Avoid

#### Mistake 1: Using useRef for UI Updates
```jsx
// ❌ WRONG
const countRef = useRef(0);
const handleClick = () => {
  countRef.current = countRef.current + 1;
  // Component never re-renders, UI stays 0!
};
return <div>{countRef.current}</div>;

// ✅ CORRECT
const [count, setCount] = useState(0);
const handleClick = () => {
  setCount(count + 1);
  // Component re-renders, UI updates
};
return <div>{count}</div>;
```

#### Mistake 2: Not Clearing setTimeout/setInterval
```jsx
// ❌ WRONG - Memory leak!
const timerRef = useRef();
const startTimer = () => {
  timerRef.current = setInterval(() => {
    console.log('running');
  }, 1000);
  // Never stops!
};

// ✅ CORRECT
const stopTimer = () => {
  clearInterval(timerRef.current);  // Clear the interval
};
```

#### Mistake 3: Wrong Variable Name
```jsx
// ❌ WRONG
const handleChange = () => {
  input.current.style.color = 'red';  // input not defined!
};

// ✅ CORRECT
const inputRef = useRef();
const handleChange = () => {
  inputRef.current.style.color = 'red';  // Use correct variable
};
```

#### Mistake 4: Not Using .current
```jsx
// ❌ WRONG
const inputRef = useRef();
inputRef.style.color = 'red';  // Won't work, need .current

// ✅ CORRECT
inputRef.current.style.color = 'red';
```

#### Mistake 5: Initializing with Wrong Value
```jsx
// ❌ WRONG
const inputRef = useRef(0);  // For DOM element, use null
const numberRef = useRef();  // For number, initialize with 0

// ✅ CORRECT
const inputRef = useRef(null);  // For DOM elements
const numberRef = useRef(0);   // For numbers/values
```

---

### Best Practices ✅

1. **Use useRef when you need to store values that don't trigger re-renders** 
   - Timers, previous values, DOM references

2. **Always access useRef values using `.current`**
   ```jsx
   const myRef = useRef();
   myRef.current;  // Access value here
   ```

3. **Initialize useRef properly**
   - `useRef(null)` for DOM elements
   - `useRef(0)` for numbers
   - `useRef()` for anything else

4. **Clear timers stored in useRef to avoid memory leaks**
   ```jsx
   return () => clearTimeout(timerRef.current);
   ```

5. **Don't use useRef for UI updates - use useState instead**
   - If you want component to re-render, always use `useState`

6. **Never create ref inside conditional logic**
   - Must be at top level like useState

---

### Interview Tips 💡

1. **What's the main difference between useRef and useState?** - useState triggers re-render, useRef doesn't. useRef keeps values without re-rendering

2. **When would you use useRef instead of useState?** - When you need to store timers, previous values, or access DOM elements directly without re-rendering

3. **What does .current mean?** - It's the property that holds the actual value or DOM element reference

4. **Can you update UI with useRef?** - No! If you update useRef value, component won't re-render. Use useState for UI updates

5. **What's a memory leak in useRef?** - Not clearing timers/intervals stored in useRef. Always use cleanup functions

6. **useRef vs direct DOM manipulation?** - useRef is the React way to access and manipulate DOM when needed

7. **Do refs survive component re-renders?** - Yes! That's the whole point. Value persists even if component re-renders

---



---

## useReducer

### Definition
`useReducer` is a Hook for managing complex state logic.

### Syntax
```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

### Key Points
- Coming soon...

### Examples
```jsx
// Coming soon...
```

---

## Custom Hooks

### Definition
Custom hooks are JavaScript functions that use other hooks.

### Naming Convention
- Must start with `use`
- Example: `useFetch`, `useForm`, `useAuth`

### Key Points
- Coming soon...

### Examples
```jsx
// Coming soon...
```

---

## Resources
- [React Hooks Documentation](https://react.dev/reference/react)
- [Hooks Rules](https://react.dev/warnings/invalid-hook-call-warning)
