import React from "react";
import Chart from "react-apexcharts";

const BarChart = ({ repos }) => {
  const repoLanguages = repos.map(repo => repo.language);
  
  const languageCounts = repoLanguages.reduce((acc, language) => {
    if (language) {
      acc[language] = (acc[language] || 0) + 1;
    }
    return acc;
  }, {});

  const languages = Object.keys(languageCounts);
  const counts = Object.values(languageCounts);

  const series = [
    {
      name: 'Repositories',
      data: counts
    }
  ];

  const options = {
    chart: {
      type: 'bar',
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: languages,
    },
    yaxis: {
      title: {
        text: 'Repositories'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        }
      }
    }
  };

  return (
    <div>
      <h2 className="text-center mb-4">Total Repositories: {repos.length}</h2>
      <Chart options={options} series={series} type="bar" height="350" />
    </div>
  );
};

export default BarChart;
