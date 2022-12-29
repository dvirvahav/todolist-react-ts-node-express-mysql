import { Request, Response } from 'express';
import { Connection, MysqlError } from 'mysql';

export const insertTaskDueDate =
  (mySQLDataBase: Connection) => (request: Request, response: Response) => {
    const taskID: string = request.body.taskID;
    const dueDate: string = request.body.dueDate;

    const sqlInsertTaskHyperlink: string = `UPDATE tasks
    SET due_date=?
    WHERE id=?;`;

    mySQLDataBase.query(
      sqlInsertTaskHyperlink,
      [dueDate, taskID],
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
