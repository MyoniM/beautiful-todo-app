import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
export interface CustomRequest extends Request {
  value?: { body?: string };
}

export class TaskValidator {
  constructor() {}
  validateCreateTask() {
    return async (req: CustomRequest, res: Response, next: NextFunction) => {
      try {
        const val = await createTaskSchema.validateAsync(req.body);
        req.value = req.value ?? {};
        req.value.body = req.value.body ?? val;
        next();
      } catch (error) {
        res.status(400).json(error);
      }
    };
  }
  validateCreateSubTask() {
    return async (req: CustomRequest, res: Response, next: NextFunction) => {
      try {
        const val = await createSubTaskSchema.validateAsync(req.body);
        req.value = req.value ?? {};
        req.value.body = req.value.body ?? val;
        next();
      } catch (error) {
        res.status(400).json(error);
      }
    };
  }
  validateUpdateTask() {
    return async (req: CustomRequest, res: Response, next: NextFunction) => {
      try {
        const val = await updateTaskSchema.validateAsync(req.body);
        req.value = req.value ?? {};
        req.value.body = req.value.body ?? val;
        next();
      } catch (error) {
        res.status(400).json(error);
      }
    };
  }
  validateDeleteTask() {
    return async (req: CustomRequest, res: Response, next: NextFunction) => {
      try {
        const val = await deleteTaskSchema.validateAsync(req.body);
        req.value = req.value ?? {};
        req.value.body = req.value.body ?? val;
        next();
      } catch (error) {
        res.status(400).json(error);
      }
    };
  }
}

export const taskSchema = Joi.object().keys({
  title: Joi.string().required(),
  date: Joi.date().required(),
  completed: Joi.boolean().required(),
});
export const createTaskSchema = Joi.object().keys({
  collectionId: Joi.string().required(),
  task: taskSchema,
});
export const createSubTaskSchema = Joi.object().keys({
  parentTaskId: Joi.string().required(),
  task: taskSchema,
});
export const updateTaskSchema = Joi.object().keys({
  id: Joi.string().required(),
  task: Joi.object().keys({
    title: Joi.string(),
    date: Joi.date(),
    completed: Joi.boolean(),
  }),
});
export const deleteTaskSchema = Joi.object().keys({
  id: Joi.string().required(),
});
