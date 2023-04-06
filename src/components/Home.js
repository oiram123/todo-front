import { useState, useEffect } from "react";
import { Popover } from "@headlessui/react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  TrashIcon,
  PencilSquareIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import CreateTodo from "./CreateTodo";
import EditTodo from "./EditTodo";
import axios from "axios";
import useAuthenticate from "./Auth/useAuthinticate";

export default function Home() {
  useAuthenticate();
  const [createTask, setCreateTask] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [toDoItems, setToDoItems] = useState([]);
  const [doingItems, setDoingItems] = useState([]);
  const [doneItems, setDoneItems] = useState([]);

  const userId = localStorage.getItem("userId")
  console.log('userId', userId)

  useEffect(() => {
    let isMount = true;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://todo-app-1u8v.onrender.com/api/v1/todo/getAllTodo/${userId}`
        );
        const data = response.data.data;

        console.log('data', data)

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
  }, [createTask, editTask, editItemId, userId]);




  const deleteTask = async (todoID) => {
    try {
     await axios.delete(
        `https://todo-app-1u8v.onrender.com/api/v1/todo/deleteTodo/${todoID}`
      );
      setToDoItems(toDoItems.filter((task) => task._id !== todoID));
      setDoingItems(doingItems.filter((task) => task._id !== todoID));
      setDoneItems(doneItems.filter((task) => task._id !== todoID));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (itemId) => {
    setCreateTask(true);
    setEditItemId(itemId);
  };

  const closeEdit = () => {
    setEditTask(false);
    setEditItemId(null);
  };


  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    console.log(source.index, destination.index);

    if (source.droppableId === destination.droppableId) return;

    const getItem = (droppableId, index) => {
      console.log("getItem called with droppableId:", droppableId);
      switch (droppableId) {
        case "Todo":
          console.log("getItem matched case Todo");
          return [toDoItems[index], toDoItems];
        case "Doing":
          console.log("getItem matched case Doing");
          return [doingItems[index], doingItems];
        case "Done":
          console.log("getItem matched case Done");
          return [doneItems[index], doneItems];
        default:
          console.log("getItem did not match any case");
          return null;
      }
    };

    const [removedTask, sourceArray] = getItem(
      source.droppableId,
      source.index
    );
    //if the task in rmoved from the array, return;
    if (!removedTask) return;

    const [updatedTask, destinationArray] = getItem(
      destination.droppableId,
      destination.index
    );
    destinationArray.splice(destination.index, 0, removedTask);

    const newStatus = destination.droppableId;
    const updatedTaskData = {
      ...updatedTask,
      taskId: removedTask._id,
      status: newStatus,
    };

    try {
      const res = await axios.patch(
        `https://todo-app-1u8v.onrender.com/api/v1/todo/updateStatusTodo`,
        updatedTaskData
      );
      console.log(res);
    } catch (error) {
      console.log("error status", error);
    }

    sourceArray.splice(source.index, 1);

    setToDoItems([...toDoItems]);
    setDoingItems([...doingItems]);
    setDoneItems([...doneItems]);
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
        <div className="flex-shrink-0 bg-black h-20">
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8 h-full">
            <div className="relative flex h-full items-center justify-between">
              {/* Logo section */}
              <div className="flex items-center px-2 lg:px-0 xl:w-64">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300"
                    alt="Your Company"
                  />
                </div>
                <h1 className="text-white text-2xl font-bold mx-4">
                  TO DO APP
                </h1>
              </div>
              {/* Button section */}
              <Popover
                as="div"
                className="relative inset-0 z-10 overflow-y-auto"
                onClose={() => {}}
              >
                {({ open }) => (
                  <>
                    <Popover.Button
                      className="inline-flex items-center gap-x-1.5 rounded-md bg-green-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onMouseDown={() => setCreateTask(true)}
                    >
                      <PlusIcon
                        className="-ml-0.5 h-5 w-5"
                        aria-hidden="true"
                      />
                      Create New Task
                    </Popover.Button>
                    {createTask && (
                      <CreateTodo
                        createTask={createTask}
                        setCreateTask={setCreateTask}
                        userId={userId}
                      />
                    )}
                  </>
                )}
              </Popover>{" "}
            </div>
          </div>
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
                  <Droppable droppableId="Todo">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {toDoItems.map((item, index) => (
                          <Draggable
                            key={item._id}
                            draggableId={item._id}
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
                                  <button
                                    type="button"
                                    onClick={() => deleteTask(item._id)}
                                    className="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                  >
                                    <TrashIcon
                                      className="-ml-0.5 h-5 w-5"
                                      aria-hidden="true"
                                    />
                                    Delete
                                  </button>
                                  <Popover
                                    as="div"
                                    className="inset-0 20 overflow-y-auto"
                                    onClose={() => {}}
                                  >
                                    {({ open }) => (
                                      <>
                                        <Popover.Button
                                          className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                          onMouseDown={() =>
                                            handleEdit(item._id)
                                          }
                                        >
                                          <PencilSquareIcon
                                            className="-ml-0.5 h-5 w-5"
                                            aria-hidden="true"
                                          />
                                          Edit
                                        </Popover.Button>
                                        {editItemId === item._id && (
                                          <EditTodo
                                            editTask={editTask}
                                            closeEdit={closeEdit}
                                            todoId={editItemId}
                                          />
                                        )}
                                      </>
                                    )}
                                  </Popover>{" "}
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
                  <Droppable droppableId="Doing">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {doingItems.map((item, index) => (
                          <Draggable
                            key={item._id}
                            draggableId={item._id}
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
                                  <button
                                    type="button"
                                    onClick={() => deleteTask(item._id)}
                                    className="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                  >
                                    <TrashIcon
                                      className="-ml-0.5 h-5 w-5"
                                      aria-hidden="true"
                                    />
                                    Delete
                                  </button>
                                  <Popover
                                    as="div"
                                    className="inset-0 20 overflow-y-auto"
                                    onClose={() => {}}
                                  >
                                    {({ open }) => (
                                      <>
                                        <Popover.Button
                                          className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                          onMouseDown={() =>
                                            handleEdit(item._id)
                                          }                                        >
                                          <PencilSquareIcon
                                            className="-ml-0.5 h-5 w-5"
                                            aria-hidden="true"
                                          />
                                          Edit
                                        </Popover.Button>
                                        {editItemId === item._id && (
                                          <EditTodo
                                            editTask={editTask}
                                            closeEdit={closeEdit}
                                            todoId={editItemId}
                                          />
                                        )}
                                      </>
                                    )}
                                  </Popover>{" "}
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
                  <Droppable droppableId="Done">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {doneItems.map((item, index) => (
                          <Draggable
                            key={item._id}
                            draggableId={item._id}
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
                                  <button
                                    type="button"
                                    onClick={() => deleteTask(item._id)}
                                    className="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                  >
                                    <TrashIcon
                                      className="-ml-0.5 h-5 w-5"
                                      aria-hidden="true"
                                    />
                                    Delete
                                  </button>
                                  <Popover
                                    as="div"
                                    className="inset-0 20 overflow-y-auto"
                                    onClose={() => {}}
                                  >
                                    {({ open }) => (
                                      <>
                                        <Popover.Button
                                          className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                          onMouseDown={() =>
                                            handleEdit(item._id)
                                          }                                        
                                          >
                                          <PencilSquareIcon
                                            className="-ml-0.5 h-5 w-5"
                                            aria-hidden="true"
                                          />
                                          Edit
                                        </Popover.Button>
                                        {editItemId === item._id && (
                                          <EditTodo
                                            editTask={editTask}
                                            closeEdit={closeEdit}
                                            todoId={editItemId}
                                          />
                                        )}
                                      </>
                                    )}
                                  </Popover>{" "}
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
