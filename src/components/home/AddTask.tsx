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
import { Task, CheckList, USERS } from "../../data/dataTask"; // Sesuaikan path ini

interface Props {
  showModal: string;
  setShowModal: Dispatch<SetStateAction<string>>;
  addTask: (task: Task) => void;
}

export default function AddTaskModal({
  showModal,
  setShowModal,
  addTask,
}: Props) {
  const [data, setData] = useState<Task>({
    id: Date.now().toLocaleString(),
    title: "untitled",
    description: "",
    status: "todo",
    label: "feature",
    dueDate: "",
    priority: false,
    assignee: [],
    checklist: [],
    attachments: [],
  });
  const [showChecklistInput, setShowChecklistInput] = useState(false);
  const [checklistText, setChecklistText] = useState("");
  const [showAssignee, setShowAssignee] = useState(false);
  const assigneeRef = useRef<HTMLDivElement>(null);
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
    addTask(data);
    showToast("Add Task Succesfully");
    setTimeout(() => {
      setShowModal("");
    }, 750);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        assigneeRef.current &&
        !assigneeRef.current.contains(event.target as Node)
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
      isOpen={showModal === "add"}
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
                      onIonChange={handleChange}
                      className="text-2xl font-bold !text-slate-800 !p-0 [--highlight-height:0] placeholder:text-slate-300"
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
                          <img
                            key={user.id}
                            src={user.avatar}
                            title={user.name}
                            className="w-8 h-8 !rounded-full bg-indigo-500 border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
                          />
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowAssignee((p) => !p)}
                        className="w-8 h-8 rounded-full border border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-500"
                      >
                        <IonIcon icon={addOutline} />
                      </button>
                    </div>

                    {showAssignee && (
                      <div className="absolute z-10 mt-2 w-full bg-white border border-slate-200 rounded-lg shadow-sm max-h-48 overflow-auto">
                        {USERS.map((user) => {
                          const selected = data.assignee.some(
                            (u) => u.id === user.id,
                          );

                          return (
                            <div
                              key={user.id}
                              onClick={() => {
                                setData((prev) => {
                                  const exists = prev.assignee.some(
                                    (u) => u.id === user.id,
                                  );

                                  return {
                                    ...prev,
                                    assignee: exists
                                      ? prev.assignee.filter(
                                          (u) => u.id !== user.id,
                                        )
                                      : [...prev.assignee, user],
                                  };
                                });
                              }}
                              className={`flex items-center gap-2 px-3 py-2 text-xs text-slate-700 cursor-pointer hover:bg-slate-200 ${
                                selected ? "bg-blue-50 text-blue-600" : ""
                              }`}
                            >
                              <img
                                src={user.avatar}
                                className="w-6 h-6 rounded-full"
                              />
                              {user.name}
                              {selected && " ✓"}
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
                      defaultValue={data.label}
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
                    >
                      <option value={0}>-</option>
                      <option value={1}>Priority</option>
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
                      defaultValue={data.dueDate}
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
                      defaultValue={data.description}
                      onChange={handleChange}
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
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 bg-white flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition shadow-sm">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
                      <IonIcon
                        icon={imageOutline}
                        className="text-lg text-slate-300"
                      />
                      <span>
                        Drag & Drop files here or{" "}
                        <span className="text-blue-500 underline">browse</span>
                      </span>
                    </div>
                  </div>
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
                    type="button"
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
                        type="button"
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
                        type="button"
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
                    type="button"
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
