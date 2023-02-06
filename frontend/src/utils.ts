import { ITask } from './components/tasksContainer/TasksContainer';

export const deepCloneCollectionForEdit = (tasks: ITask[], idToSearch: string, editedTask: ITask) => {
  const subTasks: ITask[] = [];

  tasks.forEach((tt: ITask) => {
    if (tt.id === idToSearch) {
      tt = Object.assign({}, tt, editedTask);
    }

    subTasks.push({
      ...tt,
      subTasks: deepCloneCollectionForEdit(tt.subTasks, idToSearch, editedTask),
    });
  });

  return subTasks;
};

export const deepCloneCollectionForCreate = (tasks: ITask[], idToSearch: string, newTask: ITask) => {
  const subTasks: ITask[] = [];

  tasks?.forEach((tt: ITask) => {
    if (tt.id === idToSearch) {
      tt = Object.assign({}, tt, { subTasks: [...tt.subTasks, newTask] });
    }

    subTasks.push({
      ...tt,
      subTasks: deepCloneCollectionForCreate(tt.subTasks, idToSearch, newTask),
    });
  });

  return subTasks;
};

export const deepCloneCollectionForDelete = (tasks: ITask[], idToSearch: string) => {
  const subTasks: ITask[] = [];

  tasks?.forEach((tt: ITask) => {
    if (tt.id !== idToSearch) {
      subTasks.push({
        ...tt,
        subTasks: deepCloneCollectionForDelete(tt.subTasks, idToSearch),
      });
    }
  });

  return subTasks;
};
export function getGreenToRed(percent: number) {
  let r = percent < 50 ? 255 : Math.floor(255 - ((percent * 2 - 100) * 255) / 100);
  let g = percent > 50 ? 255 : Math.floor((percent * 2 * 255) / 100);
  return 'rgb(' + r + ',' + (g - 40) + ',0)';
}
export function countSubTasks(task: ITask): number {
  return (
    1 +
    task.subTasks
      .map((e) => {
        return countSubTasks(e);
      })
      .reduce((a, b) => a + b, 0)
  );
}
export function countSubTasksCompleted(task: ITask): number {
  let res = task.completed ? 1 : 0;
  return (
    res +
    task.subTasks
      .map((e) => {
        return countSubTasks(e);
      })
      .reduce((a, b) => a + b, 0)
  );
}
