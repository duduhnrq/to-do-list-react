import { useState } from 'react';
import TodoItem from './TodoItem';


function TodoList() {
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Learn React', completed: false },
        { id: 2, text: 'Build a To-Do App', completed: false },
        { id: 3, text: 'Deploy the App', completed: false }
    ]);

    const [text, setText] = useState('');

    function addTask(text) {
        const newTask = {
            id: Date.now(),
            text: text,
            completed: false
        };
        setTasks([...tasks, newTask]);
        setText('');
    }

    function deleteTask(id) {
        setTasks(tasks.filter(task => task.id !== id));
    }

    function toggleTaskCompletion(id) {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    }

    return (
        <div className="container">
            <div className='todo-header'>
                <h1>To-Do List</h1>
            </div>
            <div className='todo-body'>
                <div className='todo-input'>
                    <input
                        type="text"
                        className='form-control'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Add a new task"
                    />
                    <button className='btn btn-primary' onClick={() => addTask(text)}>Add Task</button>
                </div>
                <div className='todo-list'>
                    <ul>
                        {tasks.map(task => (
                            <TodoItem
                                key={task.id}
                                task={task}
                                deleteTask={deleteTask}
                                toggleTaskCompletion={toggleTaskCompletion}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default TodoList;