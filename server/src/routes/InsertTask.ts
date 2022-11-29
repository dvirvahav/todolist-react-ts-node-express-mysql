import Express from 'express';
import mysql from 'mysql';

export const insertTask =
  (mySQLDataBase: mysql.Connection) =>
  (request: Express.Request, response: Express.Response) => {
    const listID: string = request.body.listID;
    const taskName: string = request.body.taskName;
    const sqlInsertTask = `INSERT INTO tasks (list_id,name) VALUES
    (?,?) `;

    mySQLDataBase.query(
      sqlInsertTask,
      [listID, taskName],
      (error: mysql.MysqlError | null): void => {
        if (error) {
          response.send('Error');
          console.log(error);
        } else {
          mySQLDataBase.query(
            'SELECT max(id) as id, date from tasks where list_id=?',
            listID,
            (
              error: mysql.MysqlError | null,
              result: mysql.FieldInfo[]
            ): void => {
              if (error) console.log(error);
              else response.send(result);
            }
          );
        }
      }
    );
  };
