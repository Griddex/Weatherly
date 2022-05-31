import { render, screen, cleanup } from "../../Utils/TestUtils";
import Banner from "./Banner";

beforeEach(() => {
  render(<Banner />);
});

afterEach(cleanup);

describe("Banner.tsx", () => {
  it("will be in doc on initial page load", async () => {
    const banner = await screen.findByRole("banner");
    expect(banner).toBeInTheDocument();
  });

  it("will render with app's title", async () => {
    const banner = await screen.findByRole("banner");
    expect(banner).toHaveTextContent("Weatherly.IO");
  });
});
