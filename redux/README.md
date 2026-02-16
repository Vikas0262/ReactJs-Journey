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

Redux is a state management library for JavaScript apps.

Simple meaning:
- Redux keeps all your app data in one place (Store)
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

### Current Versions (Latest)
- **redux:** v4.x.x
- **react-redux:** v8.x.x

---

## Redux Basics - Think Like This

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
| **Setup** | Hard, lots of code | Easy, less code |
| **Boilerplate** | Lots of code | Minimal code |
| **Learning** | Steep curve | Easier |
| **Recommended** | Not for beginners | Yes, use this |

Quick Example:

**Redux (Old):**
```javascript
const initialState = { count: 0 };
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'INCREMENT': return { ...state, count: state.count + 1 };
    default: return state;
  }
};
```

**Redux Toolkit (New):**
```javascript
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

### 1. Store - Holds All Data

```javascript
import { createStore } from 'redux';
import bookReducer from './bookReducer';

const store = createStore(bookReducer);
export default store;
```

### 2. Action - Says What Happened

```javascript
export const buy_book = "buy_book";

const purchaseBook = () => {
  return { type: buy_book };
};

export default purchaseBook;
```

### 3. Reducer - Changes State

```javascript
const bookReducer = (state = initialState, action) => {
  switch(action.type) {
    case buy_book:
      return { ...state, numberOfBooks: state.numberOfBooks - 1 };
    default:
      return state;
  }
};
```

**Important:** Always return NEW state, don't change old one

### 4. Dispatch - Send Action

```javascript
const dispatch = useDispatch();
dispatch(purchaseBook());
```

### 5. useSelector - Get Data

```javascript
const numberOfBooks = useSelector(state => state.numberOfBooks);
```

### 6. Provider - Make Store Available

```javascript
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <YourComponent />
    </Provider>
  );
}
```

---

## How Redux Works - Step by Step

```
1. User clicks button
        ↓
2. Dispatch action
        ↓
3. Reducer gets action
        ↓
4. Reducer changes state
        ↓
5. Store updates
        ↓
6. Component re-renders with new data
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

const initialState = { numberOfBooks: 20 };

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
      <h1>Books: {numberOfBooks}</h1>
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
│       └── bookContainer.jsx (Component)
```

---

## Redux Hooks

### useSelector - Get Data
```javascript
const data = useSelector(state => state.data);
```

### useDispatch - Send Action
```javascript
const dispatch = useDispatch();
dispatch(purchaseBook());
```

---

## Interview Questions

### Q1: What is Redux?
State management library. Keeps all app data in one place. Components access data without prop drilling.

### Q2: What are the main parts of Redux?
- Store (holds state)
- Action (what happened)
- Reducer (changes state)
- Dispatch (send action)
- Selector (read state)

### Q3: Why use Redux?
- Easy to manage big apps
- No prop drilling
- Easy debugging
- Track all changes

### Q4: What is Provider?
Component that makes store available to all nested components.

### Q5: What is useSelector?
Hook that reads data from store.

### Q6: What is useDispatch?
Hook that sends actions to reducer.

### Q7: What is a Reducer?
Function that takes state and action, returns new state.

### Q8: What is an Action?
Object that describes what happened.

```javascript
{ type: 'ACTION_NAME' }
```

### Q9: Can we change state directly?
No. Always create new state object using spread operator.

```javascript
// Wrong ❌
state.count = 5;

// Right ✅
return { ...state, count: 5 };
```

### Q10: Redux vs Redux Toolkit?
Use Redux Toolkit for new projects. It's easier and has less code.

### Q11: Can we have multiple reducers?
Yes, using combineReducers.

### Q12: When NOT to use Redux?
- Small apps
- Few components
- Props passing is fine

---

**Happy coding with Redux! 🚀**
