import { render, screen } from "@testing-library/react";
import "../../matchMedia";

import Charts from "./Charts";

describe("Charts", () => {
  const data = [
    [
      "Date",
      "Europe - Total cases",
      "Europe - New cases",
      "Africa - Total cases",
      "Africa - New cases",
    ],
    ["2023-01-01", 332794, 26, 271217, 0],
    ["2023-01-01", 47751, 0, 105095, 0],
  ];
  const title = "Results (Africa, Europe)";

  it("renders Charts component", async () => {
    render(<Charts data={data} title={title} />);
    expect(screen.getByText("AreaChart")).toBeInTheDocument();
  });
});
