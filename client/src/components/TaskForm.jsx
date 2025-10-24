import React, { useState } from "react";
import { addTask } from "../api/taskServices";

function TaskForm({ onAddedTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const task = {
        title,
        description,
      };

      const response = await addTask(task);
      onAddedTask(response.data.task);
      setTitle("");
      setDescription("");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border rounded-sm w-1/2 mx-auto my-5 flex flex-col p-5 justify-between"
    >
      <h2 className="text-center font-bold">Add Task</h2>
      <input
        className="border p-1 m-1 rounded-sm"
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title"
        required
      />
      <textarea
        className="border p-1 m-1 rounded-sm"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter description"
        required
      ></textarea>
      <button
        className="bg-teal-200 hover:bg-teal-100 p-1 m-1 rounded-sm"
        type="submit"
      >
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
