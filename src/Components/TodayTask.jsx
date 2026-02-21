import React from "react";
import Task from "./Task";
import axios from "axios";
import { BASE_URL } from "../utils/Const";

const TodayTask = () => {
  const allTask = async()=>{
    const res = await axios.get(BASE_URL + "/task",{withCredentials:true})
    console.log(res);
  }
  
  return (
    <div className="bg-base-300 h-[calc(100vh-2rem)] mx-5 rounded-4xl overflow-hidden ml-10">
      <h1 className="text-4xl pt-5 pl-10">Today Task</h1>

      <div className="w-full h-full">
        <div className="box-border border-b-cyan-400">
          <Task />
        </div>
      </div>
    </div>
  );
};

export default TodayTask;