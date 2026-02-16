# Redux - Complete Guide

## Table of Contents
1. [What is Redux?](#what-is-redux)
2. [Installation](#installation)
3. [Redux Basics](#redux-basics)
4. [Redux vs Redux Toolkit](#redux-vs-redux-toolkit)
5. [Core Concepts](#core-concepts)
6. [How Redux Works](#how-redux-works)
7. [Setup Guide](#setup-guide)
8. [Project Structure](#project-structure)
9. [Interview Questions](#interview-questions)

---

## What is Redux?

**Redux is a state management library for JavaScript applications.**

Simple meaning:
- Redux keeps all your app data in one place (called Store)
- All components can access this data without passing it from parent to child
- It prevents "prop drilling" problem

### When to Use Redux?

✅ Use Redux when:
- Your app has lots of data to share between many components
- You need to track data changes
- You want easy debugging

❌ Don't use Redux when:
- Your app is small with few components
- You only have a little data to share
- Props passing is not creating problems

---

## Installation

### Install Redux and React-Redux

```bash
npm install redux react-redux
```

### Check Versions

```bash
npm list redux react-redux
```

### Current Versions (Latest)
- **redux:** v4.x.x
- **react-redux:** v8.x.x

---

## Redux Basics - The Story

Think of Redux like a restaurant:

```
1. Store = Restaurant's inventory (holds all data)
2. Action = Customer's order
3. Reducer = Chef who processes the order
4. Dispatch = Waiter who gives order to chef
5. Selector = Customer asking for their food
```

---

## Redux vs Redux Toolkit

| Feature | Redux | Redux Toolkit (RTK) |
|---------|-------|-------------------|
| **Setup Difficulty** | Hard, lots of code | Easy, less code |
| **Boilerplate** | Lots of code needed | Minimal code |
| **Actions** | Write manually | Auto-generated |
| **Updates** | Manual state copy | Automatic (uses Immer) |
| **Performance** | Good | Better |
| **Learning Curve** | Steep | Easier |
| **File Size** | Smaller | Slightly larger |
| **Recommended** | Not for beginners | Yes, use this |

### Quick Example

**Redux (Old Way):**
```javascript
// Need to write action, reducer, switch case, etc.
// Lots of boilerplate code
const initialState = { count: 0 };
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'INCREMENT': return { ...state, count: state.count + 1 };
    default: return state;
  }
};
```

**Redux Toolkit (New Way):**
```javascript
// Just write what you need
import { createSlice } from '@reduxjs/toolkit';

const countSlice = createSlice({
  name: 'count',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; }
  }
});
```

---

## Core Concepts

### 1. Store

**What:** Container that holds all your app data

```javascript
import { createStore } from 'redux';
import bookReducer from './bookReducer';

const store = createStore(bookReducer);
export default store;
```

### 2. Action

**What:** Object that describes what happened

```javascript
export const buy_book = "buy_book";

const purchaseBook = () => {
  return {
    type: buy_book
  };
};

export default purchaseBook;
```

**Simple:** Actions tell Redux "something happened"

### 3. Reducer

**What:** Function that changes the state based on action

```javascript
import { buy_book } from "./bookTypes";

const initialState = {
  numberOfBooks: 20
};

const bookReducer = (state = initialState, action) => {
  switch(action.type) {
    case buy_book: 
      return { ...state, numberOfBooks: state.numberOfBooks - 1 };
    default: 
      return state;
  }
};

export default bookReducer;
```

**Points:**
- Takes 2 things: current state and action
- Returns new state
- Must return new object (not change old one)
- Use spread operator (...) to copy state

### 4. Dispatch

**What:** Function that sends action to reducer

```javascript
const dispatch = useDispatch();

// Send action
dispatch(purchaseBook());
```

**Simple:** Dispatch = "give this action to reducer"

### 5. Selector

**What:** Function that reads data from store

```javascript
const numberOfBooks = useSelector(state => state.numberOfBooks);
```

**Simple:** Selector = "get this data from store"

### 6. Provider

**What:** Component that makes store available to all components

```javascript
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <YourComponents />
    </Provider>
  );
}
```

---

## How Redux Works

### Step by Step

```
User Click Button
        ↓
Dispatch Action (bookReducer())
        ↓
Reducer Gets Action
        ↓
Reducer Changes State
        ↓
Store Updates
        ↓
useSelector Sees Change
        ↓
Component Re-Renders with New Data
```

### Real Example Flow

1. **User clicks "Buy Book" button**

2. **Dispatch action:**
```javascript
dispatch(purchaseBook());
// Sends: { type: "buy_book" }
```

3. **Reducer receives it:**
```javascript
const bookReducer = (state = initialState, action) => {
  if (action.type === "buy_book") {
    return { numberOfBooks: state.numberOfBooks - 1 };
  }
  return state;
};
```

4. **Component reads new data:**
```javascript
const numberOfBooks = useSelector(state => state.numberOfBooks);
// Now shows new number
```

---

## Setup Guide

### Step 1: Create bookTypes.js

```javascript
export const buy_book = "buy_book";
```

### Step 2: Create bookAction.js

```javascript
import { buy_book } from './bookTypes';

const purchaseBook = () => {
  return { type: buy_book };
};

export default purchaseBook;
```

### Step 3: Create bookReducer.js

```javascript
import { buy_book } from "./bookTypes";

const initialState = {
  numberOfBooks: 20
};

const bookReducer = (state = initialState, action) => {
  switch(action.type) {
    case buy_book:
      return { ...state, numberOfBooks: state.numberOfBooks - 1 };
    default:
      return state;
  }
};

export default bookReducer;
```

### Step 4: Create store.js

```javascript
import { createStore } from 'redux';
import bookReducer from './bookReducer';

const store = createStore(bookReducer);
export default store;
```

### Step 5: Use in App.jsx

```javascript
import { Provider } from 'react-redux';
import store from './reduxContainer/store';
import BookContainer from './reduxContainer/bookContainer';

function App() {
  return (
    <Provider store={store}>
      <BookContainer />
    </Provider>
  );
}

export default App;
```

### Step 6: Use in Component

```javascript
import { useSelector, useDispatch } from 'react-redux';
import purchaseBook from './bookAction';

const BookContainer = () => {
  const numberOfBooks = useSelector(state => state.numberOfBooks);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Books Available: {numberOfBooks}</h1>
      <button onClick={() => dispatch(purchaseBook())}>
        Buy Book
      </button>
    </div>
  );
};

export default BookContainer;
```

---

## Project Structure

```
redux/
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── App.css
│   └── reduxContainer/
│       ├── store.js (Store setup)
│       ├── bookTypes.js (Action types)
│       ├── bookAction.js (Actions)
│       ├── bookReducer.js (Reducers)
│       └── bookContainer.jsx (Component using Redux)
```

---

## Redux Hooks

### useSelector

**Gets data from store**

```javascript
const data = useSelector(state => state.data);
```

### useDispatch

**Sends action to reducer**

```javascript
const dispatch = useDispatch();
dispatch(actionFunction());
```

---

## Key Points to Remember

✅ Store = Holds app state  
✅ Action = What happened  
✅ Reducer = How state changes  
✅ Dispatch = Send action  
✅ Selector = Read state  
✅ Provider = Make store available  

---

## Interview Questions

### Q1: What is Redux?
Redux is a state management library. It keeps all app data in one place. Components can access data without passing it through many layers.

### Q2: What are Redux basics?
- **Store:** Holds app state
- **Action:** Says what happened
- **Reducer:** Changes state
- **Dispatch:** Sends action
- **Selector:** Reads state

### Q3: Why use Redux?
- Easy to manage big apps
- No prop drilling
- Easy debugging
- Track all state changes

### Q4: What is Provider?
Provider is a React component that makes store available to all child components.

```javascript
<Provider store={store}>
  <App />
</Provider>
```

### Q5: What is useSelector?
Hook that gets data from store.

```javascript
const data = useSelector(state => state.data);
```

### Q6: What is useDispatch?
Hook that sends actions to reducer.

```javascript
const dispatch = useDispatch();
dispatch(myAction());
```

### Q7: What is a Reducer?
Function that takes state and action, returns new state.

```javascript
const reducer = (state, action) => {
  // return new state
};
```

### Q8: What is an Action?
Object that describes what happened.

```javascript
{ type: 'ACTION_NAME', payload: data }
```

### Q9: Do we change state directly?
No. Always return new state using spread operator (...).

```javascript
// Wrong ❌
state.count = state.count + 1;

// Right ✅
return { ...state, count: state.count + 1 };
```

### Q10: Redux vs Redux Toolkit - which one to use?
Use Redux Toolkit (RTK) for new projects. It's easier and has less code.

### Q11: Can multiple reducers exist?
Yes, using combineReducers.

```javascript
import { createStore, combineReducers } from 'redux';

const store = createStore(combineReducers({
  books: bookReducer,
  users: userReducer
}));
```

### Q12: When NOT to use Redux?
- Small app with few components
- Little data to share
- Props passing is fine

---

## Common Mistakes

❌ Changing state directly
```javascript
state.count = 5; // Wrong
```

✅ Create new state object
```javascript
{ ...state, count: 5 } // Right
```

---

## Next Steps

1. **Master basic Redux** (covered here)
2. **Learn Redux Toolkit** (easier way)
3. **Learn Redux Middleware** (async actions)
4. **Learn DevTools** (debugging)

---

## Useful Links

- Redux Documentation: https://redux.js.org
- Redux Toolkit: https://redux-toolkit.js.org
- React-Redux: https://react-redux.js.org

---

**Happy coding with Redux! 🚀**
