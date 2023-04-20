import React from "react";
import { Card, Form, InputNumber, Select, Space } from "antd";

import { metrics } from "../../datasets/metrics";
import { dates } from "../../datasets/dates";
import { FieldsType } from "../../types";

interface Props {
  updateFormField: ({
    field,
    value,
    type,
  }: {
    field: string;
    value: string | string[] | number;
    type: FieldsType;
  }) => void;
}

const selectStyle = { width: 200 };

const Metrics: React.FC<Props> = ({ updateFormField }) => {
  return (
    <Card title="Metrics" size="small">
      <Form.Item label="Result Metrics">
        <Select
          mode="multiple"
          placeholder="Select metrics to filter"
          optionFilterProp="children"
          onChange={(value: string[]) => {
            updateFormField({
              field: "metric",
              value,
              type: FieldsType.METRICS,
            });
          }}
          optionLabelProp="label"
          style={{ maxWidth: 416 }}
        >
          <>
            {metrics.map((metric: string) => {
              return (
                <Select.Option value={metric} label={metric} key={metric}>
                  <Space>{metric}</Space>
                </Select.Option>
              );
            })}
          </>
        </Select>
      </Form.Item>
      <Space direction="horizontal" size="middle">
        <Form.Item label="Date">
          <Select
            style={selectStyle}
            options={dates}
            defaultValue={dates[0].value}
            onChange={(date) => {
              updateFormField({
                field: "date",
                value: date,
                type: FieldsType.DATE,
              });
            }}
          />
        </Form.Item>
        <Form.Item label="Limit">
          <InputNumber
            min={1}
            max={500}
            defaultValue={100}
            onChange={(value) => {
              updateFormField({
                field: "limit",
                value: value || 100,
                type: FieldsType.LIMIT,
              });
            }}
          />
        </Form.Item>
      </Space>
    </Card>
  );
};

export default Metrics;
