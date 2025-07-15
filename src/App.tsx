import './App.css';
import TodoItem from "./components/TodoItem";
import Notes from "./components/Notes";
import Feeds from './components/feeds';
import { YouTubeFeed } from './components/YouTube';
import { useState } from 'react';

function App() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="h-screen flex">
      <div className={`relative transition-all duration-300 shadow-right ${collapsed ? 'w-1/12 p-0 border-r-0' : 'w-2/12 p-6 border-r border-r-gray-800'} bg-[#1e1e1e]`}>
        <button
          className="absolute top-4 right-[-20px] z-50 bg-gray-700 text-white rounded-full p-3 shadow"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Open Feeds" : "Close Feeds"}
        >
          {collapsed ? (
        // Chevron right
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
          ) : (
        // Chevron left
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
