import { Application } from 'express';
import AuthRoutes from './AuthRoutes';
// import lessonRouter from './LessonRoutes';
import userAuth from '../middlewares/userAuth';
import * as path from 'path';
import * as swaggerUI from 'swagger-ui-express';
import { swaggerDocs } from '../swagger/swagerConfig';
import CollectionRoutes from './CollectionRoutes';
import TaskRoutes from './TaskRoutes';
export default class Routes {
  constructor(app: Application) {
    app.use('/api/auth', AuthRoutes);
    app.use('/api/collections', CollectionRoutes);
    app.use('/api/tasks', TaskRoutes);
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
    app.get('*', (req, res) => {
      res.sendFile(
        path.join(__dirname, '../../../../frontend/build/index.html')
      );
    });
  }
}
