import { Request, Response } from 'express';
import { Connection, MysqlError } from 'mysql';

export const updateListName =
  (mySQLDataBase: Connection) => (request: Request, response: Response) => {
    const listID: string = request.body.listID;
    const newName: string = request.body.newName;
    const sqlUpdateListName: string = `UPDATE lists
    SET name=?
    WHERE id=?;`;

    mySQLDataBase.query(
      sqlUpdateListName,
      [newName, listID],
      (error: MysqlError | null): void => {
        if (error) {
          response.send('Error');
          console.log(error);
        }
      }
    );
  };
