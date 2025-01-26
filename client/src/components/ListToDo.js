import React, {Fragment, useState, useEffect} from 'react';
import EditToDo from './EditToDo';

const ListToDo = () => {

    const [todos, setTodos]= useState([]);

    async function deleteTodo(id){
        try{
            await fetch(`http://localhost:3000/todos/${id}`,{
                method: "DELETE",
            });
            
            setTodos(todos.filter(todo => todo.todo_id !== id))

        }catch(err){
            console.log(err.message);
        }
    }


    async function getTodos(){
        const res= await fetch("http://localhost:3000/todos");

        const toArray= await res.json();
        
        setTodos(toArray);
    };

    useEffect(() =>{
        getTodos();
    },[]);

    return (
        <Fragment>
            <table class="table mt-5">
                <thead>
                    <tr>
                    <th scope="col">Description</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr> */}
                    {
                        todos.map(todo => (
                            <tr key={todo.todo_id}>
                                <td>{todo.description}</td>
                                <td>
                                    <EditToDo todo={todo}/>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListToDo;    