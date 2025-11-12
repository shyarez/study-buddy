import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Owner = 'you' | 'partner';

export type Task = {
  id: string;
  title: string;
  done: boolean;
  owner: Owner;
};

type State = {
  tasks: Task[];
  addTask: (title: string, owner: Owner) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  clearAll: () => void;
};

export const useTaskStore = create<State>()(
  persist(
    (set, get) => ({
      tasks: [],

      addTask: (title, owner) => {
        const id = 't' + Math.random().toString(36).slice(2, 9);
        set({
          tasks: [...get().tasks, { id, title, done: false, owner }],
        });
      },

      toggleTask: (id) => {
        set({
          tasks: get().tasks.map((t) =>
            t.id === id ? { ...t, done: !t.done } : t
          ),
        });
      },

      removeTask: (id) => {
        set({
          tasks: get().tasks.filter((t) => t.id !== id),
        });
      },

      clearAll: () => set({ tasks: [] }),
    }),
    { name: 'two-person-progress-store' }
  )
);

export function computeProgress(tasks: Task[], owner: Owner) {
  const owned = tasks.filter((t) => t.owner === owner);
  if (owned.length === 0) return { pct: 0, done: 0, total: 0 };

  const done = owned.filter((t) => t.done).length;
  const pct = Math.round((done / owned.length) * 100);

  return { pct, done, total: owned.length };
}
