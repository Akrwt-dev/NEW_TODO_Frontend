import React, { useEffect } from "react";
import TodayTask from "./TodayTask";
import AddTask from "./AddTask";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/Const";
import { Outlet, useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import Header from "./Header";


const Body = () => {
  const userData = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile`, {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="h-screen w-screen ">
      <div className="h-full">
        <div className="h-1/5">
          <Header />
        </div>
        <div className="flex-1">
        <Outlet />
      </div>
      </div>
    </div>
  );
};

export default Body;