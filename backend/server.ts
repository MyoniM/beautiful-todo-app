import * as dotenv from 'dotenv';
dotenv.config();
import * as express from 'express';
import { Application } from 'express';
import ApiServer from './src/index';
import * as http from 'http';
const app: Application = express();
const server: ApiServer = new ApiServer(app);
const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
const httpServer = http.createServer(app);
httpServer
  .listen(port, function () {
    console.info(`Server running on PORT ${port}`);
  })
  .on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.log('server startup error: address already in use');
    } else {
      console.log(err);
    }
    process.exit(1);
  });
