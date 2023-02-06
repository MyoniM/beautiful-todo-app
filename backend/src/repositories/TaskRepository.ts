import prisma from '../db/db';
import { Prisma } from '@prisma/client';
import { TaskInput } from '../types/taskInput';
class TaskRepository {
  constructor() {}

  // Allow nesting subtasks only upto 3 level so it can work in accordance to the UI provided
  maxNestQuery = {
    subTasks: {
      include: {
        subTasks: {
          include: {
            subTasks: true,
          },
        },
      },
    },
  };
  async CreateTask(collectionId: string, userId: string, task: TaskInput) {
    return await prisma.task.create({
      data: {
        completed: task.completed,
        date: new Date(task.date),
        title: task.title,
        collectionId,
        userId,
      },
      include: {
        ...this.maxNestQuery,
      },
    });
  }
  async CreateSubTask(
    userId: string,
    parentTaskId: string,
    subTask: TaskInput
  ) {
    return await prisma.task.create({
      data: {
        completed: subTask.completed,
        date: new Date(subTask.date),
        title: subTask.title,
        userId,
        taskId: parentTaskId,
      },
      include: {
        ...this.maxNestQuery,
      },
    });
  }
  async deleteTask(id) {
    await prisma.task.delete({
      where: {
        id,
      },
    });
  }
  async updateTask(id, taskInput: TaskInput) {
    return await prisma.task.update({
      where: {
        id,
      },
      data: {
        title: taskInput.title || undefined,
        completed:
          taskInput.completed == undefined ? undefined : taskInput.completed,
        date: new Date(taskInput.date) || undefined,
      },
      include: {
        ...this.maxNestQuery,
      },
    });
  }
}
export default new TaskRepository();
