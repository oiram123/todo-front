import { Fragment, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Home() {
  const [toDoItems, setToDoItems] = useState([
    { id: "task-1", content: "Task 1" },
    { id: "task-2", content: "Task 2" },
    { id: "task-3", content: "Task 3" },
  ]);

  const [doingItems, setDoingItems] = useState([
    { id: "task-4", content: "Task 4" },
    { id: "task-5", content: "Task 5" },
  ]);

  const [doneItems, setDoneItems] = useState([
    { id: "task-6", content: "Task 6" },
    { id: "task-7", content: "Task 7" },
    { id: "task-8", content: "Task 8" },
  ]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.index === destination.index) return;
    if (source.droppableId === "to-do") {
      const newToDoItems = Array.from(toDoItems);
      const [removed] = newToDoItems.splice(source.index, 1);
      newToDoItems.splice(destination.index, 0, removed);
      setToDoItems(newToDoItems);
    } else if (source.droppableId === "doing") {
      const newDoingItems = Array.from(doingItems);
      const [removed] = newDoingItems.splice(source.index, 1);
      newDoingItems.splice(destination.index, 0, removed);
      setDoingItems(newDoingItems);
    } else if (source.droppableId === "done") {
      const newDoneItems = Array.from(doneItems);
      const [removed] = newDoneItems.splice(source.index, 1);
      newDoneItems.splice(destination.index, 0, removed);
      setDoneItems(newDoneItems);
    }
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
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps} {...provided.dragHandleProps}> <div className="bg-white shadow overflow-hidden sm:rounded-md"> <div className="px-4 py-5 sm:px-6"> <h3 className="text-lg leading-6 font-medium text-gray-900"> {item.content} </h3> </div> </div> </div>)} </Draggable>))} {provided.placeholder} </div>)} </Droppable> </div> </div>

              {/* Middle column */}
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
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                                  <div className="px-4 py-5 sm:px-6">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                      {item.content}
                                    </h3>
                                  </div>
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

              {/* Right sidebar */}
              <div className="bg-white lg:w-80">
                <h2 className="text-2xl font-bold px-6 py-2 bg-gray-800 text-white">
                  Done
                </h2>
                <div className="h-full py-6 px-4 sm:px-6 lg:px-8">
                  {/* Done area */}
                  <Droppable droppableId="done">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {doneItems.map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                                  <div className="px-4 py-5 sm:px-6">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                      {item.content}
                                    </h3>
                                  </div>
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