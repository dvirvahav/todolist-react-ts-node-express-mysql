import { Request, Response } from 'express';
import { Connection, FieldInfo, MysqlError } from 'mysql';

export const insertList =
  (mySQLDataBase: Connection) => (request: Request, response: Response) => {
    const listName: string = request.body.listName;
    const username: string = request.body.username;
    const sqlInsertList: string = `INSERT INTO lists (username,name) VALUES
    (?,?)`;

    mySQLDataBase.query(
      sqlInsertList,
      [username, listName],
      (error: MysqlError | null): void => {
        if (error) {
          response.send('Error');
          console.log(error);
        } else {
          mySQLDataBase.query(
            'SELECT max(id) as id from lists where username=?',
            username,
            (error: MysqlError | null, result: FieldInfo[]): void => {
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
