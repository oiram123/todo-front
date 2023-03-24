import { Fragment } from "react";
import { Disclosure } from "@headlessui/react";

export default function Home() {
  return (
    <>
      {/* Background color split screen for large screens */}
      <div
        className="fixed top-0 left-0 h-full w-1/2 bg-white"
        aria-hidden="true"
      />
      <div
        className="fixed top-0 right-0 h-full w-1/2 bg-gray-50"
        aria-hidden="true"
      />
      <div className="relative flex min-h-screen flex-col" style={{backgroundColor: 'lightgray'}}>
        {/* Navbar */}
        <div className="flex-shrink-0 bg-black">
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                {/* Logo section */}
                <div className="flex items-center px-2 lg:px-0 xl:w-64">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300"
                      alt="Your Company"
                    />
                  </div>
                </div>
              </div>
            </div>

            <h1 style={{ color: "white" }}>TO DO APP</h1>
          </>
        </div>


{/* 3 column wrapper */}
<div className="mx-auto w-full max-w-7xl flex-grow lg:flex xl:px-8" style={{backgroundColor: "grey"}}>
  {/* Left sidebar & main wrapper */}
  <div className="min-w-0 flex-1 bg-white xl:flex">
    <div className="bg-white lg:min-w-0 lg:flex-1 border-r border-gray-300">
      <h2 className="text-2xl font-bold px-6 py-2 bg-gray-200">To Do</h2>
      <div className="h-full py-6 px-4 sm:px-6 lg:px-8">
        {/* To Do area */}
        <div className="bg-white rounded-lg shadow-lg border-b border-gray-300">
          <div className="px-6 py-4">
            <h2 className="text-lg font-bold mb-2">Task 1</h2>
            <p className="mb-4">Task description goes here.</p>
            <button className="block w-20 justify-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-white lg:min-w-0 lg:flex-1 border-r border-gray-300">
      <h2 className="text-2xl font-bold px-6 py-2 bg-gray-200">Doing</h2>

      <div className="h-full py-6 px-4 sm:px-6 lg:px-8">
        {/* Doing area */}
        <div className="bg-white rounded-lg shadow-lg border-b border-gray-300">
          <div className="px-6 py-4">
            <h2 className="text-lg font-bold mb-2">Task 1</h2>
            <p className="mb-4">Task description goes here.</p>
            <button className="block w-20 justify-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white lg:min-w-0 lg:flex-1">
      <h2 className="text-2xl font-bold px-6 py-2 bg-gray-200">Done</h2>

      <div className="h-full py-6 px-4 sm:px-6 lg:px-8">
        {/* Done area */}
        <div className="bg-white rounded-lg shadow-lg border-b border-gray-300">
          <div className="px-6 py-4">
            <h2 className="text-lg font-bold mb-2">Task 1</h2>
            <p className="mb-4">Task description goes here.</p>
            <button className="block w-20 justify-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      </div>
    </>
    
  );
  
}


