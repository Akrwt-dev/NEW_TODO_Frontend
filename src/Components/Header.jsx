import axios from "axios";
import React from "react";
import { BASE_URL, PROFILE_PIC } from "../utils/Const";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const exitUser = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  return user ? (
    <div className="navbar bg-base-300 shadow-sm rounded-2xl mx-auto my-4 px-4 max-w-[95%] h-14">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl font-semibold">
          TODO
        </Link>
      </div>

      <div className="flex gap-2 items-center">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar w-10 h-10"
          >
            <div className="w-10 h-10 rounded-full">
              <img alt="profile" src={user.photoURL || PROFILE_PIC} />
            </div>
          </div>

          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-xl z-10 mt-2 w-48 p-2 shadow"
          >
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <a onClick={exitUser}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  ) : null;
};

export default Header;
