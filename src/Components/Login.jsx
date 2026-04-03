import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/Const";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isLogIn, setIsLogIn] = useState(true);
  const [firstName, setFirstName] = useState("Anuj");
  const [lastName, setLastName] = useState("Pundir");
  const [emailId, setEmailId] = useState("anuj@gmail.com");
  const [password, setPassword] = useState("Anuj@123");
  const [age, setAge] = useState("20");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogIn = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
          age,
          gender,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (error) {
      setError(error?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <fieldset className="bg-base-200 border border-base-300 rounded-xl w-full max-w-md p-6 shadow-lg mb-72">
        <legend className="text-3xl font-bold text-center mb-4">
          {isLogIn ? "Login" : "Sign Up"}
        </legend>

        {!isLogIn && (
          <>
            <label className="label">First Name</label>
            <input
              type="text"
              value={firstName}
              className="input input-bordered w-full mb-3"
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="label">Last Name</label>
            <input
              type="text"
              value={lastName}
              className="input input-bordered w-full mb-3"
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}

        <label className="label">Email</label>
        <input
          type="email"
          value={emailId}
          className="input input-bordered w-full mb-3"
          placeholder="Enter email"
          onChange={(e) => setEmailId(e.target.value)}
        />

        {!isLogIn && (
          <>
            <label className="label">Age</label>
            <input
              type="number"
              value={age}
              className="input input-bordered w-full mb-3"
              onChange={(e) => setAge(e.target.value)}
            />

            <label className="label">Gender</label>
            <select
              className="select select-bordered w-full mb-3"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="" disabled hidden >Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </>
        )}

        <label className="label">Password</label>
        <input
          type="password"
          value={password}
          className="input input-bordered w-full mb-3"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-neutral w-full mt-2"
          onClick={isLogIn ? handleLogIn : handleSignUp}
          disabled={loading}
        >
          {loading ? "Please wait..." : isLogIn ? "Log In" : "Sign Up"}
        </button>

        {error && (
          <p className="text-red-500 text-center mt-3">{error}</p>
        )}

        <p
          className="text-center mt-4 cursor-pointer text-sm text-primary"
          onClick={() => setIsLogIn((prev) => !prev)}
        >
          {isLogIn
            ? "New user? Sign Up"
            : "Already have an account? Log In"}
        </p>
      </fieldset>
    </div>
  );
};

export default Login;
