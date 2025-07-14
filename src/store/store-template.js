import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

// Import your reducers here
import postReducer from "./slices/postSlice";
// import userReducer from "./slices/userSlice";
// import customerReducer from "./slices/customerSlice";
// import vendorReducer from "./slices/vendorSlice";
// import vendorApplicationReducer from "./slices/vendorApplicationSlice";
// import organizationReducer from "./slices/organizationSlice";
// import orderReducer from "./slices/orderSlice";
// import productReducer from "./slices/productSlice";
// import categoryReducer from "./slices/categorySlice";
// import billReducer from "./slices/billSlice";
// import employeeReducer from "./slices/employeesSlice";
// import salaryReducer from "./slices/salarySlice";
// import attendanceReducer from "./slices/attendanceSlice";
// import dashboardReducer from "./slices/dashboardSlice";
// import mediaReducer from "./slices/mediaSlice";
// import notificationReducer from "./slices/notificationSlice";
// import locationReducer from "./slices/locationSlice";
// import subscriptionReducer from "./slices/subscriptionSlice";
// import invoiceSettingsReducer from "./slices/invoiceSettingsSlice";

// Configure the store
export const store = configureStore({
  reducer: {
    posts: postReducer,
    // Add other reducers as you create them:
    // user: userReducer,
    // customer: customerReducer,
    // vendor: vendorReducer,
    // vendorApplication: vendorApplicationReducer,
    // organization: organizationReducer,
    // orders: orderReducer,
    // product: productReducer,
    // category: categoryReducer,
    // bill: billReducer,
    // employee: employeeReducer,
    // salary: salaryReducer,
    // attendance: attendanceReducer,
    // dashboard: dashboardReducer,
    // media: mediaReducer,
    // notification: notificationReducer,
    // location: locationReducer,
    // subscription: subscriptionReducer,
    // invoiceSettings: invoiceSettingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          "posts/fetchPosts/pending",
          "posts/fetchPosts/fulfilled",
          // Add other actions that contain non-serializable data
        ],
        // Ignore these field paths in all actions
        ignoredActionsPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["posts.timestamp"],
      },
    }),
  devTools: import.meta.env.DEV,
});

// Export types for TypeScript (if you decide to use TypeScript later)
export const RootState = store.getState;
export const AppDispatch = store.dispatch;

// Typed hooks for use throughout the app
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export default store;
