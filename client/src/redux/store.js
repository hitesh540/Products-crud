import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../redux/features/ProductSlice";

export default configureStore({
  reducer: {
    app: ProductReducer,
  },
});
