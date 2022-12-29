import { Request, Response } from 'express';
import { Connection, MysqlError } from 'mysql';

export const updateTaskStatus =
  (mySQLDataBase: Connection) => (request: Request, response: Response) => {
    const taskID: string = request.body.taskID;
    const itemStatus: string = request.body.itemStatus;
    const sqlDeleteTask: string = `UPDATE tasks
    SET 
        status = ?
    WHERE
        id = ?;`;

    mySQLDataBase.query(
      sqlDeleteTask,
      [itemStatus, taskID],
      (error: MysqlError | null): void => {
        if (error) {
          response.send('Error');
          console.log(error);
        } else {
          response.send('OK');
        }
      }
    );
  };
