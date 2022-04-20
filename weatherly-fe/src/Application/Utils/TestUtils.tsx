import { render, RenderOptions } from "@testing-library/react";
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../Store";

interface IAllTheProviders {
  children: React.ReactNode;
}

const AllTheProviders = ({ children }: IAllTheProviders) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </Provider>
    </BrowserRouter>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
