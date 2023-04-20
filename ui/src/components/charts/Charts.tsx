import React, { useState } from "react";
import { Chart, GoogleChartWrapperChartType } from "react-google-charts";
import { Select } from "antd";

import { charts } from "../../datasets/charts";

interface Props {
  data: string[] | (string | number)[][];
  title: string;
}

const selectStyle = { width: 200 };

const Charts: React.FC<Props> = ({ data, title }) => {
  const [selectedChart, setSelectedChart] = useState(charts[0]);
  return (
    <>
      <Select
        style={selectStyle}
        options={charts}
        defaultValue={charts[0].value}
        onChange={(selectedChart) => {
          setSelectedChart({
            label: selectedChart,
            value: selectedChart,
          });
        }}
      />
      <Chart
        chartType={selectedChart.value as GoogleChartWrapperChartType}
        data={data}
        options={{
          title,
          legend: { position: "bottom" },
        }}
        width={"100%"}
        height={"600px"}
      />
    </>
  );
};

export default Charts;
