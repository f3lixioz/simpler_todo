import './App.css';
import React, { Fragment } from 'react'; //https://reactjs.org/docs/fragments.html

//components
import InputTodo from "./components/InputTodo"
import ListTodo from "./components/ListTodo"
// import EditTodo from "./components/EditTodo"

function App() {
  return <Fragment>
    <div className= "container">
      <InputTodo />
      <ListTodo />
      {/* <EditTodo /> */}
    </div>
  </Fragment>;
}

export default App;
