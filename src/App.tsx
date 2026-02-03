import { useState } from 'react'
import './App.css'
import { addTodo } from './services/CRUD/todoService'
import { supabase } from './auth/service/supabase_client'

function App() {
  const [todoList, setTodoList] = useState([])
  const [newTodo, setNewTodo] = useState("")

  const addTodo = async () => {
    const newTodoData = {
      name: newTodo,
      isCompleted: false,
    }
    const { data, error } = await supabase.from("TodoList").insert([newTodoData]).single();

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
        <input type='text' placeholder='Add Todo ...' onChange={(e) => setNewTodo(e.target.value)} />
        <button onClick={addTodo} >Submit</button>
      </div>

      <ul>

      </ul>
    </div>
  )
}

export default App
