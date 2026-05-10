import { useDroppable } from "@dnd-kit/core";
import { IonIcon } from "@ionic/react";
import { Task } from "../../data/dataTask";
import TaskCard from "./TaskCard";
import {
  addOutline,
  chevronBackOutline,
  chevronDownOutline,
  chevronForwardOutline,
} from "ionicons/icons";
import { Dispatch, SetStateAction, useState } from "react";
import AddTaskModal from "./AddTask";
import UpdateTaskModal from "./UpdateTask";

interface Props {
  id: string;
  title: string;
  tasks: Task[];
  addTask: (task: Task) => void;
  showModal: string;
  setShowModal: Dispatch<SetStateAction<string>>;
  selectedTask: Task | null;
  setSelectedTask: Dispatch<SetStateAction<Task | null>>;
  handleDelete: (id: string) => void;
  openMenu: string | null;
  setOpenMenu: Dispatch<SetStateAction<string | null>>;
  handleUpdate: (task: Task) => void;
}

export default function Column({
  id,
  title,
  tasks,
  addTask,
  showModal,
  setShowModal,
  selectedTask,
  setSelectedTask,
  handleDelete,
  openMenu,
  setOpenMenu,
  handleUpdate,
}: Props) {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  const [collapse, setCollapse] = useState(false);

  return (
    <div
      className={`transition-all duration-300 ${
        collapse ? "min-w-[90px]" : "min-w-[320px]"
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center ${
          collapse ? "justify-center" : "justify-between"
        } gap-4 px-5`}
      >
        {!collapse && (
          <div className="flex items-center gap-4">
            <h1 className="!text-3xl font-sans !font-bold">{title}</h1>

            <button
              onClick={() => setShowModal("add")}
              className="bg-blue-200/80 w-9 h-9 !rounded-lg text-2xl flex items-center justify-center shadow-sm transition-all hover:bg-blue-400 hover:scale-105"
            >
              <IonIcon icon={addOutline} />
            </button>
          </div>
        )}

        {collapse && (
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-sm font-bold tracking-widest text-slate-700">
              {title}
            </h1>

            <span className="text-xs text-slate-500 font-semibold">
              {tasks.length}
            </span>
          </div>
        )}

        <button
          onClick={() => setCollapse(!collapse)}
          className="!p-2 !rounded-full hover:bg-slate-400/20 transition-all"
        >
          <IonIcon
            icon={collapse ? chevronForwardOutline : chevronDownOutline}
            className="text-lg"
          />
        </button>
      </div>

      {/* Task List */}
      {!collapse && (
        <div
          ref={setNodeRef}
          className="flex flex-col gap-4 mt-4 transition-all duration-300"
        >
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              addTask={addTask}
              showModal={showModal}
              setShowModal={setShowModal}
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
              handleDelete={handleDelete}
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
              handleUpdate={handleUpdate}
            />
          ))}
        </div>
      )}

      {/* Add Modal */}
      {showModal === "add" && (
        <AddTaskModal
          showModal={showModal}
          setShowModal={setShowModal}
          addTask={addTask}
        />
      )}

      {/* Update Modal */}
      {showModal === "update" && (
        <UpdateTaskModal
          showModal={showModal}
          setShowModal={setShowModal}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          updateTask={handleUpdate}
        />
      )}
    </div>
  );
}
