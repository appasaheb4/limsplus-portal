import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Container } from 'reactstrap';
import { observer } from 'mobx-react';
import { Form, Buttons, Icons, Svg } from '@/library/components';

interface ModalPossibleResultModifyProps {
  show?: boolean;
  conclusionResult?: any;
  id?: string;
  onClick: (arrValues: any, id: string) => void;
  onClose: () => void;
}

export const ModalPossibleResultConclusionModify = observer(
  (props: ModalPossibleResultModifyProps) => {
    const [showModal, setShowModal] = React.useState(props.show);
    const [values, setValues] = useState<any>({});
    const [localInput, setLocalInput] = useState<any>({});
    useEffect(() => {
      setShowModal(props.show);
      setValues({
        conclusionResult: props.conclusionResult,
      });
    }, [props]);

    const handleAddConclusionResult = () => {
      const { result, possibleValue, abNormal, critical } = localInput;
      if (!result || !possibleValue) {
        alert('Please fill in both result and possible value.');
        return;
      }
      let updatedConclusionResult = [
        ...(values.conclusionResult || []),
        { result, possibleValue, abNormal, critical },
      ];
      updatedConclusionResult = updatedConclusionResult.map(
        ({ result, possibleValue, abNormal, critical }) => ({
          result,
          possibleValue,
          abNormal,
          critical,
        }),
      );
      setValues({
        ...values,
        conclusionResult: updatedConclusionResult,
      });

      // Clear the input fields
      setLocalInput({
        result: '',
        possibleValue: '',
        abNormal: false,
        critical: false,
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
                        Update Possible Result Conclusion
                      </h4>
                    </div>
                  </div>

                  {/*body*/}
                  <div className='relative ml-24 mr-24 p-2 flex-auto'>
                    <div className='flex flex-row gap-4'>
                      <Form.Input
                        placeholder='Result'
                        value={localInput?.result}
                        onChange={result => {
                          setLocalInput({
                            ...localInput,
                            result,
                          });
                        }}
                      />
                      <Form.Input
                        placeholder='Possible Value'
                        value={localInput?.possibleValue}
                        onChange={possibleValue => {
                          setLocalInput({
                            ...localInput,
                            possibleValue,
                          });
                        }}
                      />
                      <Form.Toggle
                        label='AbNormal'
                        value={localInput?.abNormal}
                        onChange={abNormal => {
                          setLocalInput({
                            ...localInput,
                            abNormal,
                          });
                        }}
                      />
                      <Form.Toggle
                        label='Critical'
                        value={localInput?.critical}
                        onChange={critical => {
                          setLocalInput({
                            ...localInput,
                            critical,
                          });
                        }}
                      />
                      <div className='mt-2'>
                        <Buttons.Button
                          size='medium'
                          type='solid'
                          onClick={handleAddConclusionResult}
                        >
                          <Icons.EvaIcon icon='plus-circle-outline' />
                          {'Add'}
                        </Buttons.Button>
                      </div>
                      <div className='clearfix'></div>
                    </div>
                    <div className='flex flex-row gap-2 flex-wrap'>
                      {values?.conclusionResult?.map((item, index) => (
                        <div className='mb-2' key={index}>
                          <Buttons.Button
                            size='medium'
                            type='solid'
                            icon={Svg.Remove}
                            onClick={() => {
                              setValues(prevValues => {
                                const updatedResult =
                                  prevValues.conclusionResult.filter(
                                    (_: any, i) => i !== index,
                                  );
                                return {
                                  ...prevValues,
                                  conclusionResult: updatedResult,
                                };
                              });
                            }}
                          >
                            {`${item.result} - ${item.possibleValue}  `}
                            <Form.Toggle
                              value={item.abNormal}
                              disabled={true}
                            />
                            <Form.Toggle
                              value={item.critical}
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
