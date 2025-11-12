"use client";

import { Check, Trash2 } from "lucide-react";
import { Task, useTaskStore } from "@/store/useTaskStore";

export default function TaskRow({ task }: { task: Task }) {
  const toggleTask = useTaskStore((s) => s.toggleTask);
  const removeTask = useTaskStore((s) => s.removeTask);

  return (
    <div
      className="
        flex items-center gap-3 
        p-3 
        bg-[#2b2d31] 
        border border-[#424549] 
        rounded-lg 
        hover:bg-[#36393e] 
        transition-all 
        duration-200 
        shadow-sm
      "
    >
      {/* Toggle Button */}
      <button
        onClick={() => toggleTask(task.id)}
        className={`
          w-8 h-8 
          rounded-full 
          border flex items-center justify-center 
          transition-all duration-200
          ${
            task.done
              ? "bg-[#7289da] border-[#7289da] text-white shadow-[0_0_8px_#7289da55]"
              : "bg-[#1e2124] border-[#424549] text-gray-400 hover:border-[#7289da]/60"
          }
        `}
        aria-label={`toggle ${task.title}`}
      >
        <Check size={14} />
      </button>

      {/* Task Info */}
      <div className="flex-1 min-w-0">
        <div
          className={`truncate font-medium ${
            task.done ? "line-through text-gray-500" : "text-gray-200"
          }`}
        >
          {task.title}
        </div>
        <div
          className={`text-xs ${task.done ? "text-gray-600" : "text-gray-400"}`}
        >
          {task.owner === "you" ? "You" : "Partner"}
        </div>
      </div>

      {/* Delete Button */}
      <button
        onClick={() => removeTask(task.id)}
        className="
          p-2 
          rounded-lg 
          text-gray-400 
          hover:text-red-500 
          hover:bg-[#1e2124]
          transition-all 
          duration-200
        "
        aria-label="delete task"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
