/* eslint-disable */
import React, {useState, useEffect} from 'react';

export const NumberFilter = props => {
  const [number, setNumber] = useState('');
  const [comparator, setComparator] = useState('=');
  useEffect(() => {
    if (props.column.filter.props.getFilter) {
      props.column.filter.props.getFilter(filterVal => {
        setNumber('');
        props.onFilter(filterVal);
      });
    }
  }, [props.column.filter.props.getFilter]);

  const filter = (number, comparator) => {
    props.onFilter({
      number,
      comparator,
    });
  };
  const comparatorList = [
    {value: '='},
    {value: '!='},
    {value: '>'},
    {value: '>='},
    {value: '<'},
    {value: '<='},
  ];

  return (
    <>
      <div className='flex-row gap-2 inline'>
        {!/[.,]/.test(number) && (
          <select
            value={comparator}
            className={`leading-4 p-2 focus:outline-none focus:ring shadow-sm text-base border-2 border-gray-300 rounded-md text-black w-12`}
            onChange={e => {
              const comp = e.target.value;
              setComparator(comp);
              filter(number, comp);
            }}
          >
            <option selected>Select</option>
            {comparatorList.map((item: any) => (
              <option key={item.value} value={item.value}>
                {item.value}
              </option>
            ))}
          </select>
        )}
        <input
          type='text'
          placeholder={props.column?.text || 'Enter value...'}
          value={number}
          className='leading-4 p-2 focus:outline-none focus:ring shadow-sm text-base border-2 border-gray-300 rounded-md text-black ml-1'
          onChange={e => {
            const num = e.target.value;
            const re = /^[0-9.,]+$|^$/;
            if (re.test(num)) {
              setNumber(num);
              filter(num, comparator);
            } else {
              setNumber(number);
            }
          }}
        />
      </div>
    </>
  );
};

export const DateFilter = props => {
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [diffFlag, setDiffFlag] = useState<boolean>(false);
  const [comparator, setComparator] = useState('=');
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (props.column.filter.props.getFilter) {
      props.column.filter.props.getFilter(filterVal => {
        setStartDate(null);
        setEndDate(null);
        setDiffFlag(false);
        setComparator('=');
        setToggle(false);
        props.onFilter(filterVal);
      });
    }
  }, [props.column.filter.props.getFilter]);

  const filter = (startDate, endDate, comparator, diffFlag) => {
    props.onFilter({
      startDate,
      endDate,
      comparator,
      diffFlag,
    });
  };
  const comparatorList = [{value: '='}, {value: '>='}, {value: '<'}];

  const triggerToggle = () => {
    setToggle(!toggle);
    setDiffFlag(!diffFlag);
    filter(startDate, endDate, comparator, !diffFlag);
  };

  return (
    <>
      <div className='flex flex-row gap-2 items-center'>
        <span className='text-white text-sm'>{props.column?.text}</span>
        <div
          onClick={triggerToggle}
          className={`wrg-toggle mr-2 ${
            toggle ? `wrg-toggle--checked` : `wrg-toggle`
          }`}
        >
          <div
            className={
              'wrg-toggle-container ' + (toggle ? 'bg-green-700' : 'bg-black')
            }
          >
            <div className='wrg-toggle-check'>
              <span className='text-white ml-1'>Yes</span>
            </div>
            <div className='wrg-toggle-uncheck'>
              <span className='text-white'>No</span>
            </div>
          </div>
          <div
            className={`wrg-toggle-circle ${toggle ? `ml-1` : `mr-1`}  `}
          ></div>
          <input
            type='checkbox'
            aria-label='Toggle Button'
            className='wrg-toggle-input'
          />
        </div>

        {!diffFlag && (
          <select
            value={comparator}
            className={`leading-4 p-2 focus:outline-none focus:ring shadow-sm text-base border-2 border-gray-300 rounded-md text-black w-12`}
            onChange={e => {
              const comp = e.target.value;
              setComparator(comp);
              filter(startDate, endDate, comp, diffFlag);
            }}
          >
            <option selected>Select</option>
            {comparatorList.map((item: any) => (
              <option key={item.value} value={item.value}>
                {item.value}
              </option>
            ))}
          </select>
        )}
        <input
          type='date'
          value={startDate || null}
          onChange={e => {
            const date = e.target.value;
            setStartDate(date);
            filter(date, endDate, comparator, diffFlag);
          }}
          className={`leading-4 p-2 focus:outline-none focus:ring shadow-sm text-base border-2 border-gray-300 rounded-md text-black ml-1 `}
        />
        {diffFlag && (
          <input
            type='date'
            value={endDate || null}
            onChange={e => {
              const date = e.target.value;
              setEndDate(date);
              filter(startDate, date, comparator, diffFlag);
            }}
            className={`leading-4 p-2 focus:outline-none focus:ring shadow-sm text-base border-2 border-gray-300 rounded-md text-black ml-1`}
          />
        )}
      </div>
    </>
  );
};
