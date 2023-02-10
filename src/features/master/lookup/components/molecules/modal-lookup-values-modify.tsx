import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import {Container} from 'reactstrap';
import {observer} from 'mobx-react';
import {useForm, Controller} from 'react-hook-form';
import {Form, List, Buttons, Icons, Svg} from '@/library/components';

interface ModalLookupValuesModifyProps {
  show?: boolean;
  arrValues?: any;
  id?: string;
  onClick: (arrValues: any, id: string) => void;
  onClose: () => void;
}

export const ModalLookupValuesModify = observer(
  (props: ModalLookupValuesModifyProps) => {
    const [showModal, setShowModal] = React.useState(props.show);
    const [values, setValues] = useState<any>();
    const [localInput, setLocalInput] = useState<any>({flagUpperCase: true});

    useEffect(() => {
      setShowModal(props.show);
      setValues(props.arrValues);
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
                        Update Lookup Values
                      </h4>
                    </div>
                  </div>

                  {/*body*/}
                  <div className='relative ml-24 mr-24 p-2 flex-auto'>
                    <div className='flex flex-row gap-4'>
                      <Form.Input
                        placeholder='Code'
                        value={localInput?.code}
                        onChange={code => {
                          setLocalInput({
                            ...localInput,
                            code: localInput?.flagUpperCase
                              ? code?.toUpperCase()
                              : code,
                          });
                        }}
                      />
                      <Form.Input
                        placeholder='Value'
                        value={localInput?.value}
                        onChange={value => {
                          setLocalInput({
                            ...localInput,
                            value,
                          });
                        }}
                      />
                      <Form.Toggle
                        label='Enable Upper Case'
                        value={localInput?.flagUpperCase}
                        onChange={flagUpperCase => {
                          setLocalInput({
                            ...localInput,
                            flagUpperCase,
                          });
                        }}
                      />
                      <div className='mt-2'>
                        <Buttons.Button
                          size='medium'
                          type='solid'
                          onClick={() => {
                            const value = localInput?.value;
                            const code = localInput?.code;
                            const flagUpperCase = localInput?.flagUpperCase;
                            let arrValue = values || [];
                            if (value === undefined || code === undefined)
                              return alert('Please enter value and code.');
                            if (value !== undefined) {
                              arrValue !== undefined
                                ? arrValue.push({
                                    value,
                                    code,
                                    flagUpperCase,
                                  })
                                : (arrValue = [
                                    {
                                      value,
                                      code,
                                      flagUpperCase,
                                    },
                                  ]);
                              arrValue = _.map(arrValue, o =>
                                _.pick(o, ['code', 'value', 'flagUpperCase']),
                              );
                              setValues(arrValue);
                              setLocalInput({
                                value: '',
                                code: '',
                                flagUpperCase: true,
                              });
                            }
                          }}
                        >
                          <Icons.EvaIcon icon='plus-circle-outline' />
                          {'Add'}
                        </Buttons.Button>
                      </div>
                      <div className='clearfix'></div>
                    </div>
                    <div className='flex flex-row gap-2 flex-wrap'>
                      {values?.map((item, index) => (
                        <div className='mb-2' key={index}>
                          <Buttons.Button
                            size='medium'
                            type='solid'
                            icon={Svg.Remove}
                            onClick={() => {
                              const firstArr = values?.slice(0, index) || [];
                              const secondArr = values?.slice(index + 1) || [];
                              let finalArray = [...firstArr, ...secondArr];
                              finalArray = _.map(finalArray, o =>
                                _.pick(o, ['code', 'value', 'flagUpperCase']),
                              );
                              setValues(finalArray);
                            }}
                          >
                            {`${item.value} - ${item.code}  `}
                            <Form.Toggle
                              value={item.flagUpperCase}
                              disabled={true}
                            />
                          </Buttons.Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/*footer*/}
                  <div className='flex items-center justify-end p-2 border-t border-solid border-gray-300 rounded-b'>
                    <button
                      className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1'
                      type='button'
                      style={{transition: 'all .15s ease'}}
                      onClick={() => {
                        props.onClose();
                        setShowModal(false);
                      }}
                    >
                      Close
                    </button>
                    <button
                      className='bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
                      type='button'
                      style={{transition: 'all .15s ease'}}
                      onClick={() => {
                        setShowModal(false);
                        props.onClick && props.onClick(values, props.id || '');
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
