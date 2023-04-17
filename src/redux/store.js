import {configureStore} from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice.js";
import categoryReducer from "./categorySlice.js";
import productReducer from "./productSlice.js";
import cartReducer from "./cartSlice.js";
import searchReducer from "./searchSlice.js";

const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        category: categoryReducer,
        product: productReducer,
        cart: cartReducer,
        search: searchReducer
    }
});

export default store;