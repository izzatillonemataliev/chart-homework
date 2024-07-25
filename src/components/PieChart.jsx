import React from "react";
import Chart from "react-apexcharts";

const PieChart = ({ repos, followers, following }) => {
  const series = [repos, followers, following];
  const options = {
    chart: {
      type: 'pie',
    },
    labels: ['Repos', 'Followers', 'Following'],
  };

  return <Chart options={options} series={series} type="pie" width="380" />;
};

export default PieChart;
