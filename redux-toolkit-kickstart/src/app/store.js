import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import booksReducer from "../features/books/booksSlice";
import postReducer from "../features/posts/postSlice";

export const store = configureStore({
    reducer : {
        counter : counterReducer,
        booksR : booksReducer,
        postsR : postReducer
    }
})