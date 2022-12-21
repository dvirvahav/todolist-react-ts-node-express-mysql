import { Request, Response } from 'express';
import { Pool } from 'mysql2';
import { RowDataPacket } from 'mysql2/typings/mysql/lib/protocol/packets';
import { QueryError } from 'mysql2/typings/mysql/lib/protocol/sequences/Query';

export const insertTask =
  (mySQLDataBase: Pool) => (request: Request, response: Response) => {
    const listID: string = request.body.listID;
    const taskName: string = request.body.taskName;
    const sqlInsertTask: string = `INSERT INTO tasks (list_id,name) VALUES
    (?,?) `;

    mySQLDataBase.execute(
      sqlInsertTask,
      [listID, taskName],
      (error: QueryError | null): void => {
        if (error) {
          response.send('Error');
          console.log(error);
        } else {
          mySQLDataBase.execute(
            'SELECT max(id) as id, date from tasks where list_id=?',
            listID,
            (error: QueryError | null, result: RowDataPacket[]): void => {
              if (error) console.log(error);
              else response.send(result);
            }
          );
        }
      }
    );
  };
