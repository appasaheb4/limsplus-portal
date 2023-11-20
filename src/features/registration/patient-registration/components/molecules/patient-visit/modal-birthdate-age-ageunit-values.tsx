import React, { useEffect, useState } from 'react';
// import _ from 'lodash';
import { Container } from 'reactstrap';
import { observer } from 'mobx-react';
import { Form } from '@/library/components';
import dayjs from 'dayjs';
import { getAgeByAgeObject, getDiffByDate } from '../../../utils';
import { dateAvailableUnits } from '@/core-utils';

interface ModalPatientVisitBirthDateModifyProps {
  show?: boolean;
  rowData?: any;
  onClick?: (arrValues: any) => void;
  onClose?: () => void;
}

export const ModalPatientVisitBirthDateModify = observer(
  (props: ModalPatientVisitBirthDateModifyProps) => {
    const [showModal, setShowModal] = React.useState(props.show);
    const [localInput, setLocalInput] = useState<any>();

    useEffect(() => {
      setShowModal(props.show);
      setLocalInput({
        birthDate: props?.rowData?.birthDate,
        age: props?.rowData?.age,
        ageUnits: props?.rowData?.ageUnits,
        sex: '',
        isBirthDateUpdate: true,
      });
    }, [props]);

    return (
      <Container>
        {showModal && (
          <>
            <div className='justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
              <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                {/*content*/}
                <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                  {/*header*/}
                  <div></div>
                  <div className='flex  flex-col  justify-between p-2 border-b border-solid border-gray-300 rounded-t'>
                    <div className='flex'>
                      <h4 className='font-semibold text-lg'>
                        Update Patient Visit Values
                      </h4>
                    </div>
                  </div>

                  {/*body*/}
                  <div className='relative p-2 ml-12 flex-auto'>
                    <div className='flex flex-row  gap-2'>
                      <Form.Toggle
                        label='isBirthDateUpdate'
                        value={localInput?.isBirthDateUpdate}
                        onChange={isBirthDateUpdate => {
                          setLocalInput({
                            ...localInput,
                            isBirthDateUpdate,
                          });
                        }}
                      />
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
                          {['Male', 'Female', 'Other'].map(
                            (item: any, index: number) => (
                              <option key={index} value={item}>
                                {item}
                              </option>
                            ),
                          )}
                        </select>
                      </Form.InputWrapper>
                      {localInput.isBirthDateUpdate && (
                        <>
                          <Form.InputDateTime
                            label='BirthDate'
                            placeholder={'BirthDate'}
                            use12Hours={false}
                            value={new Date(localInput?.birthDate)}
                            onChange={birthDate => {
                              if (
                                dayjs(new Date()).diff(
                                  dayjs(birthDate),
                                  'year',
                                ) < 150
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
                                      getAgeByAgeObject(
                                        getDiffByDate(birthDate),
                                      ).age || 0,
                                    ageUnits: getAgeByAgeObject(
                                      getDiffByDate(birthDate),
                                    ).ageUnit,
                                  });
                                }
                              }
                            }}
                          />
                        </>
                      )}
                      <div className='flex flex-row gap-4'>
                        <Form.Input
                          label='Age'
                          placeholder={'Age'}
                          type='number'
                          value={localInput?.age}
                          className='w-20'
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
                  {/*footer*/}
                  <div className='flex items-center justify-end p-2 border-t border-solid border-gray-300 rounded-b'>
                    <button
                      className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1'
                      type='button'
                      style={{ transition: 'all .15s ease' }}
                      onClick={() => {
                        props.onClose?.();
                        setShowModal(false);
                      }}
                    >
                      Close
                    </button>
                    <button
                      className='bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
                      type='button'
                      style={{ transition: 'all .15s ease' }}
                      onClick={() => {
                        setShowModal(false);
                        props.onClick && props.onClick(localInput);
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
  },
);
