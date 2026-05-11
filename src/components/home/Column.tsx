import { useDroppable } from "@dnd-kit/core";
import { IonIcon } from "@ionic/react";
import { Task } from "../../data/dataTask";
import TaskCard from "./TaskCard";
import {
  addOutline,
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
    id,
  });
  const [collapse, setCollapse] = useState(false);

  return (
    <div
      className={`
        transition-all duration-300 ease-in-out
        w-full
        ${collapse ? "sm:min-w-[230px]" : "sm:min-w-[340px]"}
      `}
    >
      <div className="flex items-center justify-between gap-3 px-3 sm:px-4 py-3 bg-white/70 rounded-2xl shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-2 sm:gap-3 flex-1">
          <h1 className="text-lg sm:text-2xl font-bold text-slate-800 whitespace-nowrap">
            {title}
          </h1>

          <span className="text-xs sm:text-sm font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-full shrink-0">
            {tasks.length}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowModal("add")}
            className="bg-blue-200/80 w-8 h-8 sm:w-9 sm:h-9 rounded-lg text-lg sm:text-xl flex items-center justify-center shadow-sm transition-all duration-200 hover:bg-blue-400 hover:scale-105 active:scale-95"
          >
            <IonIcon icon={addOutline} />
          </button>

          <button
            onClick={() => setCollapse(!collapse)}
            className="!p-1 !rounded-full hover:bg-slate-200/70 transition-all duration-200 active:scale-95"
          >
            <IonIcon
              icon={collapse ? chevronForwardOutline : chevronDownOutline}
              className="text-lg"
            />
          </button>
        </div>
      </div>

      {!collapse && (
        <div
          ref={setNodeRef}
          className="flex flex-col gap-4 mt-4 transition-all duration-300"
          style={{ touchAction: "manipulation" }}
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

      {showModal === "add" && (
        <AddTaskModal
          showModal={showModal}
          setShowModal={setShowModal}
          addTask={addTask}
        />
      )}

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
