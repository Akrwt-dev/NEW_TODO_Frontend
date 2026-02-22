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
    <div className={`mx-10 my-6 rounded-4xl ${statusStyles[status]}`}>
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="list-row">
          <div>
            <img
              className="size-15 rounded-box"
              src={photoURL || todoIcon}
              alt="task"
            />
          </div>

          <div>
            <div className="text-2xl">{title}</div>
            <div className="text-xs uppercase font-semibold opacity-60">
              {new Date(dueDate).toLocaleDateString("en-CA")} • {priority}
            </div>

            <span
              className={`badge mt-1 ${
                status === "overdue"
                  ? "badge-error"
                  : status === "today"
                    ? "badge-warning"
                    : "badge-success"
              }`}
            >
              {status}
            </span>
          </div>

          <p className="list-col-wrap text-s">{description}</p>
          <button className="btn btn-square btn-ghost" onClick={deleteTask}>
            <svg
              className="size-[1.2em]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 26 26"
            >
              <circle cx="13" cy="13" r="12.5" fill="#ef4444" />

              <path
                d="M9.2 9.2C9.45 8.95 9.85 8.95 10.1 9.2L13 12.1L15.9 9.2C16.15 8.95 16.55 8.95 16.8 9.2L17.8 10.2C18.05 10.45 18.05 10.85 17.8 11.1L14.9 14L17.8 16.9C18.05 17.15 18.05 17.55 17.8 17.8L16.8 18.8C16.55 19.05 16.15 19.05 15.9 18.8L13 15.9L10.1 18.8C9.85 19.05 9.45 19.05 9.2 18.8L8.2 17.8C7.95 17.55 7.95 17.15 8.2 16.9L11.1 14L8.2 11.1C7.95 10.85 7.95 10.45 8.2 10.2L9.2 9.2Z"
                fill="white"
              />
            </svg>
          </button>
          <button className="btn btn-square btn-ghost" onClick={deleteTask}>
            <svg
              className="size-[1.2em]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 26 26"
            >
              <circle cx="13" cy="13" r="12.5" fill="#22c55e" />

              <path
                d="M10.3 17.6L6.9 14.2C6.65 13.95 6.65 13.55 6.9 13.3L8.1 12.1C8.35 11.85 8.75 11.85 9 12.1L10.75 13.85L17 7.6C17.25 7.35 17.65 7.35 17.9 7.6L19.1 8.8C19.35 9.05 19.35 9.45 19.1 9.7L11.2 17.6C10.95 17.85 10.55 17.85 10.3 17.6Z"
                fill="white"
              />
            </svg>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Task;
