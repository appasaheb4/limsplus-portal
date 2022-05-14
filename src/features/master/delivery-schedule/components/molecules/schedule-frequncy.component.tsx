/* eslint-disable */
import React, {useState} from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';

import dayjs from 'dayjs';
import {Form} from '@/library/components';

interface ScheduleFrequencyProps {
  type: string;
  onChnage?: (value: any) => void;
}

export const ScheduleFrequency = ({type, onChnage}: ScheduleFrequencyProps) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const [weekly, setWeekly] = useState<any[]>([
    {day: 'Sun', units: '', value: '', selected: false},
    {day: 'Mon', units: '', value: '', selected: false},
    {day: 'Tue', units: '', value: '', selected: false},
    {day: 'Wed', units: '', value: '', selected: false},
    {day: 'Thu', units: '', value: '', selected: false},
    {day: 'Fry', units: '', value: '', selected: false},
    {day: 'Sat', units: '', value: '', selected: false},
  ]);
  const [monthly, setMonthly] = useState<any[]>([
    {
      weekly: '1st Weekly',
      days: [
        {day: 'Sun', units: '', value: '', selected: false},
        {day: 'Mon', units: '', value: '', selected: false},
        {day: 'Tue', units: '', value: '', selected: false},
        {day: 'Wed', units: '', value: '', selected: false},
        {day: 'Thu', units: '', value: '', selected: false},
        {day: 'Fry', units: '', value: '', selected: false},
        {day: 'Sat', units: '', value: '', selected: false},
      ],
    },
    {
      weekly: '2nd Weekly',
      days: [
        {day: 'Sun', units: '', value: '', selected: false},
        {day: 'Mon', units: '', value: '', selected: false},
        {day: 'Tue', units: '', value: '', selected: false},
        {day: 'Wed', units: '', value: '', selected: false},
        {day: 'Thu', units: '', value: '', selected: false},
        {day: 'Fry', units: '', value: '', selected: false},
        {day: 'Sat', units: '', value: '', selected: false},
      ],
    },
    {
      weekly: '3rd Weekly',
      days: [
        {day: 'Sun', units: '', value: '', selected: false},
        {day: 'Mon', units: '', value: '', selected: false},
        {day: 'Tue', units: '', value: '', selected: false},
        {day: 'Wed', units: '', value: '', selected: false},
        {day: 'Thu', units: '', value: '', selected: false},
        {day: 'Fry', units: '', value: '', selected: false},
        {day: 'Sat', units: '', value: '', selected: false},
      ],
    },
    {
      weekly: '4th Weekly',
      days: [
        {day: 'Sun', units: '', value: '', selected: false},
        {day: 'Mon', units: '', value: '', selected: false},
        {day: 'Tue', units: '', value: '', selected: false},
        {day: 'Wed', units: '', value: '', selected: false},
        {day: 'Thu', units: '', value: '', selected: false},
        {day: 'Fry', units: '', value: '', selected: false},
        {day: 'Sat', units: '', value: '', selected: false},
      ],
    },
  ]);
  const [monthlyDate, setMonthlyDate] = useState<number>();
  const [monthlyDateValue, setMonthlyDateValue] = useState<number>();
  const [monthlyUnits, setMonthlyUnits] = useState<string>();

  const [result, setResult] = useState<any[]>([
    {title: 'First Intrim', units: '', value: '', selected: false},
    {title: 'Second Intrim', units: '', value: '', selected: false},
    {title: 'Third Intrim', units: '', value: '', selected: false},
    {title: 'Final', units: '', value: '', selected: false},
    {title: 'Negative', units: '', value: '', selected: false},
    {title: 'Positive', units: '', value: '', selected: false},
  ]);
  const [batch1StartTime, setBatch1StartTime] = useState<string>();
  const [batch1EndTime, setBatch1EndTime] = useState<string>();
  const [batch2StartTime, setBatch2StartTime] = useState<string>();
  const [batch2Units, setBatch2Units] = useState<string>();
  const [batch2Value, setBatch2Value] = useState<number>();

  const onChangeWeeklyItem = (item, index) => {
    if (item.value === '' || item.units === '')
      return alert('Please enter value and units');
    weekly[index].selected = !weekly[index].selected;
    setWeekly(JSON.parse(JSON.stringify(weekly)));
    onChnage &&
      onChnage(
        weekly.filter(item => {
          return item.selected === true;
        }),
      );
  };

  const onChangeMonthlyItems = (item, index, days, i) => {
    if (item.days[i].value === '' || item.days[i].units === '')
      return alert('Please enter value and units');
    monthly[index].days[i].selected = !monthly[index].days[i].selected;
    setMonthly(JSON.parse(JSON.stringify(monthly)));
    let monthlyItems: any[] = [];
    monthly.filter((item, index) => {
      const daysItems: any[] = [];
      item.days.filter(days => {
        if (days.selected === true) {
          daysItems.push(days);
          item = {...item, days: daysItems};
          monthlyItems.push(item);
        }
      });
    });
    monthlyItems = _.uniqBy(monthlyItems, function (e) {
      return e.weekly;
    });
    onChnage && onChnage(monthlyItems);
  };

  const onChangeResultItem = (item, index) => {
    if (item.value === '' || item.units === '')
      return alert('Please enter value and units');
    result[index].selected = !result[index].selected;
    setWeekly(JSON.parse(JSON.stringify(result)));
    onChnage &&
      onChnage(
        result.filter(item => {
          return item.selected === true;
        }),
      );
  };

  return (
    <>
      {(type === 'MINUTES' || type === 'HOURS' || type === 'DAY') && (
        <Form.Input
          label='Value'
          placeholder='Value'
          onChange={schduleFrequncy => {
            onChnage && onChnage(schduleFrequncy);
          }}
        />
      )}
      {type === 'WEEKLY' && (
        <Form.InputWrapper label='Schdule Frequnecy'>
          <ul className='rounded-lg shadow-xl p-2'>
            {weekly?.map((item: any, index: number) => (
              <li
                key={index}
                value={item}
                className='inline-flex items-center ml-1 mb-2'
              >
                <input
                  type='checkbox'
                  name={item.day}
                  value={item.day}
                  checked={item.selected}
                  onChange={() => onChangeWeeklyItem(item, index)}
                />
                <h6 className='ml-2 mr-2 items-center'> {`  ${item.day}  `}</h6>
                <input
                  type='number'
                  placeholder='Value'
                  onChange={e => {
                    const value = e.target.value;
                    weekly[index].value = value;
                    setWeekly(weekly);
                  }}
                  className='leading-4 p-2 focus:outline-none focus:ring block  shadow-sm sm:text-base border border-gray-300 rounded-md mr-1'
                />
                <select
                  className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                  onChange={e => {
                    const units = e.target.value as string;
                    weekly[index].units = units;
                    setWeekly(weekly);
                  }}
                >
                  <option selected>Units</option>
                  {['MINUTES', 'HOURS', 'DAY'].map(
                    (items: any, index: number) => (
                      <option key={index} value={items}>
                        {items}
                      </option>
                    ),
                  )}
                </select>
              </li>
            ))}
          </ul>
        </Form.InputWrapper>
      )}
      {type === 'MONTHLY' && (
        <Form.InputWrapper label='Schdule Frequnecy'>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({active: activeTab === '1'})}
                onClick={() => {
                  toggle('1');
                }}
              >
                Weekly
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({active: activeTab === '2'})}
                onClick={() => {
                  toggle('2');
                }}
              >
                Date Picker
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activeTab}>
            <TabPane tabId='1'>
              <ul className='inline-flex'>
                {monthly.map((item, index) => (
                  <li key={index} className='ml-2'>
                    <h5 className='text-center font-bold mb-2'>
                      {item.weekly}
                    </h5>
                    <ul>
                      {item.days.map((days, i) => (
                        <li
                          key={i}
                          className='inline-flex flex-col items-center ml-1 mb-2'
                        >
                          <input
                            type='checkbox'
                            name={days.day}
                            value={days.day}
                            checked={days.selected}
                            onChange={() =>
                              onChangeMonthlyItems(item, index, days, i)
                            }
                          />
                          <h6 className='ml-2 mr-2 items-center'>
                            {' '}
                            {`  ${days.day}  `}
                          </h6>
                          <input
                            type='number'
                            placeholder='Value'
                            onChange={e => {
                              const value = e.target.value;
                              monthly[index].days[i].value = value;
                              setMonthly(monthly);
                            }}
                            className='leading-4 p-1  focus:outline-none focus:ring block  shadow-sm sm:text-base border border-gray-300 rounded-md w-full'
                          />
                          <div className='mb-2' />
                          <select
                            className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                            onChange={e => {
                              const units = e.target.value as string;
                              monthly[index].days[i].units = units;
                              setMonthly(monthly);
                            }}
                          >
                            <option selected>Units</option>
                            {['MINUTES', 'HOURS', 'DAY'].map(
                              (items: any, index: number) => (
                                <option key={index} value={items}>
                                  {items}
                                </option>
                              ),
                            )}
                          </select>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </TabPane>
            <TabPane tabId='2'>
              <>
                <Form.InputDate
                  label='Date'
                  placeholder='Date'
                  onChange={e => {
                    const schedule = new Date(e.target.value);
                    setMonthlyDate(dayjs(schedule).unix());
                    onChnage &&
                      onChnage({
                        value: monthlyDateValue,
                        date: dayjs(schedule).unix(),
                        units: monthlyUnits,
                      });
                  }}
                />
                <Form.Input
                  placeholder='Value'
                  value={monthlyDateValue}
                  onChange={value => {
                    setMonthlyDateValue(value);
                    onChnage &&
                      onChnage({
                        value: value,
                        date: monthlyDate,
                        units: monthlyUnits,
                      });
                  }}
                />
                <div className='mb-2' />
                <select
                  className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                  onChange={e => {
                    const units = e.target.value as string;
                    setMonthlyUnits(units);
                    onChnage &&
                      onChnage({
                        value: monthlyDateValue,
                        date: monthlyDate,
                        units: units,
                      });
                  }}
                >
                  <option selected>Units</option>
                  {['MINUTES', 'HOURS', 'DAY'].map(
                    (items: any, index: number) => (
                      <option key={index} value={items}>
                        {items}
                      </option>
                    ),
                  )}
                </select>
              </>
            </TabPane>
          </TabContent>
        </Form.InputWrapper>
      )}
      {type === 'RESULT' && (
        <Form.InputWrapper label='Schdule Frequnecy'>
          <ul className='rounded-lg shadow-xl p-2'>
            {result?.map((item: any, index: number) => (
              <li
                key={index}
                value={item}
                className='inline-flex flex-col items-center ml-1 mb-2'
              >
                <input
                  type='checkbox'
                  name={item.title}
                  value={item.title}
                  checked={item.selected}
                  onChange={() => onChangeResultItem(item, index)}
                />
                <h6 className='ml-2 mr-2 items-center'>
                  {' '}
                  {`  ${item.title}  `}
                </h6>
                <input
                  type='number'
                  placeholder='Value'
                  onChange={e => {
                    const value = e.target.value;
                    result[index].value = value;
                    setResult(result);
                  }}
                  className='leading-4 p-2 focus:outline-none focus:ring block  shadow-sm sm:text-base border border-gray-300 rounded-md mr-1'
                />
                <div className='mb-2' />
                <select
                  className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
                  onChange={e => {
                    const units = e.target.value as string;
                    result[index].units = units;
                    setResult(result);
                  }}
                >
                  <option selected>Units</option>
                  {['MINUTES', 'HOURS', 'DAY'].map(
                    (items: any, index: number) => (
                      <option key={index} value={items}>
                        {items}
                      </option>
                    ),
                  )}
                </select>
              </li>
            ))}
          </ul>
        </Form.InputWrapper>
      )}
      {type === 'BATCH1' && (
        <Form.InputWrapper label='Schdule Frequnecy'>
          <Form.Clock
            label='Start Time'
            onChange={startTime => {
              setBatch1StartTime(startTime);
              onChnage &&
                onChnage({
                  startTime: startTime,
                  endtime: batch1EndTime,
                });
            }}
          />
          <div className='mb-2' />
          {batch1StartTime && (
            <Form.Clock
              label='End Time'
              onChange={endTime => {
                setBatch1EndTime(endTime);
                onChnage &&
                  onChnage({
                    startTime: batch1StartTime,
                    endtime: endTime,
                  });
              }}
            />
          )}
        </Form.InputWrapper>
      )}
      {type === 'BATCH2' && (
        <Form.InputWrapper label='Schdule Frequnecy'>
          <Form.Clock
            label='Start Time'
            onChange={startTime => {
              setBatch2StartTime(startTime);
              onChnage &&
                onChnage({
                  startTime: startTime,
                  units: batch2Units,
                  value: batch2Value,
                });
            }}
          />
          <div className='mb-2' />
          <Form.Input
            type='number'
            placeholder='Value'
            onChange={value => {
              setBatch2Value(value);
              onChnage &&
                onChnage({
                  startTime: batch2StartTime,
                  units: batch2Units,
                  value,
                });
            }}
          />
          <div className='mb-2' />
          <Form.InputWrapper label='Units'>
            <select
              className='leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md'
              onChange={e => {
                const units = e.target.value as string;
                setBatch2Units(units);
                onChnage &&
                  onChnage({
                    startTime: batch2StartTime,
                    units: units,
                    value: batch2Value,
                  });
              }}
            >
              <option selected>Select</option>
              {['MINUTES', 'HOURS', 'DAY'].map((item: any, index: number) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </Form.InputWrapper>
        </Form.InputWrapper>
      )}
    </>
  );
};
