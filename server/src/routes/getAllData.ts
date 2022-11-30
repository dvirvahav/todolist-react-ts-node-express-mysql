import { Request, Response } from 'express';
import { Connection, FieldInfo, MysqlError } from 'mysql';

export const getAllData =
  (mySQLDataBase: Connection) => (request: Request, response: Response) => {
    const username: string = request.body.username;
    const sqlAllData: string = `select id, name from lists where username=?;`;

    mySQLDataBase.query(
      sqlAllData,
      [username],
      (error: MysqlError | null, userLists: FieldInfo[]): void => {
        if (error) {
          response.send('Error');
          console.log(error);
        } else {
          mySQLDataBase.query(
            `Select lists.id as "listID",tasks.id as "taskID",tasks.name as "taskName", tasks.status,  DATE_FORMAT(tasks.date, '%m/%d/%Y, %r') as date from lists,tasks where username=? and lists.id=tasks.list_id order by listID
          `,
            [username],
            (error: MysqlError | null, userTasks: FieldInfo[]): void => {
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
