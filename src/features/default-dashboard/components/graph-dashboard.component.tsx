import React, { useMemo, useState } from 'react';
import BoxCard from './box-card.component';
import BarChart from '../bar-chart.component';
import PieChart from './pie-chart.component';
import PolorChart from './polor-area.component';
import RadarChart from './radar-chart.omponenet';
import ScatterChart from './scatter-chart.component';
import BubbleChart from './bubble-chart.component';
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
import LineChart from './line-chart.component';

const GraphDashboard = () => {
  const [graphDataState, setGraphDataState] = useState([
    { name: 'DAYS WISE SALE', graphType: 'Line', filter: 'Today' },
    { name: 'LABS WISE SALE', graphType: 'Line', filter: 'Today' },
    {
      name: 'REGISTRATION LOCATION WISE SALE',
      graphType: 'Line',
      filter: 'Today',
    },
    { name: 'CORPORATE CLIENT WISE SALE', graphType: 'Line', filter: 'Today' },
    { name: 'DOCTOR WISE SALE', graphType: 'Line', filter: 'Today' },
    { name: 'PANEL WISE SALE', graphType: 'Line', filter: 'Today' },
    { name: 'DEPARTMENT WISE SALE', graphType: 'Line', filter: 'Today' },
  ]);

  const handleGraphChange = useMemo(
    () => (index, graphType) => {
      setGraphDataState(prevState => {
        return prevState.map((item, i) => {
          if (i === index) {
            return { ...item, graphType: graphType };
          }
          return item;
        });
      });
    },
    [],
  );

  const handleFilterValue = useMemo(
    () => (index, filterValue) => {
      setGraphDataState(prevState => {
        return prevState.map((item, i) => {
          if (i === index) {
            return { ...item, filter: filterValue };
          }
          return item;
        });
      });
    },
    [],
  );

  const renderChart = useMemo(() => {
    const chartRenderer = item => {
      switch (item) {
        case 'Bar':
          return <BarChart />;
        case 'Pie':
          return <PieChart />;
        case 'Polor':
          return <PolorChart />;
        case 'Radar':
          return <RadarChart />;
        case 'Scatter':
          return <ScatterChart />;
        case 'Bubble':
          return <BubbleChart />;
        default:
          return <LineChart />;
      }
    };
    return chartRenderer;
  }, []);

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
                    <DropdownItem
                      onClick={() => handleGraphChange(index, 'Pie')}
                    >
                      Pie Chart
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => handleGraphChange(index, 'Polor')}
                    >
                      Polor Chart
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => handleGraphChange(index, 'Radar')}
                    >
                      Radar Chart
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => handleGraphChange(index, 'Scatter')}
                    >
                      Scatter Chart
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => handleGraphChange(index, 'Bubble')}
                    >
                      Bubble Chart
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown className='d-inline mr-2'>
                  <DropdownToggle tag='a'>{item.filter}</DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem
                      onClick={() => handleFilterValue(index, 'Today')}
                    >
                      Today
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => handleFilterValue(index, 'Week')}
                    >
                      Week
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => handleFilterValue(index, 'Month')}
                    >
                      Month
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => handleFilterValue(index, 'Year')}
                    >
                      Year
                    </DropdownItem>
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
              {renderChart(item.graphType)}
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default React.memo(GraphDashboard);
