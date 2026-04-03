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
    <div className="max-w-4xl mx-auto mt-12 px-4">
      <div className="bg-base-300 rounded-2xl shadow-md p-6 flex gap-6 items-start">
        <div className="flex flex-col items-center">
          <img
            className="w-32 h-32 rounded-xl object-cover"
            src={pURL || PROFILE_PIC}
            alt="Profile"
          />
          <p className="text-xs mt-2 opacity-60">Preview</p>
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm">First Name</label>
              <input
                type="text"
                value={fName}
                className="input input-bordered w-full text-sm mt-1"
                onChange={(e) => setFName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm">Last Name</label>
              <input
                type="text"
                value={lName}
                className="input input-bordered w-full text-sm mt-1"
                onChange={(e) => setLName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm">Age</label>
              <input
                type="number"
                value={a}
                className="input input-bordered w-full text-sm mt-1"
                onChange={(e) => setA(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm">Gender</label>
              <select
                className="select select-bordered w-full text-sm mt-1"
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
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm">Photo URL</label>
            <input
              type="text"
              value={pURL}
              className="input input-bordered w-full text-sm mt-1"
              onChange={(e) => setPURL(e.target.value)}
            />
          </div>

          <button
            className="btn btn-neutral mt-5 w-full text-sm"
            onClick={updateProfile}
          >
            Update Profile
          </button>

          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success text-sm">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
