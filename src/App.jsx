import './App.css';
import TodoList from "./TodoList.jsx";

const mongoose = require('mongoose');

mongoose.connect('YOUR_MONGODB_CONNECTION_STRING', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

function App() {
  return (
    <div className="app-container">
      <h1>Todo List</h1>
      <TodoList />
    </div>
  ); 
}

export default App;
