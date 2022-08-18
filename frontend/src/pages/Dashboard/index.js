import React from "react";
import TaskCompletion from "./TaskCompletion";
import TaskByCategory from "./TasksByCategory";

export default function Dashboard() {
  return (
    <div>
      <TaskCompletion />
      <TaskByCategory />
    </div>
  );
}
