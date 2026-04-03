import React from "react";
import TodayTask from "./TodayTask";
import AddTask from "./AddTask";

const Home = () => {
  return (
    <div>
      <div className="flex w-full">
        <div className="w-2/3 h-full">
          <TodayTask />
        </div>
        <div className="w-1/3">
          <AddTask />
        </div>
      </div>
    </div>
  );
};

export default Home;
