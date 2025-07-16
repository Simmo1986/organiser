import './App.css';
import TodoItem from "./components/TodoItem";
import Notes from "./components/Notes";
import Feeds from './components/Feeds';
import { useState } from 'react';

function App() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="h-screen flex">
      <div className={`relative transition-all duration-300 overflow-y-auto overflow-x-hidden shadow-right ${collapsed ? 'w-[40px] p-0 border-r-0' : 'w-2/12 p-6 border-r border-r-gray-800'} bg-[#1e1e1e]`}>
        <button
          className="absolute top-0 right-0 z-50 bg-gray-700 text-white p-3 shadow"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Open Feeds" : "Close Feeds"}
        >
          {collapsed ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          )}
        </button>

        {!collapsed && <Feeds />}
      </div>

      <div className="flex flex-1">
        <div className="flex-1 p-6 bg-gray-200 shadow-right overflow-y-auto">
          <TodoItem />
        </div>
        <div className="flex-1 p-6 bg-gray-300 overflow-y-auto">
          <Notes />
        </div>
      </div>
    </div>
  )
}

export default App
