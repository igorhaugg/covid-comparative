import React from "react";
import { Card, Form, Select, Space } from "antd";

import { continents } from "../../datasets/continents";
import { countries } from "../../datasets/countries";
import { generateFilterOptions } from "../../utils/generateFilterOptions";

interface Props {
  title: string;
  updateFormField: ({ field, value }: { field: string; value: string }) => void;
}

const selectStyle = { minWidth: 200 };

const handleSortFilter = (
  optionA: { label: string; value: string },
  optionB: { label: string; value: string }
) => {
  return (optionA?.label ?? "")
    .toLowerCase()
    .localeCompare((optionB?.label ?? "").toLowerCase());
};

const handleFilterOption = (
  input: string,
  option: { label: string; value: string } | undefined
) => {
  return (option?.label?.toLowerCase() ?? "").includes(input.toLowerCase());
};

const Filters: React.FC<Props> = ({ title, updateFormField }) => {
  return (
    <Card title={title} size="small" headStyle={{ display: "flex" }}>
      <Space direction="horizontal" size="middle" wrap={true}>
        <Form.Item label="Continent">
          <Select
            showSearch
            style={selectStyle}
            placeholder="Search a continent"
            optionFilterProp="children"
            filterOption={handleFilterOption}
            filterSort={handleSortFilter}
            options={generateFilterOptions(continents)}
            onChange={(continent) => {
              updateFormField({ field: "continent", value: continent });
            }}
          />
        </Form.Item>
        <Form.Item label="Country">
          <Select
            showSearch
            style={selectStyle}
            placeholder="Search a country"
            optionFilterProp="children"
            filterOption={handleFilterOption}
            filterSort={handleSortFilter}
            options={generateFilterOptions(countries)}
            onChange={(country) => {
              updateFormField({ field: "location", value: country });
            }}
          />
        </Form.Item>
      </Space>
    </Card>
  );
};

export default Filters;
