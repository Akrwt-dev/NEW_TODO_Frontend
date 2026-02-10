import React from 'react'
import Header from './header'
import TodayTask from './TodayTask'
import AddTask from './AddTask'

const Body = () => {
  return (
    <div className="h-screen w-screen">
      <div className="h-full">
          <div className="h-1/5">
            <Header />
          </div>
          <div className="flex w-full">
            <div className="w-2/3 h-full">
              <TodayTask />
            </div>
            <div className="w-1/3">
              <AddTask />
            </div>
          </div>
      </div>
    </div>
  )
}

export default Body