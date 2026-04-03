import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL, PROFILE_PIC } from "../utils/Const";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const { firstName, lastName, age, gender, photoURL } = user || {};
  const [fName, setFName] = useState(firstName);
  const [lName, setLName] = useState(lastName);
  const [a, setA] = useState(age);
  const [g, setG] = useState(gender);
  const [pURL, setPURL] = useState(photoURL);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const updateProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName: fName,
          lastName: lName,
          age: a,
          gender: g,
          photoURL: pURL,
        },
        { withCredentials: true },
      );
      console.log(res.data.data);
      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      setError("");
    } catch (err) {
      console.error("Update profile error:", err);
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="card bg-neutral text-neutral-content w-1/2 m-auto mt-20 ">
      <div className="card-body items-center text-center">
        <div className="card card-side bg-base-100 shadow-sm bg-black p-10">
          <figure className=" mr-10">
            <img
              className="w-96 h-96"
              src={pURL || PROFILE_PIC}
              alt="Profile Picture"
            />
          </figure>
          <fieldset className="fieldset border-black  w-xs border p-4 bg-black ml-10">
            <label className="label">First Name </label>
            <input
              type="text"
              value={fName}
              className="input"
              placeholder="My awesome page"
              onChange={(e) => setFName(e.target.value)}
            />

            <label className="label">Last Name</label>
            <input
              type="text"
              className="input"
              value={lName}
              placeholder="my-awesome-page"
              onChange={(e) => setLName(e.target.value)}
            />
            <label className="label">Age</label>
            <input
              type="number"
              value={a}
              className="input input-bordered w-full mb-3"
              onChange={(e) => setA(e.target.value)}
            />

            <label className="label">Gender</label>
            <select
              className="select select-bordered w-full mb-3"
              value={g}
              onChange={(e) => setG(e.target.value)}
            >
              <option value="" disabled hidden>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <label className="label">Photo URL</label>
            <input
              type="text"
              className="input"
              placeholder="Name"
              value={pURL}
              onChange={(e) => setPURL(e.target.value)}
            />
            <button
              className="btn btn-neutral bg-gray-900 mt-6 w-full"
              onClick={updateProfile}
            >
              Update Profile
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </fieldset>
        </div>
        {showToast && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <span>Profile saved successfully.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
