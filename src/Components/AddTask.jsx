import axios from "axios";
import React, { use, useState } from "react";
import { BASE_URL } from "../utils/Const";
import { useDispatch } from "react-redux";
import { addTask } from "../utils/taskSlice";

const AddTask = () => {
  const [title, setTitle] = useState("");
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
        },
        { withCredentials: true },
      );
      console.log(res.data.data);
      dispatch(addTask(res.data.data));
      setTitle("")
      setDescription("")
      setDueDate("")
      setPriority("medium")
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to add Task");
      console.log(err);
      console.error("Failed to add the task");
    }
  };

  return (
    <div className="bg-base-300 h-[calc(100vh-2rem)] mx-6 mr-12 rounded-4xl overflow-hidden">
      <h1 className="text-4xl pt-6 pl-10">ADD Task</h1>
      <div className="w-full px-6 pb-6">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full  border p-6 mt-6">
          <label className="label text-3xl">Title</label>
          <input
            type="Text"
            value={title}
            className="input input-bordered w-full textarea-info text-xl"
            placeholder="Enter the title"
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="label mt-4 text-2xl">Description</label>
          <textarea
            className="textarea textarea-info w-full h-40 text-xl"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <label className="label text-2xl">Due Date</label>
          <input
            type="Date"
            value={dueDate}
            className="input input-bordered w-full textarea-info text-xl "
            placeholder="Enter the title"
            onChange={(e) => setDueDate(e.target.value)}
          />
          <label className="label">Priority</label>
          <select
            className="select select-bordered w-full mb-3 textarea-info text-xl"
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
          {error && <p className="text-red-500 text-center mt-3">{error}</p>}
          <button className="btn btn-neutral mt-6 w-full" onClick={addYourTask}>
            Add Task
          </button>
        </fieldset>
      </div>
    </div>
  );
};

export default AddTask;
