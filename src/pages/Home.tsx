import { IonContent, IonPage } from "@ionic/react";
import "./Home.css";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { Task } from "../data/dataTask";
import { addTask, deleteTask, getTasks, updateTask } from "../utils/task";
import Board from "../components/home/Board";

const Home: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getTasks(setTasks);
    const handleClickOutside = () => {
      setOpenMenu(null);
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleAdd = (task: Task) => {
    addTask(tasks, setTasks, task);
  };

  const handleDelete = (id: string) => {
    deleteTask(tasks, setTasks, id);
  };

  const handleUpdate = (task: Task) => {
    updateTask(tasks, setTasks, task);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchAssignee = task.assignee.some((user) =>
      user.name.toLowerCase().includes(search),
    );
    const matchLabel = task.label.toLowerCase().includes(search.toLowerCase());
    const matchDueDate = task.dueDate.includes(search);

    const matchFilter = filter === "" ? true : task.label === filter;

    return (
      (matchSearch || matchAssignee || matchLabel || matchDueDate) &&
      matchFilter
    );
  });

  return (
    <IonPage>
      <Navbar
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
      />
      <IonContent fullscreen className="bg-white">
        <Board
          tasks={filteredTasks}
          addTask={handleAdd}
          showModal={showModal}
          setShowModal={setShowModal}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          handleDelete={handleDelete}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          handleUpdate={handleUpdate}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
