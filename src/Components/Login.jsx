import React, { useState } from "react";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/Const";

const Login = () => {
  const [isLogIn, setIsLogIn] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(true);
  const [gender, setGender] = useState(true);
  const navigate = useNavigate();
  const handleLogIn = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (error) {
      setError(error?.response?.data || "Login failed");
    }
  };
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (error) {
      setError(error?.response?.data || "Login failed");
    }
  };

  return (
    <>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-1/4 h-2/4 border p-4  m-auto my-40">
        <legend className="fieldset-legend w-1/4 text-4xl text-center ">
          {isLogIn ? "Login" : "SignUp"}
        </legend>

        {!isLogIn && (
          <>
            <label className="label">First Name</label>
            <input
              type="text"
              value={firstName}
              className="input w-full"
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="label">Last Name</label>
            <input
              type="text"
              value={lastName}
              className="input w-full"
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}

        <label className="label">Email ID</label>
        <input
          type="email"
          value={emailId}
          className="input w-full"
          placeholder="Email"
          onChange={(e) => setEmailId(e.target.value)}
        />

        {!isLogIn && (
          <>
            <label className="label">Age</label>
            <input
              type="number"
              value={age}
              className="input w-full"
              onChange={(e) => setAge(e.target.value)}
            />

            <label className="label">Gender</label>
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn m-1">
                {!gender ? "Select Gender" : gender}
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <a onClick={() => setGender("Male")}>Male</a>
                </li>
                <li>
                  <a onClick={() => setGender("Female")}>Female</a>
                </li>
                <li>
                  <a onClick={() => setGender("Other")}>Other</a>
                </li>
              </ul>
            </div>
          </>
        )}

        <label className="label">Password</label>
        <input
          type="password"
          value={password}
          className="input w-full"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-neutral mt-4"
          onClick={isLogIn ? handleLogIn : handleSignUp}
        >
          {isLogIn ? "Log In" : "Submit"}
        </button>
        <p
          className="m-auto cursor-pointer py-2"
          onClick={() => setIsLogIn((prev) => !prev)}
        >
          {isLogIn ? "New user? Sign-Up" : "Existing User: Log-In"}
        </p>
      </fieldset>
    </>
  );
};

export default Login;
