import { useEffect, useState } from 'react'
import './App.css'
import { addTodo } from './services/CRUD/todoService'
import { supabase } from './auth/service/supabase_client'

type TodoItem = {
  name:string,
  isCompleted: boolean
}


function App() {
  const [todoList, setTodoList] = useState<TodoItem[]>([])
  const [newTodo, setNewTodo] = useState("")

  const addTodo = async () => {
    const newTodoData = {
      name: newTodo,
      isCompleted: false,
    }
    const { data, error } = await supabase.from("TodoList").insert([newTodoData]).single();

    useEffect(()=>{fetchTodos}, []);
    
  const fetchTodos = async() =>{
    const {data, error} = await supabase.from("TodoList").select("*");
    if(error) {
      console.log("Error fetching:", error);
    } else {
      setTodoList(data);
    }
  }

    if (error) {
      console.log('Error loading todo', error);
    } else {
      setTodoList((prev) => (prev, data));
      setNewTodo("");
    }
  }


  return (
    <div>
      <h1>To do List</h1>
      <div>
        <input type='text' value={newTodo} placeholder='Add Todo ...' onChange={(e) => setNewTodo(e.target.value)} />
        <button onClick={addTodo} >Submit</button>
      </div>

      <ul>
      {todoList.map((todo) => (
        <li> 
          <p>{todo.name}</p>
          <button>{todo.isCompleted? 'Undo' : 'Complete'}</button>
        </li>
      ))}
      </ul>
    </div>
  )
}

export default App
