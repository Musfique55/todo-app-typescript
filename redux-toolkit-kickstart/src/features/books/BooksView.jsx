import { useDispatch, useSelector } from "react-redux";
import { addBook, deleteBook, updateBook } from "./booksSlice";
import { nanoid } from 'nanoid';
import { useState } from "react";

const BooksView = () => {
    const books = useSelector((state) => state.booksR.books);
    const dispatch = useDispatch();
    const [current,setCurrent] = useState([]);
    
    const handleDelete = (id) => {
        dispatch(deleteBook(id))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value; 
        const author = form.author.value; 
        const price = parseInt(form.price.value); 
        const quantity = parseInt(form.quantity.value); 
        const book = {name,author,price,quantity,id : nanoid()};
        dispatch(addBook(book))
    }


    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value; 
        const author = form.author.value; 
        const price = parseInt(form.price.value); 
        const quantity = parseInt(form.quantity.value); 
        const id = current.id;
        const book = {name,author,price,quantity,id};
        dispatch(updateBook(book));
        
    }

    const handleEdit = (book) => {
        setCurrent(book)
    }

    // console.log(current);
    return (
        <div>
            Books
            {
                books.length > 0 ? books?.map(book => {
                    return <li key={book.id}>{book.name} {book.author} {book.price}$ {book.quantity} 
                    <button onClick={() => handleEdit(book)}>Edit Book</button>
                    <button onClick={() => handleDelete(book.id)}>Delete</button></li>
                    
                }) : <p>No books found</p>
            }

            <h2>New Book</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name"/>
                <input type="text" name="author"/>
                <input type="text" name="price"/>
                <input type="text" name="quantity"/>
                <button type="submit">Add Book</button>
            </form>
            <h2>Update Book</h2>
            <form onSubmit={handleUpdate}>
                <input type="text" name="name" defaultValue={current ? current.name : undefined}/>
                <input type="text" name="author" defaultValue={current ? current.author : undefined}/>
                <input type="text" name="price" defaultValue={current ? current.price : undefined}/>
                <input type="text" name="quantity" defaultValue={current ? current.quantity : undefined}/>
                <button type="submit">Update Book</button>
            </form>
        </div>
    );
};

export default BooksView;