import React, { useEffect, useState } from "react";

//create your first component
const ToDo = () => {
    const [todos, setTodos] = useState([])
    const [input, setInput] = useState('')
    function obtenerLista() {
        fetch('https://playground.4geeks.com/todo/users/AtiD', {
            method: 'GET'
        })
            .then(response => response.json())
            .then((data) => setTodos(data.todos)
                // .catch(error => console.log(error))
            )
    }
    function agregarLista() {
        fetch('https://playground.4geeks.com/todo/todos/AtiD', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ label: input, done: false })
        }
        )
            .then(response => response.json())
            .then((data) => setTodos([...todos, data]))
        obtenerLista()
        setInput("")
        // .catch(error => console.log(error))
    }
    const deleteTarea =(id) => {
        fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
    
                    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
                } else {
                    console.error("No se borro tarea", response.status);
                }
            })
            .catch((error) => console.error("Error al borrar:", error));
    }
    
    function crearUsuario() {
        fetch('https://playground.4geeks.com/todo/users/AtiD', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
        }
        )
        // .catch(error => console.log(error))
    }

useEffect(() => {
    crearUsuario()
    obtenerLista()
}, [])

return (
    <div className="paper" style={{ width: 500, marginLeft: 400, marginTop: 100 }}>
        <input placeholder="Agregar tarea" value={input} type='text' onChange={(e) => setInput(e.target.value)} />
        <button type="button" className="btn btn-primary" onClick={agregarLista}>Agregar tarea</button>
        {todos.length > 0 ? (
        <ul>
            {todos.map((item, index) => {
                return (
                    <li key={index}>{item.label} <span onClick={() => deleteTarea(item.id)}>x</span></li>
                )
            })}
        </ul>):(<p>No hay tareas en la lista</p>)}
    </div>
);
};

export default ToDo;
