import { Request, Response } from 'express';
import { Pool } from 'mysql2';
import { QueryError } from 'mysql2/typings/mysql/lib/protocol/sequences/Query';

export const updateTaskStatus =
  (mySQLDataBase: Pool) => (request: Request, response: Response) => {
    const taskID: string = request.body.taskID;
    const itemStatus: string = request.body.itemStatus;
    const sqlDeleteTask: string = `UPDATE tasks
    SET 
        status = ?
    WHERE
        id = ?;`;

    mySQLDataBase.execute(
      sqlDeleteTask,
      [itemStatus, taskID],
      (error: QueryError | null): void => {
        if (error) {
          response.send('Error');
          console.log(error);
        } else {
          response.send('OK');
        }
      }
    );
  };
