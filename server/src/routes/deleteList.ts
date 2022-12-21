import { Request, Response } from 'express';
import { Pool } from 'mysql2';
import { QueryError } from 'mysql2/promise';
export const deleteList =
  (mySQLDataBase: Pool) => (request: Request, response: Response) => {
    const listID: string = request.body.listID;
    const sqlDeleteTasks: string = `DELETE from tasks where list_id=?;`;
    const sqlDeleteList: string = `DELETE from lists where id=?;`;

    mySQLDataBase.execute(
      sqlDeleteTasks,
      [listID],
      (error: QueryError | null): void => {
        if (error) {
          response.send('Error');
          console.log(error);
        } else {
          mySQLDataBase.execute(
            sqlDeleteList,
            [listID],
            (error: QueryError | null): void => {
              if (error) {
                response.send('Error');
                console.log(error);
              }
              response.send('OK');
            }
          );
        }
      }
    );
  };
