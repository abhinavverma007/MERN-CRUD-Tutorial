import logo from './logo.svg';
import './App.css';
import React from 'react';
// import to wrap in curly brace else error
import {useState} from 'react';
import {useEffect} from 'react';
// library for sending HTTP requests
import Axios from 'axios';

function App() {
  const [foodName,setFoodName]=useState("");
  const [days,setDays]=useState(0);
  const [foodList,setFoodList]=useState([]);
  const [newFoodName,setnewFoodName]=useState(' ');

   // will run everytime page refreshes
  useEffect( ()=>{
    Axios.get('http://localhost:3001/read').then( (response)=> {
      setFoodList(response.data);
    });
  }, [] );
  const addToList = () => {
    Axios.post("http://localhost:3001/insert" , { nameOfFood: foodName, numberOfDays: days});
  };

  const updateFood=(id) => {
    Axios.put("http://localhost:3001/update" , { id: id, updateFood: newFoodName})
  }

  const deleteFood=(id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
  }
  return (
    <div className="App">
      <h1> CRUD app with MERN </h1>
      <label> Food Name: </label>
      <input type="text" onChange={ (event)=> {
        setFoodName(event.target.value)
      }}/>
      <label> Days Since You ate It : </label>
      <input type="number" onChange={ (event)=> {
        setDays(event.target.value)
      }} />
      <button onClick={addToList}> Add to List</button>
      <h1> Food List </h1>
      
      {foodList.map( ( val , key )=> {
        return <div key={key}> 
        <h1>{ val.foodName} </h1>
         <h1> { val.daysSinceIAte}</h1>
         <input type="text" placeholder="Your new name..." onChange={ (event)=> {
        setnewFoodName(event.target.value)}}/>
         <button onClick={()=> updateFood(val._id)}  > Update </button>
         <button onClick={()=> deleteFood(val._id)}  > Delete </button>
         
         </div>
      })
      }
      </div>
  );
}

export default App;
