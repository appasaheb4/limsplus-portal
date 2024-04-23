import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { MoreHorizontal } from 'react-feather';

import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import BoxCard from './box-card.component';
import BarChart from '../bar-chart.component';

const LineChart = () => {
  const graphData = [
    { name: 'DAYS WISE SALE', graphType: 'Line' },
    { name: 'LABS WISE SALE', graphType: 'Line' },
    { name: 'REGISTRATION LOCATION WISE SALE', graphType: 'Line' },
    { name: 'CORPORATE CLIENT WISE SALE', graphType: 'Line' },
    { name: 'DOCTOR WISE SALE', graphType: 'Line' },
    { name: 'PANEL WISE SALE', graphType: 'Line' },
    { name: 'DEPARTMENT WISE SALE', graphType: 'Line' },
  ];
  const [graphDataState, setGraphDataState] = useState(graphData);

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

  const handleGraphChange = (index, graphType) => {
    const updatedGraphData = [...graphDataState];
    updatedGraphData[index].graphType = graphType;
    setGraphDataState(updatedGraphData);
  };

  return (
    <div className='grid grid-cols-3 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-2 mb-4'>
      {graphDataState.map((item, index) => (
        <Card
          key={index}
          className='flex-fill w-100 dark:bg-boxdark dark:border-2 dark:border-white dark:text-white'
        >
          <CardHeader className='dark:border-b-2 dark:border-white'>
            <div className='card-actions float-right'>
              <div className='flex justify-between gap-4 flex-row'>
                <UncontrolledDropdown>
                  <DropdownToggle tag='a'>
                    <MoreHorizontal />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem
                      onClick={() => handleGraphChange(index, 'Bar')}
                    >
                      See Bar Graph
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => handleGraphChange(index, 'Line')}
                    >
                      See Line Graph
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown className='d-inline mr-2'>
                  <DropdownToggle tag='a'>Today</DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Today</DropdownItem>
                    <DropdownItem>Week</DropdownItem>
                    <DropdownItem>Month</DropdownItem>
                    <DropdownItem>Year</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </div>
            <CardTitle tag='h5' className='mb-0'>
              <span className='dark:text-white'>{item.name}</span>
            </CardTitle>
          </CardHeader>
          <CardBody>
            <div className='chart chart-lg text-white'>
              {item.graphType === 'Bar' ? (
                <BarChart />
              ) : (
                <Line data={data} options={options} />
              )}
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default LineChart;
