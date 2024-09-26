import "./TodoList.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

mongoose.connect('MONGODB_URL', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

function TodoList() {
    let [todos, setTodos] = useState([{task:"sample-Task", id:uuidv4(), isDone:false}]);
    let [newTodo, setNewTodo] = useState(" ");

    let addNewTask = () => {
        setTodos([...todos, {task:newTodo, id:uuidv4(), isDone:false}]);
        setNewTodo("");
    };

    let updateTodoValue = (event) => {
        setNewTodo(event.target.value);
    };

    let deleteTodo = (id) => {
        setTodos((prevTodos) => todos.filter((prevTodos) => prevTodos.id!=id));
    };

    let markAsDone = (id) => {
        setTodos((prevTodos) => (
            prevTodos.map((todo) => {
                if (todo.id == id) {
                    return {
                        ...todo,
                        isDone:true,
                    };
                } else {
                    return todo;
                }
            })
        ))
    }

    let markAllDone = () => {
        setTodos((todos) => (
            todos.map((todo) => {
                return {
                    ...todo,
                    isDone:true,
                };
            })
        ))
    }

    return (
        <div style={{ flexDirection:"column", justifyContent:"center", textAlign:"center", marginBottom:"2px"}}>
            <input
               placeholder="Add a Task"
               value={newTodo}
               onChange={updateTodoValue}
            ></input>
            <br/> <br/>

            <div className="buttons-container">
                <button onClick={addNewTask} className="task-button">Add Task</button>
                <button onClick={markAllDone} className="mark-all-done">Mark All Done</button>
            </div>
            <br/> <br/>
            <hr />

            <h4> Task Todo</h4>

            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <span className={todo.isDone ? "completed-task" : ""}>
                            {todo.isDone && <span style={{color: "#28a745"}}>✓ </span>} 
                            {todo.task}
                        </span>
                        &nbsp; &nbsp;

                        <button onClick={() => deleteTodo(todo.id)} className="delete-button">Delete</button>
                        <button onClick={() => markAsDone(todo.id)} className="mark-as-done">Mark As Done</button>
                           
                    </li>
                ))}
            </ul>  
        </div>
    )
}

export default TodoList




