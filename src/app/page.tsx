"use client";

import Sidebar from "@/components/Sidebar";
import ProgressSection from "@/components/ProgressBar";
import TaskList from "@/components/Tasklist";
import { useTaskStore } from "@/store/useTaskStore";

export default function Page() {
  const tasks = useTaskStore((s) => s.tasks);

  return (
    <div className="min-h-screen bg-[#1e2124] text-gray-100 p-6">
      <div className="max-w-full h-[calc(100vh-3rem)] rounded-2xl shadow-2xl overflow-hidden border border-[#36393e] flex flex-col">
        {/* Header */}
        <header className="p-4 border-b border-[#424549] bg-[#36393e] shrink-0">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="text-lg font-semibold text-white tracking-wide">
              Progress Tracker
            </div>
            <div className="text-sm text-gray-400">
              Two-person live progress
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main className="flex-1 flex flex-col overflow-y-auto p-6 space-y-6">
            {/* Progress Section */}
            <section className="flex-grow flex items-center justify-center">
              <ProgressSection />
            </section>

            {/* Task List */}
            <section>
              <div className="text-sm text-gray-400 mb-2">
                Task list (ticking each task affects that person’s progress)
              </div>
              <div className="p-4 rounded-xl border border-[#424549] bg-[#282b30]">
                <TaskList />
              </div>
            </section>

            {/* Footer */}
            <footer className="text-xs text-gray-500 border-t border-[#424549] pt-2 mt-auto">
              Total tasks: {tasks.length}
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
