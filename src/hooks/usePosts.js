import { useAppDispatch, useAppSelector } from "../store";
import { useCallback, useEffect } from "react";
import {
  fetchPosts,
  fetchUserPosts,
  createPost,
  updatePost,
  deletePost,
  fetchPostById,
  setFilters,
  clearFilters,
  setViewMode,
  setSortBy,
  setCurrentPage,
  setPageSize,
  clearPosts,
  clearError,
  selectPosts,
  selectPostsLoading,
  selectPostsError,
  selectPageInfo,
  selectFilters,
  selectViewMode,
  selectPostById,
} from "../store/slices/postSlice";

// Custom hook for managing posts
export const usePosts = () => {
  const dispatch = useAppDispatch();

  // Selectors
  const posts = useAppSelector(selectPosts);
  const loading = useAppSelector(selectPostsLoading);
  const error = useAppSelector(selectPostsError);
  const pageInfo = useAppSelector(selectPageInfo);
  const filters = useAppSelector(selectFilters);
  const viewMode = useAppSelector(selectViewMode);

  // Actions
  const fetchPostsAction = useCallback(
    (params) => {
      return dispatch(fetchPosts(params));
    },
    [dispatch]
  );

  const fetchUserPostsAction = useCallback(
    (page, limit) => {
      return dispatch(fetchUserPosts({ page, limit }));
    },
    [dispatch]
  );

  const createPostAction = useCallback(
    (postData) => {
      return dispatch(createPost(postData));
    },
    [dispatch]
  );

  const updatePostAction = useCallback(
    (id, postData) => {
      return dispatch(updatePost({ id, postData }));
    },
    [dispatch]
  );

  const deletePostAction = useCallback(
    (id) => {
      return dispatch(deletePost(id));
    },
    [dispatch]
  );

  const fetchPostByIdAction = useCallback(
    (id) => {
      return dispatch(fetchPostById(id));
    },
    [dispatch]
  );

  const setFiltersAction = useCallback(
    (newFilters) => {
      dispatch(setFilters(newFilters));
    },
    [dispatch]
  );

  const clearFiltersAction = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  const setViewModeAction = useCallback(
    (mode) => {
      dispatch(setViewMode(mode));
    },
    [dispatch]
  );

  const setSortByAction = useCallback(
    (sortBy) => {
      dispatch(setSortBy(sortBy));
    },
    [dispatch]
  );

  const setCurrentPageAction = useCallback(
    (page) => {
      dispatch(setCurrentPage(page));
    },
    [dispatch]
  );

  const setPageSizeAction = useCallback(
    (size) => {
      dispatch(setPageSize(size));
    },
    [dispatch]
  );

  const clearPostsAction = useCallback(() => {
    dispatch(clearPosts());
  }, [dispatch]);

  const clearErrorAction = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    // State
    posts,
    loading,
    error,
    pageInfo,
    filters,
    viewMode,

    // Actions
    fetchPosts: fetchPostsAction,
    fetchUserPosts: fetchUserPostsAction,
    createPost: createPostAction,
    updatePost: updatePostAction,
    deletePost: deletePostAction,
    fetchPostById: fetchPostByIdAction,
    setFilters: setFiltersAction,
    clearFilters: clearFiltersAction,
    setViewMode: setViewModeAction,
    setSortBy: setSortByAction,
    setCurrentPage: setCurrentPageAction,
    setPageSize: setPageSizeAction,
    clearPosts: clearPostsAction,
    clearError: clearErrorAction,
  };
};

// Hook for getting a specific post by ID
export const usePost = (id) => {
  const post = useAppSelector(selectPostById(id));
  const loading = useAppSelector(selectPostsLoading);
  const error = useAppSelector(selectPostsError);
  const dispatch = useAppDispatch();

  const fetchPost = useCallback(() => {
    if (id) {
      dispatch(fetchPostById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id && !post) {
      fetchPost();
    }
  }, [id, post, fetchPost]);

  return {
    post,
    loading,
    error,
    fetchPost,
  };
};

// Hook for managing post filters with URL synchronization
export const usePostFilters = (navigate, location) => {
  const { filters, setFilters, setCurrentPage, setPageSize, setSortBy } =
    usePosts();

  const updateFiltersFromURL = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlFilters = {
      species: searchParams.get("species") || "",
      breed: searchParams.get("breed") || "",
      type: searchParams.get("type") || "",
      minPrice: searchParams.get("minPrice") || "0",
      maxPrice: searchParams.get("maxPrice") || "100000",
      sortBy: searchParams.get("sort") || "newest",
      page: parseInt(searchParams.get("page")) || 1,
    };

    const limit = parseInt(searchParams.get("limit")) || 12;

    setFilters(urlFilters);
    setPageSize(limit);
  }, [location.search, setFilters, setPageSize]);

  const updateURL = useCallback(
    (newFilters) => {
      const searchParams = new URLSearchParams();

      Object.entries(newFilters).forEach(([key, value]) => {
        if (value && value !== "" && value !== "0" && value !== "newest") {
          searchParams.set(key, value);
        }
      });

      if (filters.page && filters.page !== 1) {
        searchParams.set("page", filters.page.toString());
      }

      navigate(`${location.pathname}?${searchParams.toString()}`);
    },
    [navigate, location.pathname, filters.page]
  );

  const handleFilterChange = useCallback(
    (newFilters) => {
      const updatedFilters = { ...filters, ...newFilters, page: 1 };
      setFilters(updatedFilters);
      updateURL(updatedFilters);
    },
    [filters, setFilters, updateURL]
  );

  const handleSortChange = useCallback(
    (sortBy) => {
      const updatedFilters = { ...filters, sortBy, page: 1 };
      setSortBy(sortBy);
      setCurrentPage(1);
      updateURL(updatedFilters);
    },
    [filters, setSortBy, setCurrentPage, updateURL]
  );

  const handlePageChange = useCallback(
    (page) => {
      const updatedFilters = { ...filters, page };
      setCurrentPage(page);
      updateURL(updatedFilters);
    },
    [filters, setCurrentPage, updateURL]
  );

  const handlePageSizeChange = useCallback(
    (size) => {
      const updatedFilters = { ...filters, page: 1 };
      setPageSize(size);
      setCurrentPage(1);
      updateURL(updatedFilters);
    },
    [filters, setPageSize, setCurrentPage, updateURL]
  );

  return {
    filters,
    updateFiltersFromURL,
    handleFilterChange,
    handleSortChange,
    handlePageChange,
    handlePageSizeChange,
  };
};
