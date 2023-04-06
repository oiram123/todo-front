import React, { useState, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { BookmarkSquareIcon } from "@heroicons/react/20/solid";
import axios from "axios";

export default function Edit({ editTask,closeEdit, todoId }) {
  const cancelButtonRef = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    let isMount = true;
    const fetchData = async () => {
      try {
        if(isMount){
            const res = await axios.get(
              `https://todo-app-1u8v.onrender.com/api/v1/todo/getOneTodO/${todoId}`
            );
            console.log(res);
            setTitle(res.data.data.title)
            setContent(res.data.data.content)
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    return() => {
        isMount = false;
    }
  }, [todoId]);

  const editTaskFunc = () => {
    const editParam = {
      title,
      content,
      todoID:todoId,
    };

    console.log(editParam);

    axios
      .patch(
        "https://todo-app-1u8v.onrender.com/api/v1/todo/updateTodo",
        editParam
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {closeEdit()});
  };

  return (
    <>
      <Popover.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity " />
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="fixed inset-0 flex items-center justify-center z-10 ">
          <div className="relative grid gap-6 bg-white px-5 py-6 sm:p-8 h-[50vh] w-[55vh] rounded-[15px]">
            <button
              className="absolute top-0 right-0 m-[0.95rem] rounded-full text-gray-500 hover:text-gray-800 transition ease-in-out duration-150"
              onMouseDown={closeEdit}
              ref={cancelButtonRef}
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-center mb-4">
              Edit your task
            </h1>
            <div className="form-group">
              <label
                htmlFor="title"
                className="block text-gray-700 font-medium mb-2"
              >
                Title:
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="content"
                className="block text-gray-700 font-medium mb-2"
              >
                Content:
              </label>
              <textarea
                id="content"
                className="w-full h-32 px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => editTaskFunc()}
                className="inline-flex items-center gap-x-1.5 rounded-md bg-green-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <BookmarkSquareIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                Save
              </button>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </>
  );
}
