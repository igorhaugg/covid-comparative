import { render, screen } from "@testing-library/react";

import Layout from "./Layout";

describe("Layout", () => {
  it("renders Layout with children", async () => {
    render(
      <Layout>
        <div data-testid="children-component">Test</div>
      </Layout>
    );
    expect(screen.getByTestId("children-component")).toBeInTheDocument();
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });
});
