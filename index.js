const express = require("express"); //Node framework
const cors = require("cors"); //Connects resources across domains

const app = express(); //Takes express library and runs it
const pool = require("./db"); //Using pool to write queries w/ postgres https://stackoverflow.com/questions/56352974/what-is-the-difference-between-pool-query-and-client-query-with-the-node-pg-libr
const PORT = process.env.PORT || 5000;
const path = require("path");

//Creates middleware
app.use(cors());
app.use(express.json());  //Gets data from client side by giving access to req.body/JSON data

//Routes

//Create todo
app.post("/todos", async(req, res) => {
    try {
        //Need to get data from client side to determine what needs to be added
        // console.log(req.body)
        const {task} = req.body;
        
        const newTodo = await pool.query("INSERT INTO todo (task) VALUES($1) RETURNING *", [task]); //$ 1 = placeholder variable - RETURNING gives back data when inserting, modifying, deleting
        res.json(newTodo.rows[0]); //Returns only the relevant information (ID and name)
    } catch (err) {
        console.error(err.message); //async resources - https://medium.com/bam-lambda/thoughts-on-await-and-try-catch-b810ab10763b
        //logger/morgan? to verify if requests hit
    }
})

//Get all todos
app.get("/todos", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows)
    } catch (err) {
        console.error(err.message);
    }
})

//Get one todo
app.get("/todos/:id", async(req, res) => { //:id allows URL to be dynamic
    try {
        const {id} = req.params;
        
        const oneTodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(oneTodo.rows[0])
    } catch (err) {
        console.error(err.message);
    }
})

//Edit todo
app.put("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const {task} = req.body; //Changes the task name to what's specified in request

        const editTodo = await pool.query("UPDATE todo SET task = $1 WHERE todo_id = $2", [task, id]);
        res.json("Succesfully Updated Task")
    } catch (err) {
        console.error(err.message)
    }
})
//Delete todo

app.delete("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        
        const delTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Successfully Deleted Task")
    } catch (err) {
        console.error(err.message)
    }
})


//Starts service by listening to port
app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});