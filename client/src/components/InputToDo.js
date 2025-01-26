import React, { Fragment, useState } from 'react';

const InputToDo = () =>{

    const [description, setDescription]=useState("");
    
    const onSumbitForm = async (e) => {
        e.preventDefault();
        try{
            const body= {description};
            const response= await fetch("http://localhost:3000/todos",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            });
            window.location = "/";
        }catch(err){
            console.log(err.message);
        }
    }

    return(
    <Fragment>
        <h1 className="text-center my-5">Input Todo</h1>
        <form className="d-flex" onSubmit={onSumbitForm}>
            <input type="text" placeholder="add Todo" className="form-control" value={description} onChange={e => setDescription(e.target.value)}/>
            <button className="btn btn-success">Add</button>
        </form>
    </Fragment>
    );
};

export default InputToDo;