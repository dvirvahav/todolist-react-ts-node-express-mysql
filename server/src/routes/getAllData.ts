import { Request, Response } from 'express';
import { Pool } from 'mysql2';
import { QueryError, RowDataPacket } from 'mysql2/promise';

export const getAllData =
  (mySQLDataBase: Pool) => (request: Request, response: Response) => {
    const username: string = request.body.username;
    const sqlAllData: string = `select id, name from lists where username=?;`;

    mySQLDataBase.execute(
      sqlAllData,
      [username],
      (error: QueryError | null, userLists: RowDataPacket[]): void => {
        if (error) {
          response.send('Error');
          console.log(error);
        } else {
          mySQLDataBase.execute(
            `Select lists.id as "listID",tasks.id as "taskID",tasks.name as "taskName", tasks.status,  DATE_FORMAT(tasks.date, '%m/%d/%Y, %r') as date, DATE_FORMAT(tasks.due_date, '%m/%d/%Y, %r') as dueDate from lists,tasks where username=? and lists.id=tasks.list_id order by listID
          `,
            [username],
            (error: QueryError | null, userTasks: RowDataPacket[]): void => {
              if (error) {
                response.send('Error');
                console.log(error);
              } else {
                console.log(userLists, userTasks);
                response.send([userLists, userTasks]);
              }
            }
          );
        }
      }
    );
  };
