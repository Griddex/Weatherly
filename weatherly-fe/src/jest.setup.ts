import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { server } from "./Application/Mocks/MSW/server";
// import "@types/jest";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
