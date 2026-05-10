import { useDraggable } from "@dnd-kit/core";
import { IonIcon, IonToast } from "@ionic/react";
import { Task } from "../../data/dataTask";
import {
  checkboxOutline,
  linkOutline,
  flameOutline,
  calendarOutline,
  ellipsisVerticalOutline,
  checkmarkCircleOutline,
} from "ionicons/icons";
import { Dispatch, SetStateAction, useState } from "react";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  task: Task;
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

export default function TaskCard({
  task,
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
  const [toast, setToast] = useState({
    isOpen: false,
    message: "",
    color: "success",
  });

  const showToast = (message: string, color: string = "success") => {
    setToast({
      isOpen: true,
      message,
      color,
    });
  };

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task.id });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const completedChecklist = task.checklist.filter((item) => item.done).length;

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const progress =
    task.checklist.length > 0
      ? (completedChecklist / task.checklist.length) * 100
      : 0;

  return (
    <>
      {showDeleteConfirm && (
        <div className="!fixed inset-0 flex items-center justify-center !bg-black/40 !z-[999]">
          <div className="bg-white w-[320px] rounded p-5">
            <h2 className="text-lg font-bold text-slate-800">Delete Task?</h2>

            <p className="text-sm text-slate-500 mt-2">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="!px-3 !py-2 text-xs font-bold bg-slate-200 !rounded hover:bg-slate-300"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  showToast("Delete Task Successfully");
                  setTimeout(() => {
                    handleDelete(task.id);
                  }, 750);
                  setShowDeleteConfirm(false);
                }}
                className="!px-3 !py-2 text-xs font-bold bg-red-500 text-white !rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
        className={`bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1 ${
          isDragging ? "opacity-50" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <span
            className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold capitalize
            ${task.label === "feature" ? "bg-blue-100 text-blue-700" : ""}
            ${task.label === "bug" ? "bg-red-100 text-red-700" : ""}
            ${task.label === "issue" ? "bg-yellow-100 text-yellow-700" : ""}
            ${task.label === "undefined" ? "bg-slate-100 text-slate-700" : ""}
          `}
          >
            {task.label}
          </span>

          {task.priority && (
            <div className="flex items-center gap-1 text-red-500 text-[10px] sm:text-xs font-semibold">
              <IonIcon icon={flameOutline} className="text-[12px] sm:text-sm" />
              PRIORITY
            </div>
          )}

          <div className="relative">
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                setOpenMenu(openMenu === task.id ? null : task.id);
              }}
              className="!p-1 !rounded-full hover:bg-slate-400/30"
            >
              <IonIcon
                icon={ellipsisVerticalOutline}
                className="text-sm sm:text-base"
              />
            </button>

            {openMenu === task.id && (
              <div className="absolute right-0 mt-2 w-24 sm:w-28 bg-white border border-slate-200 rounded-lg shadow-lg z-50 overflow-hidden">
                <button
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={() => {
                    setSelectedTask(task);
                    setShowModal("update");
                    setOpenMenu(null);
                  }}
                  className="w-full text-left !px-2 sm:!px-3 !py-1 sm:!py-2 text-[10px] sm:text-xs hover:bg-slate-100"
                >
                  Update
                </button>

                <button
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={() => {
                    setShowDeleteConfirm(true);
                    setOpenMenu(null);
                  }}
                  className="w-full text-left !px-2 sm:!px-3 !py-1 sm:!py-2 text-[10px] sm:text-xs text-red-500 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {task.attachments.length > 0 && (
          <img
            src={task.attachments[0]}
            alt={task.title}
            className="mt-3 sm:mt-4 h-28 sm:h-40 w-full object-cover rounded-lg sm:rounded-2xl"
          />
        )}

        <div className="mt-3 sm:mt-4">
          <h1 className="text-slate-800 font-bold text-sm sm:text-base md:text-lg leading-tight">
            {task.title}
          </h1>

          <p className="mt-1 sm:mt-2 text-[11px] sm:text-sm text-slate-500 line-clamp-2">
            {task.description}
          </p>
        </div>

        <div className="mt-3 sm:mt-5">
          <div className="flex items-center justify-between text-[11px] sm:text-sm">
            <span className="text-slate-500 font-medium">Progress</span>

            <span className="font-semibold text-slate-700">
              {completedChecklist}/{task.checklist.length}
            </span>
          </div>

          <div className="mt-1 sm:mt-2 w-full h-1.5 sm:h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
            />
          </div>
        </div>

        <div className="mt-3 sm:mt-5 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1 text-[11px] sm:text-sm text-slate-500 font-medium">
              <IonIcon icon={calendarOutline} className="text-xs sm:text-sm" />

              <p>
                {new Date(task.dueDate).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                })}
              </p>
            </div>

            <div className="flex items-center gap-1 text-[11px] sm:text-sm text-slate-500 font-medium">
              <IonIcon icon={checkboxOutline} className="text-xs sm:text-sm" />

              <p>
                {completedChecklist}/{task.checklist.length}
              </p>
            </div>

            <div className="flex items-center gap-1 text-[11px] sm:text-sm text-slate-500 font-medium">
              <IonIcon icon={linkOutline} className="text-xs sm:text-sm" />

              <p>{task.attachments.length}</p>
            </div>
          </div>

          <div className="flex items-center">
            {task.assignee.map((item, index) => (
              <img
                key={index}
                src={item.avatar}
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white ${
                  index !== 0 ? "-ml-2 sm:-ml-3" : ""
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <IonToast
        isOpen={toast.isOpen}
        message={toast.message}
        duration={1500}
        position="top"
        cssClass="custom-toast"
        icon={checkmarkCircleOutline}
        onDidDismiss={() =>
          setToast({
            isOpen: false,
            message: "",
            color: "success",
          })
        }
      />
    </>
  );
}
