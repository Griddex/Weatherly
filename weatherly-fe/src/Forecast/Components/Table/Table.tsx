/**
 * Displays forecast data in a table
 * Forecast data is paginated by 'Days" component
 */

import React from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import { ITable } from "./Types";

const Table = ({ headers, body }: ITable) => {
  return (
    <table>
      <TableHeader headers={headers} />
      <TableBody body={body} />
    </table>
  );
};

export default Table;
