import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "../../matchMedia";
import Filters from "./Filters";

describe("Filters", () => {
  it("renders Filter component (can update continent)", async () => {
    const updateFormField = jest.fn();
    render(<Filters title="my filter" updateFormField={updateFormField} />);
    expect(screen.getByText("my filter")).toBeInTheDocument();
    expect(screen.getByText("Continent")).toBeInTheDocument();
    expect(screen.getByText("Country")).toBeInTheDocument();

    const selectors = screen.getAllByRole("combobox");
    userEvent.click(selectors[0]);

    const selectedContinent = await screen.findAllByText("Europe");
    userEvent.click(selectedContinent[0]);

    expect(updateFormField).toBeCalledWith({
      field: "continent",
      value: "Europe",
    });
  });
});
