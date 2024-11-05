import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    books : [
        {id: 1,name : 'live long',author : 'James', price : 15, quantity : 20},
        {id: 2, name : 'die soon',author : 'Bond', price : 25, quantity : 60}
    ]}

const booksSlice = createSlice({
    name : 'books',
    initialState,
    reducers : {
        deleteBook : (state,action) => {
           state.books =  state.books.filter(book => book.id !== action.payload);
        },
        addBook : (state,action) => {
            state.books.push(action.payload);
        },
        updateBook : (state,action) => {
          const {id,name,price,author,quantity} = action.payload;
          const existingBook = state.books.find((book) => book.id === id);
          if(existingBook){
            existingBook.name = name
            existingBook.author = author
            existingBook.price = price
            existingBook.quantity = quantity
          }
        } 
    }
}) 

export const {deleteBook,addBook,updateBook} = booksSlice.actions;
export default booksSlice.reducer;