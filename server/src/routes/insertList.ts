import { Request, Response } from 'express';
import { Pool } from 'mysql2';
import { QueryError, RowDataPacket } from 'mysql2/promise';

export const insertList =
  (mySQLDataBase: Pool) => (request: Request, response: Response) => {
    const listName: string = request.body.listName;
    const username: string = request.body.username;
    const sqlInsertList: string = `INSERT INTO lists (username,name) VALUES
    (?,?)`;

    mySQLDataBase.execute(
      sqlInsertList,
      [username, listName],
      (error: QueryError | null): void => {
        if (error) {
          response.send('Error');
          console.log(error);
        } else {
          mySQLDataBase.execute(
            'SELECT max(id) as id from lists where username=?',
            username,
            (error: QueryError | null, result: RowDataPacket[]): void => {
              if (error) {
                response.send('Error');
                console.log(error);
              } else response.send(result);
            }
          );
        }
      }
    );
  };
