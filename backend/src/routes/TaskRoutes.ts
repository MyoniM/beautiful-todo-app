import { Router } from 'express';
import TaskController from '../controllers/TaskController';
import { apiErrorHandler } from '../handlers/errorHandler';
import { asyncMiddleware } from '../middlewares/asyncHandler';
import userAuth from '../middlewares/userAuth';
import { TaskValidator } from '../validators/taskValidator';

class TaskRoutes {
  router = Router();
  taskController = new TaskController();
  taskValidator = new TaskValidator();
  constructor() {
    this.initializeRoutes();
  }
  initializeRoutes() {
    /**
     * @swagger
     * /api/tasks/createTask:
     *   post:
     *     security:
     *        - bearerAuth: []
     *     summary: Create A Task
     *     tags: [Tasks]
     *     requestBody:
     *      required: true
     *      content:
     *          application/json:
     *              schema:
     *                  type: object
     *                  required:
     *                      - collectionId
     *                      - task
     *                  properties:
     *                      collectionId:
     *                          type: string
     *                      task:
     *                          type: object
     *     responses:
     *       401:
     *         description: Unauthorized
     *       201:
     *         description: Task created successfully
     */
    this.router
      .route('/createTask')
      .post(
        userAuth,
        this.taskValidator.validateCreateTask(),
        asyncMiddleware(this.taskController.createTask)
      );
    /**
     * @swagger
     * /api/tasks/createSubTask:
     *   post:
     *     security:
     *        - bearerAuth: []
     *     summary: Create A SubTask
     *     tags: [Tasks]
     *     requestBody:
     *      required: true
     *      content:
     *          application/json:
     *              schema:
     *                  type: object
     *                  required:
     *                      - parentTaskId
     *                      - task
     *                  properties:
     *                      parentTaskId:
     *                          type: string
     *                      task:
     *                          type: object
     *     responses:
     *       401:
     *         description: Unauthorized
     *       201:
     *         description: Task created successfully
     */
    this.router
      .route('/createSubTask')
      .post(
        userAuth,
        this.taskValidator.validateCreateSubTask(),
        asyncMiddleware(this.taskController.createSubTask)
      );
    /**
     * @swagger
     * /api/tasks/updateTask:
     *   put:
     *     security:
     *        - bearerAuth: []
     *     summary: Update Any Task
     *     tags: [Tasks]
     *     requestBody:
     *      required: true
     *      content:
     *          application/json:
     *              schema:
     *                  type: object
     *                  required:
     *                      - id
     *                      - task
     *                  properties:
     *                      id:
     *                          type: string
     *                      task:
     *                          type: object
     *     responses:
     *       401:
     *         description: Unauthorized
     *       201:
     *         description: Task updated successfully
     */
    this.router
      .route('/updateTask')
      .put(
        userAuth,
        this.taskValidator.validateUpdateTask(),
        asyncMiddleware(this.taskController.updateTask)
      );

    /**
     * @swagger
     * /api/tasks/deleteTask:
     *   delete:
     *     security:
     *        - bearerAuth: []
     *     summary: Delete A Task
     *     tags: [Tasks]
     *     requestBody:
     *      required: true
     *      content:
     *          application/json:
     *              schema:
     *                  type: object
     *                  required:
     *                      - id
     *                  properties:
     *                      id:
     *                          type: string
     *     responses:
     *       401:
     *         description: Unauthorized
     *       201:
     *         description: Task deleted successfully
     */
    this.router
      .route('/deleteTask')
      .delete(
        userAuth,
        this.taskValidator.validateDeleteTask(),
        asyncMiddleware(this.taskController.deleteTask)
      );
  }
}
export default new TaskRoutes().router;
