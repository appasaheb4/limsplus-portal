import React from 'react';
import { Bubble } from 'react-chartjs-2';
const BubbleChart = () => {
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const data = {
    datasets: [
      {
        label: 'Red dataset',
        data: Array.from({ length: 50 }, () => ({
          x: getRandomInt(-100, 200),
          y: getRandomInt(-100, 200),
          r: getRandomInt(5, 20),
        })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Blue dataset',
        data: Array.from({ length: 50 }, () => ({
          x: getRandomInt(-100, 200),
          y: getRandomInt(-100, 200),
          r: getRandomInt(5, 20),
        })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  return <Bubble options={options} data={data} />;
};

export default React.memo(BubbleChart);
