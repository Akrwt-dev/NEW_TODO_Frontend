import axios from "axios";
import React, { use, useState } from "react";
import { BASE_URL } from "../utils/Const";
import { useDispatch } from "react-redux";
import { addTask } from "../utils/taskSlice";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const addYourTask = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/add",
        {
          title,
          description,
          dueDate,
          priority,
          photoURL,
        },
        { withCredentials: true },
      );
      dispatch(addTask(res.data.data));
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("medium");
      setPhotoURL("");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to add Task");
      console.log(err);
      console.error("Failed to add the task");
    }
  };

  return (
    <div className="bg-base-300 h-[calc(100vh-2rem)] mx-6 mr-12 rounded-2xl overflow-hidden">
      <h1 className="text-2xl pt-6 pl-6 font-semibold">Add Task</h1>

      <div className="w-full px-4 pb-4">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-xl w-full border p-4 mt-4">
          <label className="label text-base font-medium">Title</label>
          <input
            type="text"
            value={title}
            className="input input-bordered w-full text-sm"
            placeholder="Enter the title"
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="label mt-3 text-base font-medium">
            Description
          </label>
          <textarea
            className="textarea textarea-bordered w-full h-28 text-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label className="label text-base font-medium mt-3">Due Date</label>
          <input
            type="date"
            value={dueDate}
            className="input input-bordered w-full text-sm"
            onChange={(e) => setDueDate(e.target.value)}
          />

          <label className="label text-base font-medium mt-3">Priority</label>
          <select
            className="select select-bordered w-full text-sm"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="" disabled hidden>
              Select Priority
            </option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <label className="label text-base font-medium mt-3">Photo URL</label>
          <input
            type="text"
            value={photoURL}
            className="input input-bordered w-full text-sm"
            placeholder="Enter the Photo URL"
            onChange={(e) => setPhotoURL(e.target.value)}
          />

          {error && (
            <p className="text-red-500 text-center mt-2 text-sm">{error}</p>
          )}

          <button className="btn btn-neutral mt-4 w-full text-sm">
            Add Task
          </button>
        </fieldset>
      </div>
    </div>
  );
};

export default AddTask;
