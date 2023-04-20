import React, { useState } from "react";
import { Alert, Button, Card, Form, Space } from "antd";

import Filters from "./components/filters/Filters";
import Charts from "./components/charts/Charts";
import Metrics from "./components/metrics/Metrics";
import CustomLayout from "./components/layout/Layout";

import { onSearch } from "./services/onSearch";
import { dates } from "./datasets/dates";
import { Fields, FormUpdate, FieldsType, ValuesType } from "./types";
import { generateTitle } from "./utils/generateTitle";

const App: React.FC = () => {
  const [form] = Form.useForm();

  // application state
  const [baselineFields, setBaselineFields] = useState<Fields | {}>({});
  const [comparisonFields, setComparisonFields] = useState<Fields | {}>({});
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(dates[0].value);
  const [title, setTitle] = useState<string>("");
  const [limit, setLimit] = useState<number>(100);
  const [data, setData] = useState<string[] | (string | number)[][]>([]);

  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Update state with selected values
  const updateFormField = ({ field, value, type }: FormUpdate) => {
    if (type === FieldsType.BASELINE) {
      setBaselineFields({
        ...baselineFields,
        [field]: value,
      });
    }
    if (type === FieldsType.COMPARISON) {
      setComparisonFields({
        ...comparisonFields,
        [field]: value,
      });
    }
    if (type === FieldsType.DATE && typeof value === "string") {
      setSelectedDate(value);
    }
    if (
      type === FieldsType.METRICS &&
      typeof value != "string" &&
      typeof value != "number"
    ) {
      setSelectedMetrics(value);
    }
    if (type === FieldsType.LIMIT && typeof value === "number") {
      setLimit(value);
    }
  };

  // Move to loading state and reset fields
  const onStartSubmitting = (): void => {
    setIsLoading(true);
    setData([]);
    setError("");
  };

  // Calls submit service with all the selected data
  const onSubmit = async () => {
    try {
      const result =
        (await onSearch({
          baselineFields,
          comparisonFields,
          selectedDate,
          selectedMetrics,
          limit,
        } as ValuesType)) || [];
      // Has more than 1 line of data (1st position is the column definition)
      if (result.length > 1) {
        setData(result);
      } else {
        throw Error("Data not found!");
      }
    } catch (error) {
      let message = "Data not found!";
      if (error instanceof Error) {
        message = error.message;
      }
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CustomLayout>
      <Form
        layout="vertical"
        form={form}
        initialValues={{ layout: "inline" }}
        onFinish={() => {
          onStartSubmitting();
          setTitle(generateTitle(baselineFields, comparisonFields));
          onSubmit();
        }}
      >
        <Space
          direction="vertical"
          style={{ display: "flex", width: "100%" }}
          size="middle"
        >
          <Filters
            title="Baseline"
            updateFormField={(props) =>
              updateFormField({ ...props, type: FieldsType.BASELINE })
            }
          />
          <Space direction="vertical" style={{ display: "flex" }} size="middle">
            <Filters
              title="Comparison"
              updateFormField={(props) =>
                updateFormField({ ...props, type: FieldsType.COMPARISON })
              }
            />
          </Space>
          <Space direction="vertical" style={{ display: "flex" }} size="middle">
            <Metrics updateFormField={(props) => updateFormField(props)} />
            {error && <Alert message={error} type="error" />}
            <Form.Item>
              <Button htmlType="submit" type="primary">
                Search
              </Button>
            </Form.Item>
          </Space>
        </Space>
      </Form>
      {isLoading && <div>Loading ...</div>}
      {data?.length > 1 && (
        <Card title="Charts" size="small">
          <Space direction="vertical" style={{ display: "flex" }} size="middle">
            <Charts data={data} title={title} />
          </Space>
        </Card>
      )}
    </CustomLayout>
  );
};

export default App;
