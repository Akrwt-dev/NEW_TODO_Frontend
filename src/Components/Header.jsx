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
      await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true },
      );
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  return user ?(
    <>
        <div className="navbar bg-base-300 shadow-sm rounded-4xl mx-auto my-5 px-6 max-w-[95%]">
          <div className="flex-1">
            <Link to="/" className="btn btn-ghost text-5xl my-11 pl-7 ">TODO</Link>
          </div>
          <div className="flex gap-2">
            <div className="dropdown dropdown-end mr-10">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar  w-12 h-12"
            >
              <div className=" w-12 h-12 rounded-full">
                <img 
                  alt="Tailwind CSS Navbar component"
                  src= {user.photoURL || PROFILE_PIC}
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-md dropdown-content bg-base-100 rounded-box z-10 mt-3 w-64 p-3 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <a onClick={exitUser}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  ): null;
};

export default Header;
