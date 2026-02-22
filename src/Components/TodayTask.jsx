import React, { useEffect, useState } from "react";
import Task from "./Task";
import axios from "axios";
import { BASE_URL } from "../utils/Const";
import { useDispatch, useSelector } from "react-redux";
import { addTask, setTasks } from "../utils/taskSlice";

const TodayTask = () => {
  const dispatch = useDispatch();
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [taskView, setTaskView] = useState("today");
  const tasks = useSelector((store) => store.task.tasks);
  const visibleTasks = (tasks || []).filter((task) => {
    if (taskView === "today" && task.remainingDays !== 0) {
      return false;
    }
    if (selectedPriority !== "all" && task.priority !== selectedPriority) {
      return false;
    }
    return true;
  });
  const allTask = async () => {
    try {
      const res = await axios.get(BASE_URL + "/task", {
        withCredentials: true,
      });
      dispatch(setTasks(res.data.tasks));
    } catch (err) {
      console.error("Failed to add the task");
    }
  };
  useEffect(() => {
    allTask();
  }, []);

  return (
    <div className="bg-base-300 h-[calc(100vh-2rem)] mx-5 rounded-4xl overflow-hidden ml-10">
      <h1 className="text-4xl pt-5 pl-10">Task</h1>
      <div className="px-10 mt-4 flex gap-4">
        <select
          className="select select-bordered mt-5 rounded-4xl"
          value={taskView}
          onChange={(e) => setTaskView(e.target.value)}
        >
          <option value="today">Today Tasks</option>
          <option value="all">All Tasks</option>
        </select>
        <select
          className="select select-bordered ml-11 mt-5 rounded-4xl"
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
        >
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="w-full h-full">
        <div className="box-border border-b-cyan-400">
          {visibleTasks.length === 0 ? (
            <p className="text-center text-lg opacity-70 mt-10">
              No tasks found
            </p>
          ) : (
            visibleTasks.map((task) => <Task key={task._id} task={task} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default TodayTask;
