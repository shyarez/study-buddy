"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useTaskStore, Owner } from "@/store/useTaskStore";
import TaskRow from "./TaskRow";

export default function TaskList() {
  const tasks = useTaskStore((s) => s.tasks);
  const addTask = useTaskStore((s) => s.addTask);
  const clearAll = useTaskStore((s) => s.clearAll);
  const [text, setText] = useState("");
  const [owner, setOwner] = useState<Owner>("you");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTask(text.trim(), owner);
    setText("");
  };

  return (
    <div>
      {/* Input + Select + Button */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 mb-5"
      >
        {/* Input */}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Add task for ${owner === "you" ? "you" : "partner"}`}
          className="
            flex-1 
            p-3 
            rounded-lg 
            border 
            border-[#424549] 
            bg-[#1e2124] 
            text-gray-200 
            placeholder-gray-500 
            focus:outline-none 
            focus:ring-2 
            focus:ring-[#7289da]/60 
            focus:border-[#7289da] 
            transition-all 
            duration-200
            hover:border-[#7289da]/40
          "
        />

        {/* Owner Select */}
        <select
          value={owner}
          onChange={(e) => setOwner(e.target.value as Owner)}
          className="
            w-40
            rounded-lg
            bg-[#2b2d31]
            border border-[#424549]
            text-gray-200
            p-2.5
            text-sm
            focus:outline-none
            focus:ring-2
            focus:ring-[#7289da]/60
            focus:border-[#7289da]
            transition-all
            duration-200
            hover:border-[#7289da]/40
            hover:bg-[#36393e]
            shadow-sm
          "
        >
          <option value="you" className="bg-[#2b2d31] text-gray-200">
            You
          </option>
          <option value="partner" className="bg-[#2b2d31] text-gray-200">
            Partner
          </option>
        </select>

        {/* Add Button */}
        <button
          type="submit"
          className="
            px-5 
            py-2.5
            rounded-lg 
            bg-[#7289da] 
            text-white 
            flex items-center justify-center gap-2 
            font-medium
            hover:bg-[#5b6eae]
            transition-all
            duration-200
            shadow-[0_0_8px_#7289da66]
            active:scale-[0.98]
          "
        >
          <Plus size={14} /> Add
        </button>
      </form>

      {/* Task List */}
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="p-6 rounded-lg bg-[#2b2d31]/60 text-center text-gray-400 border border-[#424549]">
            No tasks yet — add some!
          </div>
        ) : (
          tasks.map((t) => <TaskRow key={t.id} task={t} />)
        )}
      </div>

      {/* Clear All */}
      {tasks.length > 0 && (
        <div className="mt-5 text-right">
          <button
            onClick={clearAll}
            className="
              text-sm 
              text-red-500 
              hover:text-red-400 
              underline 
              transition-colors 
              duration-150
            "
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
