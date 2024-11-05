import React, { FormEvent, useEffect, useState } from 'react'
import './App.css';
import { nanoid } from 'nanoid';

type Todo = {
  id: string,
  title : string,
  description : string,
  date : string
}
function App() {
  const [todos,setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  })
  const [completed, setCompleted] = useState<Todo[]>(() => {
    const completedTodo = localStorage.getItem('completed');
    return completedTodo ? JSON.parse(completedTodo) : [];
  })


  useEffect(() => {
    localStorage.setItem('todos',JSON.stringify(todos))
  },[todos])

  const handleDelete = (id : string) => {
    const remaining = todos.filter((todo : Todo) => todo.id !== id);
    setTodos(remaining);
  }

  useEffect(() => {
    localStorage.setItem('completed',JSON.stringify(completed))
  },[completed])

  const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
    const form = e.target as HTMLFormElement;
    const title = (form.elements.namedItem('title') as HTMLInputElement).value;
    const description = (form.elements.namedItem('description') as HTMLInputElement).value;
    const date = (form.elements.namedItem('date') as HTMLInputElement).value;
    const todo = {
      title,description,date,id : nanoid()
    };
    setTodos([...todos,todo]); 
  }


  const handleComplete = (e : React.ChangeEvent<HTMLInputElement>,tasks : Todo) => {
    if(e.target.checked){
      setCompleted([...completed,tasks]);
      const remaining = todos.filter((todo : Todo) => todo.id !== tasks.id);
      setTodos(remaining);
    }
  }

  const handleCompletedTodosDelete = (id : string) => {
    const remaining = completed.filter((todo : Todo) => todo.id !== id);
    setCompleted(remaining);
  }

  return (
    <>
      <h2>Add Todos</h2>
      <form
        onSubmit={handleSubmit}
        className="border w-96 mx-auto p-5 space-y-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="border p-2 w-full focus:outline-none"
        />
        <input
          type="text"
          name="description"
          placeholder="Note"
          className="border p-2 w-full focus:outline-none"
        />
        <input
          type="date"
          name="date"
          className="border p-2 focus:outline-none w-full"
        />
        <button
          type="submit"
          className="py-2 w-full bg-green-500 font-semibold text-white"
        >
          Add Todo
        </button>
      </form>

      <div className='grid grid-cols-6 gap-10'>
        {/* Todo-list */}
          <div className='col-span-3 mt-10'>
              <h2 className='mb-5 text-2xl'>Todo-Lists</h2>
              <div className='flex flex-col items-center'>
                {
                  todos.length > 0 ? todos?.map(todo => {
                    return <div key={todo.id} className='flex gap-5 items-center mb-5'>
                    <input onChange={(e) => handleComplete(e,todo)} type="checkbox" name={todo.title} id={todo.id} />
                    <h2>{todo.title}</h2>
                    <p>{todo.description}</p>
                    <p className='text-nowrap'>{todo.date}</p>
                    <button onClick={() => handleDelete(todo.id)} className='bg-red-500 font-semibold text-white'>Delete</button>
                </div>
                  }) : <p>No Todos Available</p>
                }
              </div>
          </div>
          {/* completed list */}
          <div className='col-span-3 mt-10'>
            <h2 className='mb-5 text-2xl'>Completed Todo-Lists</h2>
            <div className='flex flex-col items-center'>
                {
                  completed.length > 0 ? completed.map(todo => {
                    return <div key={todo.id} className='flex gap-5 items-center'>
                    <input type="checkbox" checked name={todo.title} id={todo.id} />
                    <h2>{todo.title}</h2>
                    <p>{todo.description}</p>
                    <p className='text-nowrap'>{todo.date}</p>
                    <button onClick={() => handleCompletedTodosDelete(todo.id)} className='bg-red-500 font-semibold text-white'>Delete</button>
                </div>
                  }) : <p>No Completed Todos Available</p>
                }
              </div>
          </div>
      </div>
    </>
  )
}

export default App
