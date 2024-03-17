import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Container } from 'reactstrap';
import { observer } from 'mobx-react';
import { Form, Buttons, Icons, Svg } from '@/library/components';
import { AutoCompleteFilterSingleSelectDepartment } from '../orgransims/auto-complete-filter-single-select-department.component';

interface ModalDepartmentModifyProps {
  show?: boolean;
  departments?: any;
  id?: string;
  onClick: (arrValues: any, id: string) => void;
  onClose: () => void;
}

export const ModalDepartmentModify = observer(
  (props: ModalDepartmentModifyProps) => {
    const [showModal, setShowModal] = React.useState(props.show);
    const [values, setValues] = useState<any>({});
    const [localInput, setLocalInput] = useState<any>({});
    useEffect(() => {
      setShowModal(props.show);
      setValues({
        departments: props.departments,
      });
    }, [props]);

    const handleAddDepartment = () => {
      const { code, name, prefrence, tatInMin } = localInput;

      // Check if any of the input fields are empty
      if (!code || !name || !prefrence || !tatInMin) {
        alert('Please fill in all fields.');
        return;
      }

      // Add the new department to the array
      let updatedDepartments = values.departments || []; // Initialize as empty array if undefined
      updatedDepartments = [
        ...updatedDepartments,
        { code, name, prefrence, tatInMin },
      ];

      setValues({
        ...values,
        departments: updatedDepartments,
      });

      // Clear the input fields
      setLocalInput({
        code: '',
        name: '',
        prefrence: '',
        tatInMin: '',
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
                        Update Department
                      </h4>
                    </div>
                  </div>

                  {/*body*/}
                  <div className='relative ml-20 mr-20 p-2 flex-auto'>
                    <div className='flex flex-row gap-4'>
                      <AutoCompleteFilterSingleSelectDepartment
                        displayValue={localInput.name}
                        onSelect={item => {
                          setLocalInput({
                            ...localInput,
                            code: item.code,
                            name: item.name,
                          });
                        }}
                      />
                      <Form.Input
                        placeholder='Prefrence'
                        type='number'
                        value={localInput.prefrence}
                        onChange={prefrence => {
                          setLocalInput({
                            ...localInput,
                            prefrence: Number.parseFloat(prefrence),
                          });
                        }}
                      />
                      <Form.Input
                        placeholder='TAT IN MIN'
                        type='number'
                        value={localInput.tatInMin}
                        onChange={tatInMin => {
                          setLocalInput({
                            ...localInput,
                            tatInMin: Number.parseFloat(tatInMin),
                          });
                        }}
                      />
                      <div className='mt-2'>
                        <Buttons.Button
                          size='medium'
                          type='solid'
                          onClick={handleAddDepartment}
                        >
                          <Icons.EvaIcon icon='plus-circle-outline' />
                          {'Add'}
                        </Buttons.Button>
                      </div>
                      <div className='clearfix'></div>
                    </div>
                    <div className='flex flex-row gap-2 flex-wrap'>
                      {values?.departments?.map((item, index) => (
                        <div className='mb-2' key={index}>
                          <Buttons.Button
                            size='medium'
                            type='solid'
                            icon={Svg.Remove}
                            onClick={() => {
                              setValues(prevValues => {
                                const updatedDepartments =
                                  prevValues?.departments?.filter(
                                    (_: any, i) => i !== index,
                                  );
                                return {
                                  ...prevValues,
                                  departments: updatedDepartments,
                                };
                              });
                            }}
                          >
                            {`Department: ${item.code} - ${item.name}`}
                            {` Preference: ${item.prefrence}`}
                            {` Tat In Min: ${item.tatInMin}`}
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
