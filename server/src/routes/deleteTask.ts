import { Request, Response } from 'express';
import { Pool } from 'mysql2';
import { QueryError } from 'mysql2/promise';

export const deleteTask =
  (mySQLDataBase: Pool) => (request: Request, response: Response) => {
    const taskID: string = request.body.taskID;
    const sqlDeleteTask: string = `DELETE from tasks where id=?;`;
    const sqlDeleteTaskHyperlinks: string =
      'DELETE from hyperlinks where taskID=?;';

    mySQLDataBase.execute(
      sqlDeleteTaskHyperlinks,
      [taskID],
      (error: QueryError | null): void => {
        if (error) {
          response.send('Error');
          console.log(error);
        } else {
          response.send('OK');
          mySQLDataBase.execute(
            sqlDeleteTask,
            [taskID],
            (error: QueryError | null): void => {
              if (error) {
                response.send('Error');
                console.log(error);
              } else {
                response.send('OK');
              }
            }
          );
        }
      }
    );
  };
