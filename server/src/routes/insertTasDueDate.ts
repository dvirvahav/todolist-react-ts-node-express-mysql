import { Request, Response } from 'express';
import { Pool } from 'mysql2';
import { QueryError } from 'mysql2/promise';

export const insertTaskDueDate =
  (mySQLDataBase: Pool) => (request: Request, response: Response) => {
    const taskID: string = request.body.taskID;
    const dueDate: string = request.body.dueDate;

    const sqlInsertTaskHyperlink: string = `UPDATE tasks
    SET due_date=?
    WHERE id=?;`;

    mySQLDataBase.execute(
      sqlInsertTaskHyperlink,
      [dueDate, taskID],
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
