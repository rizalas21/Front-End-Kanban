import {
  DndContext,
  closestCorners,
  DragEndEvent,
  useSensor,
  PointerSensor,
  TouchSensor,
  useSensors,
} from "@dnd-kit/core";
import { Dispatch, SetStateAction, useState } from "react";
import { Task } from "../../data/dataTask";
import Column from "./Column";

interface Props {
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

export default function Board({
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
  const todoTasks = tasks.filter((item) => item.status === "todo");
  const doingTasks = tasks.filter((item) => item.status === "doing");
  const reviewTasks = tasks.filter((item) => item.status === "review");
  const doneTasks = tasks.filter((item) => item.status === "done");
  const reworkTasks = tasks.filter((item) => item.status === "rework");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 500,
        tolerance: 8,
      },
    }),
  );

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    const task = tasks.find((t) => t.id === taskId);

    if (!task) return;

    if (task.status === newStatus) return;

    handleUpdate({
      ...task,
      status: newStatus,
    });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={onDragEnd}
    >
      <div
        className="flex gap-4 sm:gap-6 overflow-x-auto px-2 sm:px-4 md:px-6 py-2 sm:py-4 bg-white text-slate-700 min-h-screen"
        color="light"
      >
        <Column
          id="todo"
          title="To Do"
          tasks={todoTasks}
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
        <Column
          id="doing"
          title="Doing"
          tasks={doingTasks}
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
        <Column
          id="review"
          title="Review"
          tasks={reviewTasks}
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
        <Column
          id="done"
          title="Done"
          tasks={doneTasks}
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
        <Column
          id="rework"
          title="Rework"
          tasks={reworkTasks}
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
      </div>
    </DndContext>
  );
}
