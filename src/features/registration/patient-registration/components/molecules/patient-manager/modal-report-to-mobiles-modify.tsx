import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Container } from 'reactstrap';
import { observer } from 'mobx-react';
import { Form, Buttons, Icons, Svg } from '@/library/components';

interface ModalReportToMobilesModifyProps {
  show?: boolean;
  arrValues?: any;
  id?: string;
  onClick: (arrValues: any, id: string) => void;
  onClose: () => void;
}

export const ModalReportToMobilesModify = (
  props: ModalReportToMobilesModifyProps,
) => {
  const [showModal, setShowModal] = React.useState(props.show);
  const [values, setValues] = useState<any>({});
  const [localInput, setLocalInput] = useState<any>({
    name: '',
    mobileNo: '',
  });

  useEffect(() => {
    setShowModal(props.show);
    setValues({
      arrValues: props.arrValues?.map(item => {
        return { ...item, __typename: undefined };
      }),
    });
  }, [props]);

  const handleAddLookup = () => {
    const { name, mobileNo } = localInput;
    // Check if any of the input fields are empty
    if (!name || !mobileNo) {
      alert('Please fill in both value.');
      return;
    }

    // Add the new department to the array
    let updatedArrValues = [...(values.arrValues || []), { name, mobileNo }];
    updatedArrValues = updatedArrValues.map(({ name, mobileNo }) => ({
      name,
      mobileNo,
    }));

    setValues({
      ...values,
      arrValues: updatedArrValues,
    });

    // Clear the input fields
    setLocalInput({
      name: '',
      mobileNo: '',
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
                      Update Report To Mobiles
                    </h4>
                  </div>
                </div>

                {/*body*/}
                <div className='relative ml-24 mr-24 p-2 flex-auto'>
                  <div className='flex flex-row gap-4'>
                    <Form.Input
                      placeholder='Name'
                      value={localInput?.name}
                      onChange={name => {
                        setLocalInput({
                          ...localInput,
                          name,
                        });
                      }}
                    />
                    <Form.Input
                      placeholder='Mobile Number'
                      value={localInput?.mobileNo}
                      onChange={mobileNo => {
                        setLocalInput({
                          ...localInput,
                          mobileNo,
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
                  <div className='flex flex-row gap-2 mt-2 flex-wrap'>
                    {values?.arrValues?.map((item, index) => (
                      <div className='mb-2' key={index}>
                        <Buttons.Button
                          size='medium'
                          type='solid'
                          icon={Svg.Remove}
                          onClick={() => {
                            setValues(prevValues => {
                              const updatedLookup = prevValues.arrValues.filter(
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
                          {`${item.name} - ${item.mobileNo}  `}
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
};
