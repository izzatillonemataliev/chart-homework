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
      background: 'transparent',
      toolbar: {
        show: false
      }
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
      labels: {
        style: {
          colors: ['#ffffff'],
          fontSize: '12px'
        }
      },
    },
    yaxis: {
      title: {
        text: 'Repositories',
        style: {
          color: '#ffffff',
          fontSize: '14px'
        }
      },
      labels: {
        style: {
          colors: ['#ffffff'],
          fontSize: '12px'
        }
      }
    },
    fill: {
      opacity: 1,
      colors: ['#00E396']
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: function (val) {
          return val;
        }
      }
    },
    grid: {
      borderColor: '#40475D'
    },
    title: {
      text: 'Repositories by Language',
      align: 'center',
      style: {
        color: '#ffffff',
        fontSize: '20px'
      }
    }
  };

  return (
    <div>
      <h2 className="text-center mb-4 text-white">Total Repositories: {repos.length}</h2>
      <Chart options={options} series={series} type="bar" height="350" />
    </div>
  );
};

export default BarChart;
