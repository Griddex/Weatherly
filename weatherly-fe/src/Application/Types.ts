import { PayloadAction } from "@reduxjs/toolkit";
import {
  ActionChannelEffect,
  AllEffect,
  CallEffect,
  ForkEffect,
  PutEffect,
  SelectEffect,
  TakeEffect,
} from "redux-saga/effects";

export type TWatchGenerator = Generator<
  ActionChannelEffect | ForkEffect<never>,
  void,
  any
>;

export type TGenerator = Generator<
  | AllEffect<CallEffect<any>>
  | CallEffect<any>
  | TakeEffect
  | PutEffect<{ payload?: any; type: string }>
  | SelectEffect,
  void,
  any
>;

export type TOption = {
  id: number;
  name: string;
  country: string;
  label: string;
  value: string;
};

export type TDimension = { width: string | number; height: string | number };
export type TOrientation = "vertical" | "horizontal";
export type TBody = Record<string, any[]>;

export type TAction<T> = PayloadAction<T>;
