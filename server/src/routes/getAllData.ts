import Express from 'express';
import mysql from 'mysql';

export const getAllData =
  (mySQLDataBase: mysql.Connection) =>
  (request: Express.Request, response: Express.Response) => {
    const username: string = request.body.username;
    const sqlAllData: string = `select id, name from lists where username=?;`;

    mySQLDataBase.query(
      sqlAllData,
      [username],
      (error: mysql.MysqlError | null, userLists: mysql.FieldInfo[]): void => {
        if (error) {
          response.send('Error');
          console.log(error);
        } else {
          mySQLDataBase.query(
            `Select lists.id as "listID",tasks.id as "taskID",tasks.name as "taskName", tasks.status,  DATE_FORMAT(tasks.date, '%m/%d/%Y, %r') as date from lists,tasks where username=? and lists.id=tasks.list_id order by listID
          `,
            [username],
            (
              error: mysql.MysqlError | null,
              userTasks: mysql.FieldInfo[]
            ): void => {
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
