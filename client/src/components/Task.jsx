import React, { useState } from "react";

function Task({ task, onDeleteTask, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(task._id, { title, description });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <form
        onSubmit={handleEditSubmit}
        className="border p-2 m-2 flex flex-col gap-2 bg-gray-50"
      >
        <input
          className="border p-1 rounded-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="border p-1 rounded-sm"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex gap-2">
          <button type="submit" className="bg-green-200 p-1 rounded-sm">
            Save
          </button>
          <button
            type="button"
            className="bg-gray-200 p-1 rounded-sm"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="border p-2 m-2 flex justify-between">
      <p>{task.title}</p>
      <p>{task.description}</p>
      <p>{task.isCompleted ? "Complete" : "Incomplete"}</p>
      <div>
        <button
          onClick={() => onToggle(task._id)}
          className="bg-blue-200 p-1 rounded-sm mx-1"
        >
          Done/Not Done
        </button>
        <button
          onClick={() => setIsEditing(true)}
          className="bg-yellow-200 p-1 rounded-sm mx-1"
        >
          Edit
        </button>
        <button
          onClick={() => onDeleteTask(task._id)}
          className="bg-red-300 p-1 rounded-sm mx-1"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Task;
