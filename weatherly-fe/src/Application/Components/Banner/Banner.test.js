import { render, screen } from "../../Utils/TestUtils";
import Banner from "./Banner";

describe("Banner.tsx", () => {
  it("will be in doc on initial page load", () => {
    render(<Banner />);

    const banner = screen.getByRole("banner");
    expect(banner).toBeInTheDocument();
  });
});
