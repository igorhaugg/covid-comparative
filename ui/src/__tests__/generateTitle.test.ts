import { generateTitle } from "../utils/generateTitle";

const data = {
  baselineFields: {
    continent: "Africa",
    location: "Algeria",
  },
  comparisonFields: {
    continent: "Asia",
    location: "American Samoa",
  },
};

describe("generateTitle", () => {
  it("returns generated title", () => {
    expect(generateTitle(data.baselineFields, data.comparisonFields)).toEqual(
      "Results (Algeria, Africa, American Samoa, Asia)"
    );
  });
});
