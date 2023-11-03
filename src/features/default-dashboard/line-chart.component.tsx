import React from 'react';
import { Line } from 'react-chartjs-2';

import { Badge, Card, CardBody, CardHeader, CardTitle } from 'reactstrap';

const LineChart = () => {
  const theme = {
    primary: '#3B82EC',
    secondary: '#495057',
    tertiary: '#0069fc',
    success: '#4BBF73',
    info: '#1F9BCF',
    warning: '#f0ad4e',
    danger: '#d9534f',
  };
  const data = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        label: 'Sales ($)',
        fill: true,
        backgroundColor: 'transparent',
        borderColor: theme.primary,
        data: [
          2015, 1465, 1487, 1796, 1387, 2123, 2866, 2548, 3902, 4938, 3917,
          4927,
        ],
      },
      {
        label: 'Orders',
        fill: true,
        backgroundColor: 'transparent',
        borderColor: theme.tertiary,
        borderDash: [4, 4],
        data: [
          928, 734, 626, 893, 921, 1202, 1396, 1232, 1524, 2102, 1506, 1887,
        ],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      intersect: false,
    },
    hover: {
      intersect: true,
    },
    labels: {
      fontColor: ['#ffffff'],
      show: false,
    },

    plugins: {
      filler: {
        propagate: false,
      },
    },
    scales: {
      xAxes: [
        {
          reverse: true,
          gridLines: {
            color: 'rgba(0,0,0,0.05)',
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            stepSize: 500,
          },
          display: true,
          borderDash: [5, 5],
          gridLines: {
            color: 'rgba(0,0,0,0)',
            fontColor: '#fff',
          },
        },
      ],
    },
  };

  return (
    <Card className='flex-fill w-100 dark:bg-boxdark dark:border-2 dark:border-white dark:text-white'>
      <CardHeader className='dark:border-b-2 dark:border-white'>
        <Badge color='primary' className='float-right'>
          Monthly
        </Badge>
        <CardTitle tag='h5' className='mb-0'>
          <span className='dark:text-white'>Total Revenue</span>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <div className='chart chart-lg text-white'>
          <Line data={data} options={options} />
        </div>
      </CardBody>
    </Card>
  );
};

export default LineChart;
