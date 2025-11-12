"use client";

import { useEffect, useState } from "react";
import { Play, Pause, Clock, User, Users } from "lucide-react";
import { computeProgress, useTaskStore } from "@/store/useTaskStore";

export default function ProgressSection() {
  const tasks = useTaskStore((s) => s.tasks);

  // Pomodoro logic
  const [minutesInput, setMinutesInput] = useState(25);
  const [timeLeft, setTimeLeft] = useState(minutesInput * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => interval && clearInterval(interval);
  }, [isRunning]);

  const handleSetTimer = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeLeft(minutesInput * 60);
    setIsRunning(false);
  };

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  const youInfo = computeProgress(tasks, "you");
  const partnerInfo = computeProgress(tasks, "partner");

  return (
    <div className="w-full flex flex-col items-center space-y-6 text-gray-200">
      {/* Pomodoro Timer */}
      <div className="w-full max-w-lg p-6 rounded-2xl bg-linear-to-br from-[#1e2124] to-[#282b30] border border-[#424549] shadow-[0_0_25px_#7289da30]">
        <form
          onSubmit={handleSetTimer}
          className="flex items-center justify-between gap-4 mb-4"
        >
          <div className="flex items-center gap-2">
            <Clock className="text-[#7289da]" size={20} />
            <span className="font-semibold text-gray-100">Pomodoro Timer</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="number"
              value={minutesInput}
              min={1}
              max={120}
              onChange={(e) => setMinutesInput(Number(e.target.value))}
              className="w-20 bg-[#2b2d31] text-gray-200 border border-[#424549] rounded-lg px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-[#7289da]/60"
            />
            <button
              type="submit"
              className="px-3 py-1 text-sm bg-[#7289da] rounded-md hover:bg-[#5b6fc6] transition-colors"
            >
              Set
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between">
          <div className="text-4xl font-mono text-[#7289da] tracking-wide">
            {minutes}:{seconds}
          </div>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-4 py-2 text-sm rounded-lg bg-[#2b2d31] border border-[#424549] hover:border-[#7289da]/60 hover:text-[#7289da] transition-all"
          >
            {isRunning ? (
              <span className="flex items-center gap-2">
                <Pause size={14} /> Pause
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Play size={14} /> Start
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 w-full max-w-4xl">
        <ProgressBar owner="you" name="You" info={youInfo} />
        <ProgressBar owner="partner" name="Partner" info={partnerInfo} />
      </div>
    </div>
  );
}

function ProgressBar({
  owner,
  name,
  info,
}: {
  owner: "you" | "partner";
  name: string;
  info: { pct: number; done: number; total: number };
}) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 font-semibold text-sm text-gray-200">
          {owner === "you" ? <User size={16} /> : <Users size={16} />}
          {name}
        </div>
        <div className="text-xs text-gray-400">
          {info.pct}% ({info.done}/{info.total})
        </div>
      </div>

      <div className="w-full h-6 bg-[#2b2d31] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300 bg-[#7289da] shadow-[0_0_10px_#7289da55]"
          style={{ width: `${info.pct}%` }}
        ></div>
      </div>
    </div>
  );
}
