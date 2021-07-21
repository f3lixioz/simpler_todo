import React, { Fragment, useEffect, useState} from "react";
// import EditTodo from "./EditTodo"


const ListTodo = () => {
    
    const [todos, setTodos] = useState([]);
    

    //delete function

    const delTodo = async (id) => {
        try {
            const delTodo = await fetch(`http://localhost:5000/todos/${id}`, {method: "DELETE"});
            // window.location = "/";
            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (err) {
            console.error(err.message)
        }
    }

    //list function
    const getTodos = async () => {
        try {
            
            const response = await fetch("http://localhost:5000/todos")
            const jsonData = await response.json() //need to parse it first 

            setTodos(jsonData);
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect( () => {
        getTodos();
    }, []); //[] To avoid making multiple requests

    return <Fragment>        
        <table class="table mt-5 text-white">
            <thead>
            <tr>
                <th width="1000">Task</th>
                <th width="1"></th>
                {/* <th> </th> */}
            </tr>
            </thead>
            <tbody>
            {/* <tr>
                <td>John</td>
                <td>Doe</td>
                <td>john@example.com</td>
            </tr> */}
            {todos.map(todo => (
                <tr key={todo.todo_id}>
                    <td>{todo.task}</td>
                    {/* <td><EditTodo /></td> */}
                    <td class="w3-right-align"><button className = "btn btn-danger" onClick={() => delTodo(todo.todo_id)}>Delete</button></td>
                </tr>
            ))}
            </tbody>
    </table>
        </Fragment>;
    
};

export default ListTodo;