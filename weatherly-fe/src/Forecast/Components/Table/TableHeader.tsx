import React from "react";
import { ITable } from "./Types";

const TableHeader = ({ headers }: ITable) => {
  return (
    <thead>
      <tr>
        {headers?.map((h, i) => (
          <th key={i}>{h}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
