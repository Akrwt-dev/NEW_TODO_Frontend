import React from "react";
import Task from "./Task";

const TodayTask = () => {
  return (
    <div className="bg-base-300 h-[calc(100vh-2rem)] mx-5 rounded-4xl overflow-hidden">
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