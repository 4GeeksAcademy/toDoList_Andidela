import React, { useEffect, useState } from "react";

//create your first component
const ToDo = () => {
    const [todos, setTodos] = useState([])
    function obtenerLista() {
        fetch('https://playground.4geeks.com/todo/users/AtiD', {
            method: 'GET'
        })
            .then(response => response.json())
            .then((data) => setTodos(data.todos)
            .catch(error => console.log(error))
            )
    }
    useEffect(()=>{
        obtenerLista()
    },[])
    
    return (
        <div className="paper" style={{ width: 500, marginLeft: 400, marginTop: 100 }}>
         <ul>
            {todos.map((item,index)=>{
                return (
                    <li key={index}>{item.label}</li>
                )
            })}
            </ul>   
        </div>
    );
};

export default ToDo;
