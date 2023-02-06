import { createContext, useState } from 'react';
import { ITask } from '../components/tasksContainer/TasksContainer';

function useContextData() {
  return useState<ITask | null>(null);
}

type contextDataType = ReturnType<typeof useContextData>;

export const SelectedTaskContext = createContext<contextDataType | null>(null);
