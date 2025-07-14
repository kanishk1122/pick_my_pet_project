# Redux Store Implementation for Posts

## 🏗️ Store Structure

### Files Created:

```
src/
├── store/
│   ├── index.js                 # Main store configuration
│   └── slices/
│       └── postSlice.js         # Post slice with actions and reducers
├── hooks/
│   └── usePosts.js              # Custom hooks for post management
└── components/Pet/
    └── CreatePostForm.jsx       # Example component using Redux
```

## 📦 Store Configuration (`src/store/index.js`)

```javascript
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import postReducer from "./slices/postSlice";

export const store = configureStore({
  reducer: {
    posts: postReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "posts/fetchPosts/pending",
          "posts/fetchPosts/fulfilled",
        ],
        ignoredActionsPaths: ["meta.arg", "payload.timestamp"],
        ignoredPaths: ["posts.timestamp"],
      },
    }),
  devTools: import.meta.env.DEV,
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
```

## 🔄 Post Slice (`src/store/slices/postSlice.js`)

### State Structure:

```javascript
const initialState = {
  posts: [], // Array of post objects
  loading: false, // Loading state for async operations
  error: null, // Error message if any
  pageInfo: {
    // Pagination information
    currentPage: 1,
    totalPages: 1,
    totalPosts: 0,
    limit: 12,
  },
  filters: {
    // Current filter settings
    species: "",
    breed: "",
    type: "",
    minPrice: "0",
    maxPrice: "100000",
    sortBy: "newest",
    page: 1,
  },
  viewMode: "grid", // Display mode (grid/list)
};
```

### Async Actions (Thunks):

- **`fetchPosts`** - Fetch posts with filtering and pagination
- **`createPost`** - Create a new post
- **`updatePost`** - Update an existing post
- **`deletePost`** - Delete a post
- **`fetchPostById`** - Fetch a specific post by ID

### Sync Actions:

- **`setFilters`** - Update filter settings
- **`clearFilters`** - Reset all filters
- **`setViewMode`** - Change view mode (grid/list)
- **`setSortBy`** - Update sort option
- **`setCurrentPage`** - Change current page
- **`setPageSize`** - Update page size
- **`clearPosts`** - Clear all posts
- **`clearError`** - Clear error state

### Selectors:

- **`selectPosts`** - Get all posts
- **`selectPostsLoading`** - Get loading state
- **`selectPostsError`** - Get error state
- **`selectPageInfo`** - Get pagination info
- **`selectFilters`** - Get current filters
- **`selectViewMode`** - Get view mode
- **`selectPostById(id)`** - Get specific post by ID

## 🎣 Custom Hooks (`src/hooks/usePosts.js`)

### `usePosts()` Hook:

Returns all post-related state and actions:

```javascript
const {
  posts,
  loading,
  error,
  pageInfo,
  filters,
  viewMode,
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
  setFilters,
  setViewMode,
  setSortBy, // ... more actions
} = usePosts();
```

### `usePost(id)` Hook:

For managing individual posts:

```javascript
const { post, loading, error, fetchPost } = usePost(postId);
```

### `usePostFilters(navigate, location)` Hook:

For URL-synchronized filtering:

```javascript
const {
  filters,
  updateFiltersFromURL,
  handleFilterChange,
  handleSortChange,
  handlePageChange,
  handlePageSizeChange,
} = usePostFilters(navigate, location);
```

## 🔧 Usage Examples

### 1. In PetList Component:

```javascript
import { usePosts, usePostFilters } from "../../hooks/usePosts";

const PetList = () => {
  const { posts, loading, error, pageInfo, viewMode } = usePosts();
  const { handleFilterChange, handleSortChange } = usePostFilters(
    navigate,
    location
  );

  // Component logic...
};
```

### 2. Creating a New Post:

```javascript
const CreatePost = () => {
  const { createPost, loading } = usePosts();

  const handleSubmit = async (postData) => {
    const result = await createPost(postData);
    if (result.meta.requestStatus === "fulfilled") {
      // Success handling
    }
  };
};
```

### 3. Filtering Posts:

```javascript
const FilterComponent = () => {
  const { handleFilterChange } = usePostFilters(navigate, location);

  const onFilter = (newFilters) => {
    handleFilterChange(newFilters); // Automatically updates URL and refetches
  };
};
```

## 🔄 Provider Setup (`src/main.jsx`)

```javascript
import { Provider } from "react-redux";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <UserProvide>
            <SwalProvider>
              <App />
            </SwalProvider>
          </UserProvide>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
```

## 🎯 Key Features

### 1. **Centralized State Management**:

- All post-related state in one place
- Consistent data across components
- Predictable state updates

### 2. **Async Operation Handling**:

- Built-in loading states
- Error handling
- Request cancellation support

### 3. **URL Synchronization**:

- Filters persist in URL parameters
- Bookmarkable searches
- Browser back/forward support

### 4. **Optimistic Updates**:

- Immediate UI feedback
- Rollback on errors
- Better user experience

### 5. **Performance Optimizations**:

- Memoized selectors
- Efficient re-renders
- Lazy loading support

## 🔍 Benefits Over Previous Implementation

### Before (Local State):

```javascript
const [pets, setPets] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
// Scattered state management
// No data persistence
// Manual URL synchronization
```

### After (Redux):

```javascript
const { posts, loading, error, fetchPosts } = usePosts();
// Centralized state
// Automatic URL sync
// Built-in error handling
// Better developer tools
```

## 🛠️ Development Tools

### Redux DevTools:

- Time-travel debugging
- Action replay
- State inspection
- Performance monitoring

### Custom Hooks Benefits:

- Reusable logic
- Clean component code
- Easier testing
- Better abstraction

## 🚀 Extending the Store

### Adding New Reducers:

```javascript
// store/index.js
export const store = configureStore({
  reducer: {
    posts: postReducer,
    users: userReducer, // Add new reducers here
    comments: commentReducer, // Extend as needed
    // ... other reducers
  },
});
```

### Adding New Post Actions:

```javascript
// In postSlice.js
export const likePost = createAsyncThunk(
  "posts/likePost",
  async (postId, { rejectWithValue }) => {
    // Implementation
  }
);
```

This Redux implementation provides a robust, scalable foundation for managing post data throughout your application! 🎉
