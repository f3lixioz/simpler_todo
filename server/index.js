const express = require("express"); //Node framework
const cors = require("cors"); //Connects resources across domains

const app = express(); //Takes express library and runs it

//Creates middleware
app.use(cors());
app.use(express.json());  //Gets data from client side with request.body obj


//Starts service by listening to port
app.listen(5000, () => {
    console.log("Server has started on port 5000")
})