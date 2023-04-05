import { Fragment, useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";

export default function Home() {
  const [toDoItems, setToDoItems] = useState([]);
  const [doingItems, setDoingItems] = useState([]);
  const [doneItems, setDoneItems] = useState([]);

  useEffect(() => {
    let isMount = true;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://todo-app-1u8v.onrender.com/api/v1/todo/getAllTodo/641eea71ab23cc7c6f774ec2`
        );
        const data = response.data.data;

        if (isMount) {
          setToDoItems(data.filter((task) => task.status === "Todo"));
          setDoingItems(data.filter((task) => task.status === "Doing"));
          setDoneItems(data.filter((task) => task.status === "Done"));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

    return () => {
      isMount = false;
    };
  }, []);

  const handleDragEnd = (result, column) => {
    if (!result.destination) return;
    const { source, destination } = result;
    console.log(source, destination);
    if (source.index === destination.index) return;
    const newItems = Array.from(column);
    console.log(newItems);
    const [removed] = newItems.splice(source.index, 1);
    newItems.splice(destination.index, 0, removed);
    // setItems(newItems);
  };



  return (
    <>
      {/* Background color split screen for large screens */}
      <div
        className="fixed top-0 left-0 h-full w-1/2 bg-gray-200"
        aria-hidden="true"
      />
      <div
        className="fixed top-0 right-0 h-full w-1/2 bg-gray-50"
        aria-hidden="true"
      />
      <div className="relative flex min-h-screen flex-col">
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
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="mx-auto w-full max-w-7xl flex-grow lg:flex xl:px-8">
            {/* Left sidebar & main wrapper */}
            <div className="min-w-0 flex-1 bg-gray-200 xl:flex">
              <div className="bg-white lg:min-w-0 lg:flex-1 border-r border-gray-400">
                <h2 className="text-2xl font-bold px-6 py-2 bg-gray-800 text-white">
                  To Do
                </h2>
                <div className="h-full py-6 px-4 sm:px-6 lg:px-8">
                  {/* To Do area */}
                  <Droppable droppableId="to-do">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {toDoItems.map((item, index) => (
                          <Draggable
                            key={item._id}
                            draggableId={item.status}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="bg-white rounded-lg shadow-lg border border-gray-400 mb-4 p-4 text-gray-800"
                              >
                                <h2 className="text-lg font-bold mb-2">
                                  {item.title}
                                </h2>
                                <p className="mb-4">{item.content}</p>
                                <div className="flex justify-between">
                                  <button className="block w-20 justify-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                                    Delete
                                  </button>
                                  <button className="block w-20 justify-right px-4 py-2 bg-blue-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                                    Edit
                                  </button>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>
              <div className="bg-white lg:min-w-0 lg:flex-1 border-r border-gray-400">
                <h2 className="text-2xl font-bold px-6 py-2 bg-gray-800 text-white">
                  Doing
                </h2>

                <div className="h-full py-6 px-4 sm:px-6 lg:px-8">
                  {/* Doing area */}
                  <Droppable droppableId="doing">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {doingItems.map((item, index) => (
                          <Draggable
                            key={item._id}
                            draggableId={item.status}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="bg-white rounded-lg shadow-lg border border-gray-400 mb-4 p-4 text-gray-800"
                              >
                                <h2 className="text-lg font-bold mb-2">
                                  {item.title}
                                </h2>
                                <p className="mb-4">{item.content}</p>
                                <div className="flex justify-between">
                                  <button className="block w-20 justify-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                                    Delete
                                  </button>
                                  <button className="block w-20 justify-right px-4 py-2 bg-blue-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                                    Edit
                                  </button>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>

              <div className="bg-white lg:min-w-0 lg:flex-1">
                <h2 className="text-2xl font-bold px-6 py-2 bg-gray-800 text-white">
                  Done
                </h2>

                <div className="h-full py-6 px-4 sm:px-6 lg:px-8">
                  {/* Done area */}
                  <Droppable droppableId="done">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {doneItems.map((item, index) => (
                          <Draggable
                            key={item._id}
                            draggableId={item.status}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="bg-white rounded-lg shadow-lg border border-gray-400 mb-4 p-4 text-gray-800"
                              >
                                <h2 className="text-lg font-bold mb-2">
                                  {item.title}
                                </h2>
                                <p className="mb-4">{item.content}</p>
                                <div className="flex justify-between">
                                  <button className="block w-20 justify-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                                    Delete
                                  </button>
                                  <button className="block w-20 justify-right px-4 py-2 bg-blue-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                                    Edit
                                  </button>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>
            </div>
          </div>
        </DragDropContext>
      </div>
    </>
  );
}
