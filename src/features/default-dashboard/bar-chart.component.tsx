import React from 'react';
import { Bar } from 'react-chartjs-2';

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';

import { MoreHorizontal } from 'react-feather';

const BarChart = () => {
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
        label: 'Last year',
        backgroundColor: theme.primary,
        borderColor: theme.primary,
        hoverBackgroundColor: theme.primary,
        hoverBorderColor: theme.primary,
        data: [54, 67, 41, 55, 62, 45, 55, 73, 60, 76, 48, 79],
        barPercentage: 0.75,
        categoryPercentage: 0.5,
      },
      {
        label: 'This year',
        backgroundColor: '#E8EAED',
        borderColor: '#E8EAED',
        hoverBackgroundColor: '#E8EAED',
        hoverBorderColor: '#E8EAED',
        data: [69, 66, 24, 48, 52, 51, 44, 53, 62, 79, 51, 68],
        barPercentage: 0.75,
        categoryPercentage: 0.5,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          stacked: false,
          ticks: {
            stepSize: 20,
          },
        },
      ],
      xAxes: [
        {
          stacked: false,
          gridLines: {
            color: 'transparent',
          },
        },
      ],
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
