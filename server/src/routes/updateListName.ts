import { Request, Response } from 'express';
import { Pool } from 'mysql2';
import { QueryError } from 'mysql2/typings/mysql/lib/protocol/sequences/Query';

export const updateListName =
  (mySQLDataBase: Pool) => (request: Request, response: Response) => {
    const listID: string = request.body.listID;
    const newName: string = request.body.newName;
    const sqlUpdateListName: string = `UPDATE lists
    SET name=?
    WHERE id=?;`;

    mySQLDataBase.execute(
      sqlUpdateListName,
      [newName, listID],
      (error: QueryError | null): void => {
        if (error) {
          response.send('Error');
          console.log(error);
        }
      }
    );
  };
