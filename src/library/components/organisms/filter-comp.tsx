/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import { Form, Toast } from '..';
import { Container } from 'reactstrap';
import { stores } from '@/stores';
import * as Assets from '@/library/assets';
import { CiSearch } from 'react-icons/ci';

// export const textFilter = props => {
//   const filter = value => {
//     props.onFilter({
//       value,
//     });
//   };

//   useEffect(() => {
//     if (props.column.filter.props.getFilter) {
//       props.column.filter.props.getFilter(filterVal => {
//         props.onFilter(filterVal);
//       });
//     }
//   }, [props.column.filter.props.getFilter]);
//   return (
//     <>
//       <div className='flex-row gap-2 inline'>
//         <input
//           type='text'
//           placeholder={props.column?.text || 'Enter value...'}
//           className='leading-4 p-2 focus:outline-none focus:ring shadow-sm text-base border-2 border-gray-300 rounded-md text-black ml-1'
//           onChange={e => {
//             const value = e.target.value;
//             filter(value);
//           }}
//         />
//       </div>
//     </>
//   );
// };

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
    { value: '=' },
    { value: '!=' },
    { value: '>' },
    { value: '>=' },
    { value: '<' },
    { value: '<=' },
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
  const comparatorList = [{ value: '=' }, { value: '>=' }, { value: '<' }];

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

        {props.isStatus && (
          <div>
            <select
              className={
                'leading-4 p-2 focus:outline-none focus:ring block w-38 shadow-sm sm:text-base border-2  rounded-md text-black'
              }
              onChange={e => {
                const status = e.target.value;
                props.onStatus && props.onStatus(status);
              }}
            >
              <option selected>{'Select'}</option>
              {['Active'].map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        )}

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

export const DateRangeFilter = props => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [datesFilled, setDatesFilled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [diffFlag, setDiffFlag] = useState<boolean>(false);
  const [comparator, setComparator] = useState('=');
  const [selectDateTimePicker, setDateTimePicker] = useState<boolean>(false);

  useEffect(() => {
    if (props.column.filter.props.getFilter) {
      props.column.filter.props.getFilter(filterVal => {
        setStartDate(null);
        setEndDate(null);
        setDiffFlag(false);
        setComparator('=');
        props.onFilter(filterVal);
      });
    }
  }, [props.column.filter.props.getFilter]);

  const filter = () => {
    props.onFilter({
      startDate,
      endDate,
      comparator,
      diffFlag,
    });
  };
  const handleStartDateChange = e => {
    const date = e.target.value;
    if (endDate && date > endDate) {
      Toast.error({ message: 'From date cannot be less than to date' });
      return;
    }
    setStartDate(date);
    if (!endDate) {
      setEndDate(date);
    }
    setDatesFilled(!!date);
  };

  const handleEndDateChange = e => {
    const date = e.target.value;
    if (startDate && date < startDate) {
      Toast.error({ message: 'End date cannot be less than start date' });
      return;
    }
    setEndDate(date);
    setDatesFilled(!!startDate && !!date);
  };

  const triggerToggle = () => {
    setDateTimePicker(!selectDateTimePicker);
    if (selectDateTimePicker) {
      setStartDate(startDate ? startDate.split('T')[0] : null);
      setEndDate(endDate ? endDate.split('T')[0] : null);
    }
  };

  return (
    <>
      <div className='flex flex-row gap-2'>
        <span className='text-white text-sm'>{props.column?.text}</span>
        <CiSearch onClick={() => setShowModal(true)} size={20} />
      </div>
      <Container>
        {showModal && (
          <>
            <div
              className='justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none z-50'
              style={{ top: '170px' }}
            >
              <div className='relative w-auto my-6 mx-auto max-w-3xl '>
                <div
                  className={`border-0 rounded-lg shadow-lg relative flex flex-col w-full ${
                    stores.appStore.applicationSetting.theme === 'dark'
                      ? 'dark:bg-boxdark'
                      : 'bg-white'
                  }  outline-none focus:outline-none`}
                >
                  <div>
                    <button
                      className='p-1  border-0 text-black opacity-1 ml-6 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                      onClick={() => setShowModal(false)}
                    >
                      <span className=' text-black h-6 w-6 text-2xl block outline-none focus:outline-none'>
                        ×
                      </span>
                    </button>
                  </div>
                  <div className='flex  flex-col  items-center justify-between p-2 border-b border-solid border-gray-300 rounded-t'>
                    <div className='items-center justify-center flex mb-2'>
                      <img
                        src={
                          stores.appStore.applicationSetting.theme === 'dark'
                            ? Assets.images.limsplusTran
                            : Assets.images.linplusLogo
                        }
                        className='img-fluid'
                        style={{
                          width: '200px',
                          height: '122px',
                          marginTop: '-40px',
                        }}
                        alt='lims plus'
                      />
                    </div>
                    <div>
                      <div className='items-center justify-center flex'>
                        <span className='text-2xl dark:text-white text-black'>
                          Date Range Picker
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className='relative p-2 flex flex-row gap-2'>
                    <div className='flex flex-col w-50'>
                      <span className='dark:text-white text-black text-sm'>
                        From Date
                      </span>
                      <input
                        type={selectDateTimePicker ? 'datetime-local' : 'date'}
                        value={startDate || ''}
                        onChange={handleStartDateChange}
                        className='leading-4 p-2 focus:outline-none focus:ring shadow-sm text-base border-2 border-gray-300 rounded-md text-black'
                      />
                    </div>
                    <div className='flex flex-col w-50'>
                      <span className='dark:text-white text-black text-sm'>
                        To Date
                      </span>
                      <input
                        type={selectDateTimePicker ? 'datetime-local' : 'date'}
                        value={endDate || ''}
                        onChange={handleEndDateChange}
                        className='leading-4 p-2 focus:outline-none focus:ring shadow-sm text-base border-2 border-gray-300 rounded-md text-black'
                      />
                    </div>
                    <div className='flex flex-col'>
                      <span className='dark:text-white text-black text-sm'>
                        Select Time
                      </span>
                      <div
                        onClick={triggerToggle}
                        className={`wrg-toggle mr-2 ${
                          selectDateTimePicker
                            ? `wrg-toggle--checked`
                            : `wrg-toggle`
                        }`}
                      >
                        <div
                          className={
                            'wrg-toggle-container ' +
                            (selectDateTimePicker ? 'bg-green-700' : 'bg-black')
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
                          className={`wrg-toggle-circle ${
                            selectDateTimePicker ? `ml-1` : `mr-1`
                          }  `}
                        ></div>
                        <input
                          type='checkbox'
                          aria-label='Toggle Button'
                          className='wrg-toggle-input'
                        />
                      </div>
                    </div>
                  </div>

                  <div className='flex items-center justify-end p-2 border-t border-solid border-gray-300 rounded-b'>
                    <button
                      className={`bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ${
                        !datesFilled && 'opacity-50 cursor-not-allowed'
                      }`}
                      type='button'
                      style={{ transition: 'all .15s ease' }}
                      onClick={() => {
                        setShowModal(false);
                        filter();
                        setStartDate(null);
                        setEndDate(null);
                        setDatesFilled(false);
                      }}
                      disabled={!datesFilled}
                    >
                      Yes
                    </button>
                    <button
                      className='bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
                      type='button'
                      style={{ transition: 'all .15s ease' }}
                      onClick={() => setShowModal(false)}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
          </>
        )}
      </Container>
    </>
  );
};
