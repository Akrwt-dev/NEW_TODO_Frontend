import React, { useEffect, useState } from "react";
import Task from "./Task";
import axios from "axios";
import { BASE_URL } from "../utils/Const";
import { useDispatch, useSelector } from "react-redux";
import { addTask, setTasks } from "../utils/taskSlice";

const TodayTask = () => {
  const dispatch = useDispatch();
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [taskView, setTaskView] = useState("all");
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
    <div className="bg-base-300 h-[calc(100vh-2rem)] mx-5 rounded-2xl overflow-hidden ml-8">
      <h1 className="text-2xl pt-5 pl-6 font-semibold">Tasks</h1>

      <div className="px-6 mt-3 flex gap-3">
        <select
          className="select select-bordered text-sm rounded-xl"
          value={taskView}
          onChange={(e) => setTaskView(e.target.value)}
        >
          <option value="all">All Tasks</option>
          <option value="today">Today Tasks</option>
        </select>

        <select
          className="select select-bordered text-sm rounded-xl"
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
        >
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="w-full h-full px-6 mt-4">
        <div className="border-t border-base-200 pt-4">
          {visibleTasks.length === 0 ? (
            <p className="text-center text-sm opacity-60 mt-8">
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
