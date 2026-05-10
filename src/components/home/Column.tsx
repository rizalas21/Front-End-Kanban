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
    id: id,
  });

  const [collapse, setCollapse] = useState(false);

  return (
    <div
      className={`
        transition-all duration-300
        w-full
        sm:w-auto
        ${collapse ? "sm:min-w-[90px]" : "sm:min-w-[320px]"}
      `}
    >
      {/* Header */}
      <div
        className={`
          flex items-center justify-between
          gap-3
          px-3 sm:px-5
          py-2
        `}
      >
        {!collapse ? (
          <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
            <h1 className="text-xl sm:!text-3xl font-sans !font-bold truncate">
              {title}
            </h1>

            <button
              onClick={() => setShowModal("add")}
              className="shrink-0 bg-blue-200/80 w-8 h-8 sm:w-9 sm:h-9 !rounded-lg text-xl sm:text-2xl flex items-center justify-center shadow-sm transition-all hover:bg-blue-400 hover:scale-105"
            >
              <IonIcon icon={addOutline} />
            </button>
          </div>
        ) : (
          <div
            className={`
              flex items-center gap-2 overflow-hidden
              sm:flex-col sm:justify-center sm:w-full
            `}
          >
            <h1
              className="
                text-base sm:text-sm
                font-bold
                text-slate-700
                truncate
                sm:tracking-widest
              "
            >
              {title}
            </h1>

            <span className="text-xs text-slate-500 font-semibold">
              ({tasks.length})
            </span>
          </div>
        )}

        {/* Collapse Button */}
        <button
          onClick={() => setCollapse(!collapse)}
          className="
            shrink-0
            !p-2
            !rounded-full
            hover:bg-slate-400/20
            transition-all
          "
        >
          <IonIcon
            icon={collapse ? chevronForwardOutline : chevronDownOutline}
            className={`
              text-lg
              transition-transform duration-300
              sm:${collapse ? "" : "rotate-[-90deg]"}
            `}
          />
        </button>
      </div>

      {/* Task List */}
      {!collapse && (
        <div
          ref={setNodeRef}
          className="
            flex flex-col gap-4
            mt-3 sm:mt-4
            transition-all duration-300
          "
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
