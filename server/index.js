const express= require('express');
const app= express();
const cors= require('cors');
const pool=require('./db');


//Middleware
app.use(cors());
app.use(express.json());

//Routes

//create a todo

app.post("/todos",async(req,res) => {
    try{
        const {description} = req.body;
        const newtodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING * " ,[description]);
        res.json(newtodo.rows[0]);
    }catch(err){
        console.log(err.message);
    }
})

//get all todo
app.get("/todos",async(req,res) => {
    try{
        const alltodo = await pool.query("SELECT * FROM todo");
        res.json(alltodo.rows);
    }catch(err){
        console.log(err.message);
    }
})

//get a todo
app.get("/todos/:id",async(req,res) => {
    try{
        const {id}= req.params;
        const todo= await pool.query("SELECT * FROM todo WHERE todo_id=$1",[id]);
        res.json(todo.rows[0]);
    }catch(err){
        console.log(err.message);
    }
})

//update a todo
app.put("/todos/:id",async(req,res) => {
    try{
        const {id}= req.params;
        const {description}= req.body;
        const updatetodo= await pool.query("UPDATE todo SET description=$1 WHERE todo_id=$2",[description,id]);
        res.json("updated");
    }catch(err){
        console.log(err.message);
    }
})

//delete a todo
app.delete("/todos/:id",async(req,res) => {
    try{
        const {id}= req.params;
        const todo= await pool.query("DELETE FROM todo WHERE todo_id=$1",[id]);
        res.json("deleted");
    }catch(err){
        console.log(err.message);
    }
})

app.listen(3000,() =>{
    console.log("server is listening on port 3000");
})