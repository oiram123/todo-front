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
      </div>
    </>
  );
}
