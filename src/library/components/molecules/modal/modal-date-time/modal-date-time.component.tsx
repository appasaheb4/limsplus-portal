import {
  dateAvailableUnits,
  getAgeByAgeObject,
  getDiffByDate,
} from '@/core-utils';
import { Form } from '@/library/components';
import { lookupItems, lookupValue } from '@/library/utils';
import { useStores } from '@/stores';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';

type Props = {
  isSingleDatePicker?: boolean;

  visible?: boolean;
  data?: string;
  rowData?: any;
  onUpdate?: (birthDate: any) => void;
  onClose?: () => void;
};

export const ModalDateTime: React.FC<Props> = ({
  isSingleDatePicker,
  visible,
  data,
  onUpdate,
  onClose,
  rowData,
}) => {
  const { routerStore } = useStores();
  const [value, setValue] = useState(data);
  const [showModal, setShowModal] = React.useState(visible);
  const [openCalender, setOpenCalender] = useState(true);
  const [localInput, setLocalInput] = useState<any>();

  useEffect(() => {
    if (isSingleDatePicker) {
      setValue(data);
    } else {
      setLocalInput({
        birthDate: new Date(rowData?.birthDate),
        age: rowData?.age,
        ageUnits: rowData?.ageUnits,
        sex: '',
      });
    }
    setShowModal(visible);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <Container>
      {showModal && (
        <>
          <div className='justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div
              className='relative w-auto my-6 mx-auto max-w-3xl'
              style={{ maxWidth: isSingleDatePicker ? '19rem' : '38rem' }}
            >
              {/*content*/}
              <div
                className='border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none'
                style={{ width: isSingleDatePicker ? '38vh' : '75vh' }}
              >
                {/*header*/}
                <div className='flex items-start justify-between p-2 border-b border-solid border-gray-300 rounded-t'>
                  <h3 className='text-3xl font-semibold'>
                    {isSingleDatePicker
                      ? 'Update BirthDate'
                      : 'Update Patient Visit Values'}
                  </h3>
                  <button
                    className='p-1  border-0 text-black opacity-1 ml-6 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                    onClick={() => {
                      setShowModal(false);
                      onClose && onClose();
                    }}
                  >
                    <span className=' text-black h-6 w-6 text-2xl block outline-none focus:outline-none'>
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                {isSingleDatePicker ? (
                  <>
                    <div
                      className='relative p-2 flex-auto'
                      style={{
                        height:
                          openCalender && isSingleDatePicker ? '400px' : '66px',
                      }}
                    >
                      <Form.DatePicker
                        label=''
                        placeholder='BirthDate'
                        use12Hours={false}
                        value={value}
                        isCalenderOpen={isSingleDatePicker}
                        onChange={birthDate => {
                          setValue(birthDate);
                        }}
                        onCalendarToggle={isOpen => {
                          setOpenCalender(isOpen);
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className='relative p-2 ml-12 flex-auto'>
                      <div className='flex flex-row  gap-2'>
                        <Form.InputWrapper label='Sex'>
                          <select
                            className={
                              'leading-4 p-2 h-11 focus:outline-none focus:ring block w-30 shadow-sm sm:text-base border-2 border-gray-300 rounded-md'
                            }
                            value={localInput?.sex}
                            onChange={e => {
                              const sex = e.target.value as any;
                              setLocalInput({
                                ...localInput,
                                sex,
                              });
                            }}
                          >
                            <option selected>Select</option>
                            {lookupItems(
                              routerStore.lookupItems,
                              'PATIENT VISIT - SEX',
                            ).map((item: any, index: number) => (
                              <option key={index} value={item.code}>
                                {lookupValue(item)}
                              </option>
                            ))}
                          </select>
                        </Form.InputWrapper>

                        <Form.InputDateTime
                          label='BirthDate'
                          isCalenderOpen={false}
                          placeholder={'BirthDate'}
                          use12Hours={false}
                          value={localInput?.birthDate}
                          onChange={birthDate => {
                            if (
                              dayjs(new Date()).diff(dayjs(birthDate), 'year') <
                              150
                            ) {
                              setLocalInput({
                                ...localInput,
                                age: getDiffByDate(birthDate),
                              });
                              if (
                                dayjs(new Date()).diff(
                                  dayjs(birthDate),
                                  'hour',
                                ) > 0
                              ) {
                                setLocalInput({
                                  ...localInput,
                                  birthDate,
                                  age:
                                    getAgeByAgeObject(getDiffByDate(birthDate))
                                      .age || 0,
                                  ageUnits: getAgeByAgeObject(
                                    getDiffByDate(birthDate),
                                  ).ageUnit,
                                });
                              }
                            }
                          }}
                        />
                        <div className='flex flex-row gap-4'>
                          <Form.Input
                            label='Age'
                            placeholder={'Age'}
                            type='number'
                            value={localInput?.age}
                            className='w-20 h-11'
                            onChange={age => {
                              setLocalInput({
                                ...localInput,
                                birthDate: new Date(
                                  dayjs().add(-age, 'years').format(),
                                ),
                              });
                              setLocalInput({
                                ...localInput,
                                age: Number.parseInt(age),
                                birthDate: new Date(
                                  dayjs().add(
                                    -age,
                                    dateAvailableUnits(localInput?.ageUnits),
                                  ) as any,
                                ),
                              });
                            }}
                          />
                          <Form.InputWrapper label='Age Units'>
                            <select
                              className={
                                'leading-4 p-2 h-11 focus:outline-none focus:ring block w-20 shadow-sm sm:text-base border-2 border-gray-300 rounded-md'
                              }
                              value={localInput?.ageUnits}
                              onChange={e => {
                                const ageUnit = e.target.value as any;
                                setLocalInput({
                                  ...localInput,
                                  ageUnits: ageUnit,
                                  birthDate: new Date(
                                    dayjs().add(
                                      -localInput?.age,
                                      dateAvailableUnits(ageUnit),
                                    ) as any,
                                  ),
                                });
                              }}
                            >
                              <option selected>Select</option>
                              {[
                                { title: 'year', value: 'Y' },
                                { title: 'month', value: 'M' },
                                { title: 'week', value: 'W' },
                                { title: 'day', value: 'D' },
                                { title: 'hour', value: 'H' },
                              ].map((item: any, index: number) => (
                                <option key={index} value={item.value}>
                                  {item.value}
                                </option>
                              ))}
                            </select>
                          </Form.InputWrapper>
                        </div>
                      </div>
                      <div className='clearfix'></div>
                    </div>
                  </>
                )}

                {/*footer*/}
                <div className='flex items-center justify-end p-2 border-t border-solid border-gray-300 rounded-b'>
                  <button
                    className='text-red-500 background-transparent font-bold uppercase p-2 text-sm outline-none focus:outline-none mr-1 mb-1'
                    type='button'
                    style={{ transition: 'all .15s ease' }}
                    onClick={() => {
                      setShowModal(false);
                      onClose && onClose();
                    }}
                  >
                    Close
                  </button>

                  <button
                    className='bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm p-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
                    type='button'
                    style={{ transition: 'all .15s ease' }}
                    onClick={() => {
                      onUpdate && onUpdate(value);
                    }}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      )}
    </Container>
  );
};
