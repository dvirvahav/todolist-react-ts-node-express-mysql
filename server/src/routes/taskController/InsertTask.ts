import { Request, Response } from 'express';
import { Connection, FieldInfo, MysqlError } from 'mysql';

export const insertTask =
  (mySQLDataBase: Connection) => (request: Request, response: Response) => {
    const listID: string = request.body.listID;
    const taskName: string = request.body.taskName;
    const sqlInsertTask: string = `INSERT INTO tasks (list_id,name) VALUES
    (?,?) `;

    mySQLDataBase.query(
      sqlInsertTask,
      [listID, taskName],
      (error: MysqlError | null): void => {
        if (error) {
          response.send('Error');
          console.log(error);
        } else {
          mySQLDataBase.query(
            'SELECT max(id) as id, date from tasks where list_id=?',
            listID,
            (error: MysqlError | null, result: FieldInfo[]): void => {
              if (error) console.log(error);
              else response.send(result);
            }
          );
        }
      }
    );
  };
