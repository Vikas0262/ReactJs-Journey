# React + TypeScript + Vite

## Lazy Loading in React

### Overview
Lazy Loading in React is a technique that allows you to load components, modules, or assets asynchronously. This improves the loading time and performance of your React applications by splitting your bundle into smaller chunks.

**Key Benefits:**
- Optimizes application performance
- Reduces initial bundle size
- Asynchronous component loading
- Better user experience with code splitting

### React Lazy Loading API
React provides two built-in utilities for lazy loading:
- `React.lazy()` - Dynamically import components
- `<Suspense>` - Display fallback UI while component loads

### Steps to Implement Lazy Loading

#### Step 1: Identify Components to Lazy Load
Choose large or complex components that aren't needed immediately when the page loads.

#### Step 2: Import lazy() and Suspense
```tsx
import React, { Suspense } from 'react';
```

#### Step 3: Use lazy() to Dynamically Import Component
The argument to `lazy()` should be a function that returns the result of `import()`:

```tsx
// Dynamic import syntax
const LazyComponent = React.lazy(() => import('./LazyComponent'));
```

#### Step 4: Wrap with Suspense Component
Wrap the lazy-loaded component in a `<Suspense>` component, which displays a fallback UI while loading:

```tsx
<Suspense fallback={<div>Loading...</div>}>
  <LazyComponent />
</Suspense>
```

### Complete Example

**App.tsx:**
```tsx
import React, { Suspense } from 'react';
import './App.css';

const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <>
      <h1>Learning Lazy Loading in React</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </>
  );
}

export default App;
```

**LazyComponent.jsx:**
```jsx
const LazyComponent = () => {
  return (
    <div>
      <p>This is a lazy loaded component!</p>
    </div>
  );
};

export default LazyComponent;
```

### Common Pitfalls to Avoid
1. ❌ Forgetting to wrap lazy components in `<Suspense>`
2. ❌ Passing an object instead of a function to `lazy()`
3. ❌ Using named exports instead of default exports
4. ❌ Having oversized component files (causes build optimization issues)

---

## Data Table with Pagination

### Overview
A data table component that displays records with pagination functionality. This implementation demonstrates how to split large datasets into smaller chunks and allow users to navigate between pages.

### Features
- Display 30 mock records in a table format
- Pagination with 3 pages (10 records per page)
- Dynamic page buttons for easy navigation
- Current page highlighting
- Page information display
- Alternating row colors for better readability
- Professional styling with gradients and hover effects

### Table Columns
- **#** (ID) - Unique identifier for each record
- **Name** - Full name of the person
- **Email** - Email address
- **Age** - Person's age
- **Company** - Company name

### Pagination Implementation

#### Key Concepts

**1. State Management:**
```jsx
const [currentPage, setCurrentPage] = useState(1);
const recordsPerPage = 10;
```
- Track which page the user is currently viewing
- Define how many records appear per page

**2. Pagination Calculations:**
```jsx
// Total pages: 30 records ÷ 10 per page = 3 pages
const totalPages = Math.ceil(tableData.length / recordsPerPage);

// For page 1: startIndex = (1-1) * 10 = 0
// For page 2: startIndex = (2-1) * 10 = 10
// For page 3: startIndex = (3-1) * 10 = 20
const startIndex = (currentPage - 1) * recordsPerPage;

// endIndex = startIndex + 10
const endIndex = startIndex + recordsPerPage;

// Slice the data to get current page records
const currentPageData = tableData.slice(startIndex, endIndex);
```

**3. Pagination Buttons:**
```jsx
{Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
  <button
    key={pageNumber}
    onClick={() => handlePageChange(pageNumber)}
    style={buttonStyle(pageNumber === currentPage)}
  >
    {pageNumber}
  </button>
))}
```
- Dynamically generate pagination buttons based on `totalPages`
- Each button updates `currentPage` when clicked
- Active button is highlighted in green

#### Page Navigation Flow
```
Page 1 (Records 1-10)  →  Click Page 2  →  Page 2 (Records 11-20)  →  Click Page 3  →  Page 3 (Records 21-30)
```

### Component Structure

```jsx
// DataTable.jsx
import React, { useState } from 'react';

const DataTable = () => {
  // 1. State for current page
  const [currentPage, setCurrentPage] = useState(1);
  
  // 2. Generate mock data (30 records)
  const generateMockData = () => { /* ... */ };
  
  // 3. Calculate pagination values
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentPageData = tableData.slice(startIndex, endIndex);
  
  // 4. Render table with current page data
  // 5. Render pagination buttons
};
```

### Usage in App

```tsx
// App.tsx
import DataTable from './components/DataTable';

function App() {
  return (
    <>
      <h1>Learning Lazy Loading in React</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
      
      <hr style={{ margin: '40px 0' }} />
      
      <DataTable />
    </>
  );
}
```

### Styling Highlights
- **Table headers:** Green background with white text
- **Alternating rows:** Light gray and white for alternation
- **Active button:** Green with solid border
- **Inactive buttons:** Light gray with dashed border
- **Hover effect:** Smooth transitions on button interactions

### Performance Considerations
- Only renders 10 records at a time (not all 30)
- Reduces DOM nodes and improves rendering performance
- State updates only change displayed data, not entire dataset
- Pagination buttons are lightweight and reusable

### Common Pagination Patterns

**1. Previous/Next Buttons:**
```jsx
<button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>
  Previous
</button>
<button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}>
  Next
</button>
```

**2. Goto Page Input:**
```jsx
<input 
  type="number" 
  value={currentPage} 
  onChange={(e) => setCurrentPage(Number(e.target.value))}
  min="1"
  max={totalPages}
/>
```

**3. Records Per Page Selector:**
```jsx
<select value={recordsPerPage} onChange={(e) => setRecordsPerPage(Number(e.target.value))}>
  <option value={5}>5 per page</option>
  <option value={10}>10 per page</option>
  <option value={20}>20 per page</option>
</select>
```

---

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
