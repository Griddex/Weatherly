import React from "react";
import { ITable } from "./Types";

const TableBody = ({ body }: ITable) => {
  return (
    <tbody>
      {body?.map((row, i) => (
        <tr key={i}>
          {Object.entries(row).map((b, i) => (
            <td key={i}>{b[1].toString()}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
