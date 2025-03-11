import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer"; // import your rootReducer

const store = configureStore({
  reducer: rootReducer, // assign the rootReducer
});

export default store;