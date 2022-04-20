import { __assign } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { render } from "@testing-library/react";
import { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../Store";
var AllTheProviders = function (_a) {
    var children = _a.children;
    return (_jsx(BrowserRouter, { children: _jsx(Provider, __assign({ store: store }, { children: _jsx(Suspense, __assign({ fallback: _jsx("div", { children: "Loading..." }) }, { children: children })) })) }));
};
var customRender = function (ui, options) { return render(ui, __assign({ wrapper: AllTheProviders }, options)); };
export * from "@testing-library/react";
export { customRender as render };
