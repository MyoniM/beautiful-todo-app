import { TaskInput } from '../types/taskInput';
import { Request, Response, NextFunction } from 'express';
import TaskRepository from '../repositories/TaskRepository';
export default class TaskController {
  constructor() {}
  async createTask(req: Request, res: Response, next: NextFunction) {
    const { collectionId, task }: { collectionId: string; task: TaskInput } =
      req.body;
    return res
      .status(201)
      .json(
        await TaskRepository.CreateTask(
          collectionId,
          (req.user as any).id,
          task
        )
      );
  }
  async createSubTask(req: Request, res: Response, next: NextFunction) {
    const { parentTaskId, task }: { parentTaskId: string; task: TaskInput } =
      req.body;

    let checkNesting: any = await prisma.task.findUnique({
      where: {
        id: parentTaskId,
      },
      include: {
        Task: {
          include: {
            Task: {
              include: {
                Task: {
                  include: { Task: true },
                },
              },
            },
          },
        },
      },
    });
    let totalCount = 0;
    while (checkNesting) {
      // Iteratively check the max depth of the current subtask
      totalCount += 1;
      checkNesting = checkNesting.Task;
    }
    if (totalCount >= 3) {
      return res
        .status(400)
        .json({ error: 'You have nested the maximum amount of tasks you can' });
    }
    return res
      .status(201)
      .json(
        await TaskRepository.CreateSubTask(
          (req.user as any).id,
          parentTaskId,
          task
        )
      );
  }
  async updateTask(req: Request, res: Response, next: NextFunction) {
    const { id, task }: { id: string; task: TaskInput } = req.body;
    return res.status(201).json(await TaskRepository.updateTask(id, task));
  }
  async deleteTask(req: Request, res: Response, next: NextFunction) {
    const { id } = req.body;
    await TaskRepository.deleteTask(id);
    return res.status(201).json({ message: 'success' });
  }
}
