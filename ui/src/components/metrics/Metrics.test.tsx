import { render, screen } from "@testing-library/react";
import "../../matchMedia";

import Metrics from "./Metrics";

describe("Metrics", () => {
  it("renders Metrics component", async () => {
    const updateFormField = jest.fn();
    render(<Metrics updateFormField={updateFormField} />);
    expect(screen.getByText("Result Metrics")).toBeInTheDocument();
    expect(screen.getByText("Metrics")).toBeInTheDocument();
    expect(screen.getByText("Date")).toBeInTheDocument();
  });
});
