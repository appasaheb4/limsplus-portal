import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Container } from 'reactstrap';
import { observer } from 'mobx-react';
import { Form, Buttons, Icons, Svg } from '@/library/components';
import { toJS } from 'mobx';
interface ModalLookupValuesModifyProps {
  show?: boolean;
  arrValues?: any;
  defaultItems?: any;
  id?: string;
  onClick: (arrValues: any, id: string) => void;
  onClose: () => void;
}

export const ModalLookupValuesModify = observer(
  (props: ModalLookupValuesModifyProps) => {
    const [showModal, setShowModal] = React.useState(props.show);
    const [values, setValues] = useState<any>({});
    const [localInput, setLocalInput] = useState<any>({ flagUpperCase: true });

    useEffect(() => {
      setShowModal(props.show);
      setValues({
        arrValues: props.arrValues?.map(item => {
          return { ...item, __typename: undefined };
        }),
        defaultItems: props.defaultItems?.map(item => {
          return { ...item, flagUpperCase: undefined, __typename: undefined };
        }),
      });
    }, [props]);

    const handleAddLookup = () => {
      const { code, value, flagUpperCase } = localInput;
      // Check if any of the input fields are empty
      if (!code || !value) {
        alert('Please fill in both value and code.');
        return;
      }

      // Add the new department to the array
      let updatedArrValues = [
        ...(values.arrValues || []),
        { code, value, flagUpperCase },
      ];
      updatedArrValues = updatedArrValues.map(
        ({ code, value, flagUpperCase }) => ({
          code,
          value,
          flagUpperCase,
        }),
      );

      setValues({
        ...values,
        arrValues: updatedArrValues,
      });

      // Clear the input fields
      setLocalInput({
        value: '',
        code: '',
        flagUpperCase: false,
      });
    };

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
                          onClick={handleAddLookup}
                        >
                          <Icons.EvaIcon icon='plus-circle-outline' />
                          {'Add'}
                        </Buttons.Button>
                      </div>
                      <div className='clearfix'></div>
                    </div>
                    <div className='flex flex-row gap-2 flex-wrap'>
                      {values?.arrValues?.map((item, index) => (
                        <div className='mb-2' key={index}>
                          <Buttons.Button
                            size='medium'
                            type='solid'
                            icon={Svg.Remove}
                            onClick={() => {
                              setValues(prevValues => {
                                const updatedLookup =
                                  prevValues.arrValues.filter(
                                    (_: any, i) => i !== index,
                                  );
                                return {
                                  ...prevValues,
                                  arrValues: updatedLookup?.map(item => {
                                    return { ...item, __typename: undefined };
                                  }),
                                };
                              });
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
                    <div>
                      <Form.InputWrapper label='Default Item'>
                        <select
                          className={
                            'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  rounded-md'
                          }
                          onChange={e => {
                            if (e.target.value === 'removeItem') {
                              setValues({
                                ...values,
                                defaultItems: [],
                              });
                            }
                            let defaultItems = JSON.parse(e.target.value);
                            defaultItems = [
                              {
                                code: defaultItems.code,
                                value: defaultItems.value,
                              },
                            ];
                            setValues({
                              ...values,
                              defaultItems,
                            });
                          }}
                        >
                          <option>Select</option>
                          {values?.arrValues?.map(
                            (item: any, index: number) => (
                              <option
                                key={item.name}
                                value={JSON.stringify(item)}
                              >
                                {`${item.value} - ${item.code}`}
                              </option>
                            ),
                          )}
                        </select>
                      </Form.InputWrapper>
                    </div>
                  </div>
                  {/*footer*/}
                  <div className='flex items-center justify-end p-2 border-t border-solid border-gray-300 rounded-b'>
                    <button
                      className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1'
                      type='button'
                      style={{ transition: 'all .15s ease' }}
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
                      style={{ transition: 'all .15s ease' }}
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
