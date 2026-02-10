import React from 'react'
import Task from './Task'

const TodayTask = () => {
  return (
    <div>
      <h1 className='text-4xl'>Today Task</h1>
      <div className='w-full h-full'>
        <div className='box-border border-b-cyan-400'>
            <Task />
        </div>
      </div>
    </div>
  )
}

export default TodayTask