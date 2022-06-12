/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/jsx-indent-props */
import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import {observer} from 'mobx-react';
import {
  Toast,
  List,
  Form,
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
  AutoCompleteFilterMutiSelectMultiFieldsDisplay,
} from '@/library/components';
import {useForm, Controller} from 'react-hook-form';
import {useStores} from '@/stores';

export interface ModalDefaultLabDeptUpdateProps {
  type?: 'default' | 'assigned';
  id?: string;
  show: boolean;
  title?: string;
  onClose?: () => void;
}

export const ModalDefaultLabDeptUpdate = observer(
  (props: ModalDefaultLabDeptUpdateProps) => {
    const {loading, labStore, userStore, departmentStore} = useStores();
    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
      resetField,
    } = useForm();
    const [showModal, setShowModal] = React.useState(props.show);

    const [lab, setLab] = useState<string>();
    const [department, setDepartment] = useState<string>();
    const [assignedLab, setAssignedLab] = useState<Array<any>>([]);
    const [assignedDepartment, setAssignedDepartment] = useState<Array<any>>(
      [],
    );

    const onSubmit = () => {
      let input: any;
      if (props.type === 'default') {
        input = {
          defaultLab: lab,
          defaultDepartment: department,
          _id: props.id,
        };
      } else {
        input = {
          lab: assignedLab,
          department: assignedDepartment,
          _id: props.id,
        };
      }
      userStore.UsersService.updateSingleFiled({
        input,
      }).then((res: any) => {
        if (res.updateUser.success) {
          Toast.success({
            message: `😊 ${res.updateUser.message}`,
          });
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          props.onClose && props.onClose();
          userStore.UsersService.userList();
        }
      });
    };

    useEffect(() => {
      setShowModal(props.show);
    }, [props]);

    return (
      <>
        {showModal && (
          <>
            <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
              <div className='relative w-full my-6 mx-auto max-w-3xl'>
                {/*content*/}
                <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                  {/*header*/}
                  <div className='flex items-start justify-between border-b border-solid border-gray-300 rounded-t p-2'>
                    <div className='flex-col'>
                      <h3 className='text-3xl font-semibold'>Update details</h3>
                    </div>

                    <button
                      className='p-1  border-0 text-black opacity-1 ml-6 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                      onClick={() => props.onClose && props.onClose()}
                    >
                      <span className=' text-black h-6 w-6 text-2xl block outline-none focus:outline-none'>
                        ×
                      </span>
                    </button>
                  </div>

                  {/*body*/}
                  <div className='relative  flex-auto p-3'>
                    <List direction='col' space={4} justify='stretch' fill>
                      {props.type === 'default' && (
                        <>
                          <Controller
                            control={control}
                            render={({field: {onChange}}) => (
                              <Form.InputWrapper
                                hasError={errors.defaultLab}
                                label='Default Lab'
                              >
                                <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                                  loader={loading}
                                  placeholder='Search by code or name'
                                  data={{
                                    list: labStore.listLabs,
                                    displayKey: ['code', 'name'],
                                  }}
                                  displayValue={userStore.user?.defaultLab}
                                  hasError={errors.defaultLab}
                                  onFilter={(value: string) => {
                                    labStore.LabService.filter({
                                      input: {
                                        type: 'filter',
                                        filter: {
                                          name: value,
                                        },
                                        page: 0,
                                        limit: 10,
                                      },
                                    });
                                  }}
                                  onSelect={item => {
                                    onChange(item.code);
                                    const labs: any = labStore.listLabs?.filter(
                                      e => e.code === item.code,
                                    );
                                    setLab(item.code);
                                    setDepartment('');
                                    resetField('defaultDepartment');
                                    departmentStore.DepartmentService.findByFields(
                                      {
                                        input: {
                                          filter: {lab: _.map(labs, 'code')},
                                        },
                                      },
                                    ).then(res => {
                                      if (!res.findByFieldsDepartments.success)
                                        return Toast.error({
                                          message:
                                            '😔 Technical issue, Please try again !',
                                        });
                                      departmentStore.updateDepartmentList(
                                        res.findByFieldsDepartments?.data,
                                      );
                                    });
                                    labStore.updateLabList(
                                      labStore.listLabsCopy,
                                    );
                                  }}
                                />
                              </Form.InputWrapper>
                            )}
                            name='defaultLab'
                            rules={{required: true}}
                            defaultValue={userStore.user?.defaultLab || ''}
                          />
                          <Controller
                            control={control}
                            render={({field: {onChange}}) => (
                              <Form.InputWrapper
                                hasError={errors.defaultDepartment}
                                label='Default Department'
                              >
                                <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                                  loader={loading}
                                  placeholder='Search by code or name'
                                  data={{
                                    list: departmentStore.listDepartment.filter(
                                      item => item.lab === lab,
                                    ),
                                    displayKey: ['code', 'name'],
                                  }}
                                  displayValue={department}
                                  hasError={errors.defaultDepartment}
                                  onFilter={(value: string) => {
                                    departmentStore.DepartmentService.filter({
                                      input: {
                                        type: 'filter',
                                        filter: {
                                          name: value,
                                        },
                                        page: 0,
                                        limit: 10,
                                      },
                                    });
                                  }}
                                  onSelect={item => {
                                    onChange(item.code);
                                    setDepartment(item.code);
                                    labStore.updateLabList(
                                      labStore.listLabsCopy,
                                    );
                                    departmentStore.updateDepartmentList(
                                      departmentStore.listDepartmentCopy,
                                    );
                                  }}
                                />
                              </Form.InputWrapper>
                            )}
                            name='defaultDepartment'
                            rules={{required: true}}
                            defaultValue={
                              userStore.user?.defaultDepartment || ''
                            }
                          />
                        </>
                      )}
                      {props.type !== 'default' && (
                        <>
                          <Controller
                            control={control}
                            render={({field: {onChange}}) => (
                              <Form.InputWrapper
                                label='Assigned Lab'
                                hasError={errors.labs}
                              >
                                <AutoCompleteFilterMutiSelectMultiFieldsDisplay
                                  loader={loading}
                                  placeholder='Search by code or name'
                                  data={{
                                    list: [
                                      {
                                        _id: 'selectAll',
                                        code: '*',
                                        name: '*',
                                      },
                                    ].concat(labStore.listLabs),
                                    selected: userStore.selectedItems?.labs,
                                    displayKey: ['code', 'name'],
                                  }}
                                  hasError={errors.labs}
                                  onUpdate={item => {
                                    const labs = userStore.selectedItems?.labs;
                                    setAssignedLab(labs);
                                    setAssignedDepartment([]);
                                    resetField('department');
                                    if (labs?.some(e => e.code !== '*')) {
                                      departmentStore.DepartmentService.findByFields(
                                        {
                                          input: {
                                            filter: {lab: _.map(labs, 'code')},
                                          },
                                        },
                                      ).then(res => {
                                        if (
                                          !res.findByFieldsDepartments?.success
                                        )
                                          return Toast.error({
                                            message:
                                              '😔 Technical issue, Please try again !',
                                          });
                                        setValue(
                                          'department',
                                          res.findByFieldsDepartments.data,
                                        );
                                        departmentStore.updateDepartmentList(
                                          res.findByFieldsDepartments?.data,
                                        );
                                      });
                                    }
                                    labStore.updateLabList(
                                      labStore.listLabsCopy,
                                    );
                                  }}
                                  onFilter={(value: string) => {
                                    labStore.LabService.filterByFields({
                                      input: {
                                        filter: {
                                          fields: ['code', 'name'],
                                          srText: value,
                                        },
                                        page: 0,
                                        limit: 10,
                                      },
                                    });
                                  }}
                                  onSelect={item => {
                                    onChange(new Date());
                                    let labs = userStore.selectedItems?.labs;
                                    if (
                                      item.code === '*' ||
                                      labs?.some(e => e.code === '*')
                                    ) {
                                      if (
                                        !item.selected ||
                                        labs?.some(e => e.code === '*')
                                      ) {
                                        labs = [];
                                        labs?.push(item);
                                      } else {
                                        labs = labs?.filter(items => {
                                          return items._id !== item._id;
                                        });
                                      }
                                    } else {
                                      if (!item.selected) {
                                        if (labs && labs?.length > 0) {
                                          labs?.push(item);
                                        } else labs = [item];
                                      } else {
                                        labs = labs?.filter(items => {
                                          return items._id !== item._id;
                                        });
                                      }
                                    }
                                    userStore.updateSelectedItems({
                                      ...userStore.selectedItems,
                                      labs,
                                    });
                                  }}
                                />
                              </Form.InputWrapper>
                            )}
                            name='labs'
                            rules={{required: true}}
                            defaultValue={userStore.selectedItems?.labs}
                          />

                          <Controller
                            control={control}
                            render={({field: {onChange}}) => (
                              <Form.InputWrapper
                                label='Assigned Department'
                                hasError={errors.department}
                              >
                                <AutoCompleteFilterMutiSelectMultiFieldsDisplay
                                  loader={loading}
                                  placeholder='Search by code or name'
                                  data={{
                                    list: [
                                      {
                                        _id: 'selectAll',
                                        code: '*',
                                        name: '*',
                                      },
                                    ].concat(
                                      assignedLab?.length > 0
                                        ? assignedLab?.some(e => e.code !== '*')
                                          ? departmentStore.listDepartment?.filter(
                                              o1 =>
                                                assignedLab?.some(
                                                  o2 => o1.lab === o2.code,
                                                ),
                                            )
                                          : departmentStore.listDepartment
                                        : [],
                                    ),
                                    selected:
                                      userStore.selectedItems?.department,
                                    displayKey: ['code', 'name'],
                                  }}
                                  hasError={errors.department}
                                  onUpdate={item => {
                                    const departments =
                                      userStore.selectedItems?.department;
                                    setAssignedDepartment(departments);
                                    departmentStore.updateDepartmentList(
                                      departmentStore.listDepartmentCopy,
                                    );
                                  }}
                                  onFilter={(value: string) => {
                                    departmentStore.DepartmentService.filterByFields(
                                      {
                                        input: {
                                          filter: {
                                            fields: ['code', 'name'],
                                            srText: value,
                                          },
                                          page: 0,
                                          limit: 10,
                                        },
                                      },
                                    );
                                  }}
                                  onSelect={item => {
                                    onChange(new Date());
                                    let departments =
                                      userStore.selectedItems?.department;
                                    if (
                                      item?.code === '*' ||
                                      departments?.some(e => e.code === '*')
                                    ) {
                                      if (
                                        !item.selected ||
                                        departments?.some(e => e.code === '*')
                                      ) {
                                        departments = [item];
                                      } else {
                                        departments = departments?.filter(
                                          items => {
                                            return items._id !== item._id;
                                          },
                                        );
                                      }
                                    } else {
                                      if (!item?.selected) {
                                        if (
                                          departments &&
                                          departments?.length > 0
                                        ) {
                                          departments?.push(item);
                                        } else departments = [item];
                                      } else {
                                        departments = departments?.filter(
                                          items => {
                                            return items._id !== item._id;
                                          },
                                        );
                                      }
                                    }
                                    userStore.updateSelectedItems({
                                      ...userStore.selectedItems,
                                      department: departments,
                                    });
                                  }}
                                />
                              </Form.InputWrapper>
                            )}
                            name='department'
                            rules={{required: true}}
                            defaultValue={departmentStore.listDepartment}
                          />
                        </>
                      )}
                    </List>
                  </div>
                  {/*footer*/}
                  <div className='flex items-center justify-end  border-t border-solid border-gray-300 rounded-b p-2'>
                    <button
                      className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1'
                      type='button'
                      style={{transition: 'all .15s ease'}}
                      onClick={() => props.onClose && props.onClose()}
                    >
                      Later
                    </button>
                    <button
                      className='bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
                      type='button'
                      style={{transition: 'all .15s ease'}}
                      onClick={handleSubmit(onSubmit)}
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
      </>
    );
  },
);
