import { Dispatch, SetStateAction } from "react";
import { initialTask, Task } from "../data/dataTask";

export const getTasks = (setTasks: Dispatch<SetStateAction<Task[]>>) => {
  const taskStorage = localStorage.getItem("tasks");
  if (taskStorage) {
    setTasks(JSON.parse(taskStorage));
  } else {
    setTasks(initialTask);
  }
};

export const addTask = (
  tasks: Task[],
  setTasks: Dispatch<SetStateAction<Task[]>>,
  task: Task,
) => {
  const updatedTasks = [...tasks, task];
  setTasks(updatedTasks);
};

export const deleteTask = (
  tasks: Task[],
  setTasks: Dispatch<SetStateAction<Task[]>>,
  id: string,
) => {
  const deletedTasks = tasks.filter((item) => item.id !== id);
  setTasks(deletedTasks);
};

export const updateTask = (
  tasks: Task[],
  setTasks: Dispatch<SetStateAction<Task[]>>,
  task: Task,
) => {
  const updatedTasks = tasks.map((item) => (item.id === task.id ? task : item));
  setTasks(updatedTasks);
};
