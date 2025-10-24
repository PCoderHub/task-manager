import React, { useEffect, useState } from "react";
import Task from "../components/Task";
import TaskForm from "../components/TaskForm";
import { deleteTask, getTasks, updateTask } from "../api/taskServices";

function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTasks();
  }, []);

  const handleAddedTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleDelete = async (id) => {
    setTasks((prev) => prev.filter((task) => task._id !== id));
    await deleteTask(id);
  };

  const handleToggle = async (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task._id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );

    const task = {
      isCompleted: !tasks.find((task) => task._id === id).isCompleted,
    };

    await updateTask(id, task);
  };

  const handleEdit = async (id, updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task._id === id ? { ...task, ...updatedTask } : task))
    );
    await updateTask(id, updatedTask);
  };

  return (
    <div>
      <TaskForm onAddedTask={handleAddedTask} />
      {tasks.length > 0 ? (
        <>
          <h2 className="text-center font-bold">Tasks</h2>
          {tasks.map((task) => (
            <Task
              key={task._id}
              task={task}
              onDeleteTask={handleDelete}
              onToggle={handleToggle}
              onEdit={handleEdit}
            />
          ))}
        </>
      ) : (
        <p className="text-center">No tasks found</p>
      )}
    </div>
  );
}

export default Home;
