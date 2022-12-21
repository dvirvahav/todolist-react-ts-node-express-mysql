import { Request, Response } from 'express';
import { Pool } from 'mysql2';
import { QueryError } from 'mysql2/typings/mysql/lib/protocol/sequences/Query';

export const updateTaskName =
  (mySQLDataBase: Pool) => (request: Request, response: Response) => {
    const taskID: string = request.body.taskID;
    const newName: string = request.body.newName;
    const sqlUpdateTaskName: string = `UPDATE tasks
    SET name=?
    WHERE id=?;`;

    mySQLDataBase.execute(
      sqlUpdateTaskName,
      [newName, taskID],
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
