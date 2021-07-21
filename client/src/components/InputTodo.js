// import e from "express";
import React, {Fragment, useState} from "react";

const InputTodo = () => {

    const [task, setTask] = useState("");
    
    const onSubmitForm = async(e) => {
        e.preventDefault(); //don't want this to refresh
        try {
            const body = {task};
            const response = await fetch("http://localhost:5000/todos", {
                method: "Post", //add data to db! default is fetch, so need to specify
                headers: {"Content-Type": "application/json"}, //sending JSON data
                body: JSON.stringify(body)
            });
            // console.log(response);
            window.location = "/"; //Once submitted, will refresh/show changes
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className="text-center mt-5 text-white">Simpler Todo App</h1>
            <form className= "d-flex mt-5" onSubmit={onSubmitForm}>
                <input 
                    type = "text" 
                    className="form-control" 
                    value={task} 
                    onChange={e => setTask(e.target.value)} //targets the input and gets resulting value
                />
                <button className = "btn btn-success">Add</button>
            </form>
        </Fragment>
    )
}

export default InputTodo;