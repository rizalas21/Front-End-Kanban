import {
  IonContent,
  IonIcon,
  IonInput,
  IonModal,
  IonTextarea,
  IonToast,
} from "@ionic/react";
import {
  addOutline,
  calendarOutline,
  closeOutline,
  imageOutline,
  checkmarkCircleOutline,
  pencilOutline,
} from "ionicons/icons";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Task, CheckList, User, USERS } from "../../data/dataTask"; // Sesuaikan path ini

interface Props {
  showModal: string;
  setShowModal: Dispatch<SetStateAction<string>>;
  selectedTask: Task | null;
  setSelectedTask: Dispatch<SetStateAction<Task | null>>;
  updateTask: (task: Task) => void;
}

export default function UpdateTaskModal({
  showModal,
  setShowModal,
  selectedTask,
  setSelectedTask,
  updateTask,
}: Props) {
  const [showAssignee, setShowAssignee] = useState(false);
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
  const [data, setData] = useState<Task>({
    id: selectedTask?.id ?? "",
    title: selectedTask?.title ?? "",
    description: selectedTask?.description ?? "",
    status: selectedTask?.status ?? "todo",
    label: selectedTask?.label ?? "feature",
    dueDate: selectedTask?.dueDate ?? "",
    priority: selectedTask?.priority ?? false,
    assignee: selectedTask?.assignee ?? [],
    checklist: selectedTask?.checklist ?? [],
    attachments: selectedTask?.attachments ?? [],
  });
  const assigneeRef = useRef<HTMLDivElement>(null);

  const toggleAssignee = (user: User) => {
    setData((prev) => {
      const exists = prev.assignee.some((u) => u.id === user.id);

      return {
        ...prev,
        assignee: exists
          ? prev.assignee.filter((u) => u.id !== user.id)
          : [...prev.assignee, user],
      };
    });
  };
  const [showChecklistInput, setShowChecklistInput] = useState(false);
  const [checklistText, setChecklistText] = useState("");

  const handleChange = (e: any) => {
    const name = e.target?.name || e.detail?.target?.name;
    const value = e.target?.value || e.detail?.value;

    if (name === "priority") {
      setData({
        ...data,
        [name]: value === "1",
      });
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    updateTask(data);
    showToast("Update Task Succesfuly");
    setTimeout(() => {
      setShowModal("");
    }, 750);
  };

  useEffect(() => {
    if (selectedTask) {
      setData(selectedTask);
    }
  }, [selectedTask]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        assigneeRef.current &&
        !assigneeRef.current.contains(e.target as Node)
      ) {
        setShowAssignee(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <IonModal
      isOpen={showModal === "update"}
      onDidDismiss={() => setShowModal("")}
      className="fullscreen-modal"
    >
      <IonContent className="[--background:#fff]">
        <div className="min-h-screen bg-slate-50/30 flex items-center justify-center p-4">
          <div className="w-full max-w-5xl bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-3 border-b border-slate-100">
              <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-md text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition uppercase tracking-tighter">
                <IonIcon
                  icon={checkmarkCircleOutline}
                  className="text-blue-500 text-sm"
                />
                Mark Complete
              </button>
              <button
                onClick={() => setShowModal("")}
                className="text-slate-400 hover:text-slate-600 transition"
              >
                <IonIcon icon={closeOutline} className="text-2xl" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 divide-x divide-slate-100 h-full overflow-y-auto"
            >
              <div className="p-8 space-y-8">
                <div className="aspect-[16/9] rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col items-center justify-center text-blue-500/70 cursor-pointer hover:bg-slate-100 transition group">
                  <IonIcon icon={imageOutline} className="text-3xl mb-1" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    Add Cover Image
                  </span>
                </div>

                <div className="flex items-center justify-between group border-b border-transparent focus-within:border-slate-100 transition">
                  <div className="flex-1">
                    <IonInput
                      required
                      name="title"
                      placeholder="untitled"
                      value={data.title}
                      className="text-2xl font-bold !text-slate-800 !p-0 [--highlight-height:0] placeholder:text-slate-300"
                      onIonInput={handleChange}
                    />
                  </div>
                  <IonIcon
                    icon={pencilOutline}
                    className="text-slate-300 text-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-2" ref={assigneeRef}>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">
                      Assignee
                    </label>

                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {data.assignee.map((user) => (
                          <div
                            key={user.name}
                            className="w-8 h-8 !rounded-full bg-indigo-500 border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
                          >
                            {user.avatar ? (
                              <img
                                src={user.avatar}
                                alt=""
                                className="rounded-full"
                              />
                            ) : (
                              user.name.slice(0, 2).toUpperCase()
                            )}
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => setShowAssignee((prev) => !prev)}
                        className="w-8 h-8 rounded-full border border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-500 transition"
                      >
                        <IonIcon icon={addOutline} />
                      </button>
                    </div>

                    {showAssignee && (
                      <div className="mt-2 bg-white text-slate-700 border border-slate-200 rounded-lg p-2 shadow-sm space-y-1 max-h-40 overflow-auto">
                        {USERS.map((user) => {
                          const selected = data.assignee.some(
                            (u) => u.id === user.id,
                          );

                          return (
                            <div
                              key={user.id}
                              onClick={() => toggleAssignee(user)}
                              className={`text-xs px-2 py-1 rounded cursor-pointer flex justify-between items-center ${
                                selected
                                  ? "bg-blue-50 text-blue-600"
                                  : "hover:bg-slate-200"
                              }`}
                            >
                              {user.name}
                              {selected && "✓"}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">
                      Column
                    </label>
                    <select
                      name="status"
                      value={data.status}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 text-xs font-bold !text-slate-600 outline-none cursor-pointer"
                    >
                      <option value="todo">To Do</option>
                      <option value="doing">Doing</option>
                      <option value="review">Review</option>
                      <option value="done">Done</option>
                      <option value="rework">Rework</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">
                      Label
                    </label>
                    <select
                      name="label"
                      value={data.label}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 text-xs font-bold !text-slate-600 outline-none cursor-pointer"
                    >
                      <option value="feature">Feature</option>
                      <option value="bug">Bug</option>
                      <option value="issue">Issue</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">
                      Priority
                    </label>
                    <select
                      name="priority"
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 text-xs font-bold !text-slate-600 outline-none cursor-pointer"
                      value={data.priority ? "1" : "0"}
                    >
                      <option value="0">-</option>
                      <option value="1">Priority</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">
                    Due Date
                  </label>
                  <div className="bg-slate-100 border border-slate-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-100 transition">
                    <input
                      required
                      name="dueDate"
                      type="date"
                      value={data.dueDate}
                      onChange={handleChange}
                      className="w-full h-full px-3 py-2 bg-transparent text-xs font-bold !text-slate-600 outline-none cursor-pointer [color-scheme:light]"
                    />
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-10 bg-slate-50/20">
                <div className="space-y-3">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">
                    Description
                  </h3>
                  <div className="relative group">
                    <IonTextarea
                      required
                      name="description"
                      value={data.description}
                      onIonInput={handleChange}
                      rows={5}
                      className="bg-white border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium !text-slate-600 [--highlight-height:0] shadow-sm"
                      placeholder="Explain what needs to be done..."
                    />
                    <IonIcon
                      icon={pencilOutline}
                      className="absolute top-3 right-3 text-slate-200 group-focus-within:text-blue-400 transition"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">
                    Attachments
                  </h3>

                  {data.attachments.length > 0 ? (
                    <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4 shadow-sm">
                      <img
                        src={data.attachments[0]}
                        alt="attachment"
                        className="w-20 h-20 object-cover rounded-lg border border-slate-100"
                      />

                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-700">
                          Attachment Preview
                        </span>

                        <span className="text-xs text-slate-400 truncate max-w-[200px]">
                          {data.attachments[0]}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4 shadow-sm">
                      <div className="w-20 h-20 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200">
                        <IonIcon
                          icon={imageOutline}
                          className="text-3xl text-slate-400"
                        />
                      </div>

                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-700">
                          default.png
                        </span>

                        <span className="text-xs text-slate-400">
                          No attachment uploaded
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">
                      Check List
                    </h3>

                    <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">
                      {data.checklist.filter((i) => i.done).length}/
                      {data.checklist.length} Tasks
                    </span>
                  </div>

                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                    <div
                      className="h-full bg-blue-500 transition-all duration-500"
                      style={{
                        width:
                          data.checklist.length === 0
                            ? "0%"
                            : `${
                                (data.checklist.filter((i) => i.done).length /
                                  data.checklist.length) *
                                100
                              }%`,
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    {data.checklist.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-2 bg-white border border-slate-100 rounded-lg px-3 py-2"
                      >
                        <input
                          type="checkbox"
                          checked={item.done}
                          onChange={() =>
                            setData((prev) => ({
                              ...prev,
                              checklist: prev.checklist.map((c) =>
                                c.id === item.id ? { ...c, done: !c.done } : c,
                              ),
                            }))
                          }
                        />

                        <span
                          className={`text-xs ${
                            item.done
                              ? "line-through text-slate-400"
                              : "text-slate-700"
                          }`}
                        >
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setShowChecklistInput(true)}
                    className="w-full py-3 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-500 flex items-center justify-center gap-2 hover:bg-slate-50 hover:text-slate-800 hover:border-slate-300 transition shadow-sm"
                  >
                    <IonIcon icon={addOutline} className="text-lg" />
                    ADD SUBTASK
                  </button>

                  {showChecklistInput && (
                    <div className="flex gap-2">
                      <input
                        value={checklistText}
                        onChange={(e) => setChecklistText(e.target.value)}
                        placeholder="New subtask..."
                        className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none !text-slate-500"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            if (!checklistText.trim()) return;

                            setData((prev) => ({
                              ...prev,
                              checklist: [
                                ...prev.checklist,
                                {
                                  id: Date.now(),
                                  text: checklistText,
                                  done: false,
                                },
                              ],
                            }));

                            setChecklistText("");
                            setShowChecklistInput(false);
                          }
                        }}
                      />

                      <button
                        onClick={() => {
                          if (!checklistText.trim()) return;

                          setData((prev) => ({
                            ...prev,
                            checklist: [
                              ...prev.checklist,
                              {
                                id: Date.now(),
                                text: checklistText,
                                done: false,
                              },
                            ],
                          }));

                          setChecklistText("");
                          setShowChecklistInput(false);
                        }}
                        className="!px-3 !py-2 text-xs font-bold bg-blue-500 text-white !rounded-lg hover:bg-blue-600"
                      >
                        Add
                      </button>

                      <button
                        onClick={() => {
                          setShowChecklistInput(false);
                          setChecklistText("");
                        }}
                        className="!px-3 !py-2 text-xs font-bold bg-slate-400/50 !rounded-lg hover:bg-slate-400/25"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                <div className="pt-6 flex items-center justify-end gap-3 border-t border-slate-100">
                  <button
                    onClick={() => setShowModal("")}
                    className="!px-4 !py-2 !rounded-lg text-xs font-bold bg-slate-200 text-slate-800 hover:text-slate-600 hover:bg-slate-100 transition"
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    className="!px-4 !py-2 !rounded-lg bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-200 hover:bg-blue-600 active:scale-95 transition"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
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
      </IonContent>
    </IonModal>
  );
}
