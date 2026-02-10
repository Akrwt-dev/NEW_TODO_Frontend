import React, { useEffect } from "react";
import axios from "axios";

const Task = () => {
  const allTask = async () => {
    const task = await axios.get("http://localhost:4000/health", {
      withCredentials: true,
    });
    console.log(task)
  };
//   useEffect(()=>{
//     allTask()
//   },[]);
     allTask()
  

  return <div>
    hiii
  </div>;
};

export default Task;
