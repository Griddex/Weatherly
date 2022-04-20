import React from "react";

export interface ITable {
  headers?: string[];
  body?: Record<string, React.Key>[];
}
