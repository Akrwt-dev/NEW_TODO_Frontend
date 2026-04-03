import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/Const";
import { useDispatch } from "react-redux";
import { removeTask } from "../utils/taskSlice";
import todoIcon from "../assets/to-do-list.png";

const Task = ({ task }) => {
  const {
    title,
    description,
    completed,
    dueDate,
    priority,
    _id,
    remainingDays,
    photoURL,
  } = task;
  const dispatch = useDispatch();

  const deleteTask = async () => {
    try {
      await axios.delete(`${BASE_URL}/delete/${_id}`, {
        withCredentials: true,
      });
      dispatch(removeTask(_id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };
  const getStatus = () => {
    if (task.remainingDays < 0) return "overdue";
    if (task.remainingDays === 0) return "today";
    return "upcoming";
  };
  const statusStyles = {
    overdue: "border-l-4 border-red-500 bg-red-50",
    today: "border-l-4 border-yellow-500 bg-yellow-50",
    upcoming: "border-l-4 border-green-500 bg-green-50",
  };

  const status = getStatus();

  return (
    <div className={`mx-6 my-3 rounded-xl ${statusStyles[status]}`}>
      <div className="bg-base-100 rounded-xl shadow-sm p-3 flex items-start gap-3">
        <img
          className="w-12 h-12 rounded-lg object-cover"
          src={photoURL || todoIcon}
          alt="task"
        />
        <div className="flex-1">
          <div className="text-base font-semibold">{title}</div>

          <div className="text-xs opacity-60 mt-1">
            {new Date(dueDate).toLocaleDateString("en-CA")} • {priority}
          </div>

          <span
            className={`badge mt-2 text-xs ${
              status === "overdue"
                ? "badge-error"
                : status === "today"
                  ? "badge-warning"
                  : "badge-success"
            }`}
          >
            {status}
          </span>

          <p className="text-sm mt-2 opacity-80">{description}</p>
        </div>
        <div className="flex flex-col gap-2">
          <button className="btn btn-sm btn-ghost" onClick={deleteTask}>
            ❌
          </button>

          <button className="btn btn-sm btn-ghost">✅</button>
        </div>
      </div>
    </div>
  );
};

export default Task;
