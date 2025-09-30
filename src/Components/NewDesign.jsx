import React, { useState, useEffect } from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { getDatabase, push, ref, set, onValue, remove, update } from "firebase/database";
import 'react-toastify/dist/ReactToastify.css';
import firebaseConfig from './firebaseCofig';

const NewDesign = () => {
  const [data, setData] = useState("");
  const [allData, setAllData] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const notify = (msg, type = "success") => {
    toast[type](msg, {
      position: "top-right",
      autoClose: 2000,
      theme: "dark",
      transition: Slide,
    });
  }

  const inputData = (e) => setData(e.target.value);

  const submitData = (e) => {
    e.preventDefault();
    const db = getDatabase();

    if (!data) {
      notify('⚠️ Please enter a task', "error");
      return;
    }

    if (updateMode) {
      const taskRef = ref(db, `todo/${editId}`);
      update(taskRef, { todoName: data }).then(() => {
        notify("✅ Task updated!");
        resetForm();
      });
    } else {
      const todoRef = push(ref(db, 'todo/'));
      set(todoRef, { todoName: data }).then(() => {
        notify("✅ Task added!");
        setData("");
      });
    }
  };

  const resetForm = () => {
    setData("");
    setUpdateMode(false);
    setEditId(null);
  };

  const editHandler = (id, name) => {
    setUpdateMode(true);
    setEditId(id);
    setData(name);
  };

  const dataDelete = (id) => {
    const db = getDatabase();
    remove(ref(db, `todo/${id}`)).then(() => {
      notify("🗑️ Task deleted", "error");
    });
  };

  useEffect(() => {
    const db = getDatabase();
    const todoRef = ref(db, 'todo/');
    onValue(todoRef, (snapshot) => {
      const todoList = [];
      snapshot.forEach((childSnapshot) => {
        todoList.push({ value: childSnapshot.val(), id: childSnapshot.key });
      });
      setAllData(todoList);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
      <ToastContainer />
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">{updateMode ? "Update Task" : "New Task"}</h1>

        <form onSubmit={submitData}>
          <div className="mb-6">
            <label htmlFor="task" className="block text-sm font-medium text-gray-700 mb-2">Task</label>
            <input
              type="text"
              value={data}
              onChange={inputData}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder={updateMode ? "Update your task..." : "Enter a new task..."}
            />
          </div>

          <div className="flex gap-4 justify-center">
            <button
              type="submit"
              className={`px-6 py-2.5 rounded-lg font-semibold shadow-md text-white transition-all duration-300 ${
                updateMode
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {updateMode ? "Update Task" : "Add Task"}
            </button>
            {updateMode && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2.5 rounded-lg font-semibold bg-gray-400 hover:bg-gray-500 text-white shadow-md transition-all duration-300"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="mt-10">
          <ul className="space-y-4">
            {allData.map((item, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-100 rounded-lg px-5 py-4 shadow-sm hover:shadow-lg transition">
                <span className="text-gray-800 font-medium">{item.value.todoName}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => editHandler(item.id, item.value.todoName)}
                    className="px-4 py-1.5 rounded-lg text-white bg-green-500 hover:bg-green-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => dataDelete(item.id)}
                    className="px-4 py-1.5 rounded-lg text-white bg-red-500 hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NewDesign;
