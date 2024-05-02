import React from 'react';
import { Scatter } from 'react-chartjs-2';

const ScatterChart = () => {
  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  const data = {
    datasets: [
      {
        label: 'A dataset',
        data: Array.from({ length: 100 }, () => ({
          x: getRandomInt(100, 200),
          y: getRandomInt(100, 200),
        })),
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
      {
        label: 'B dataset',
        data: Array.from({ length: 100 }, () => ({
          x: getRandomInt(200, 100),
          y: getRandomInt(500, 800),
        })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  return <Scatter options={options} data={data} />;
};

export default React.memo(ScatterChart);
