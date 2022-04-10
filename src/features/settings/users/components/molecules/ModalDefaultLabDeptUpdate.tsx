/* eslint-disable react/jsx-indent-props */
import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {
  Toast,
  List,
  Form,
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
} from '@components';
import {FormHelper} from '@/helper';
import {useForm, Controller} from 'react-hook-form';
import {useStores} from '@/stores';

interface ModalDefaultLabDeptUpdateProps {
  show: boolean;
  title?: string;
  onClick: () => void;
  onClose: () => void;
}

export const ModalDefaultLabDeptUpdate = observer(
  (props: ModalDefaultLabDeptUpdateProps) => {
    const {loading, labStore, userStore} = useStores();
    const {
      control,
      handleSubmit,
      formState: {errors},
      // setValue,
    } = useForm();
    const [showModal, setShowModal] = React.useState(props.show);

    const onSubmitModalChangePassword = () => {
      if (userStore.changePassword) {
        props.onClick();
      } else {
        Toast.error({
          message: '😔 Please enter all information!',
        });
      }
    };

    useEffect(() => {
      setShowModal(props.show);
    }, [props]);

    return (
      <>
        {showModal && (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-full my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between border-b border-solid border-gray-300 rounded-t p-2">
                    <div className="flex-col">
                      <h3 className="text-3xl font-semibold">Update details</h3>
                    </div>

                    <button
                      className="p-1  border-0 text-black opacity-1 ml-6 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => props.onClose && props.onClose()}
                    >
                      <span className=" text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>

                  {/*body*/}
                  <div className="relative  flex-auto p-3">
                    <List direction="col" space={4} justify="stretch" fill>
                      <Controller
                        control={control}
                        render={({field: {onChange}}) => (
                          <Form.InputWrapper
                            hasError={errors.defaultLab}
                            label="Default Lab"
                          >
                            <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                              loader={loading}
                              placeholder="Search by code or name"
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
                                const lab: any = labStore.listLabs.filter(
                                  e => e.code == item.code,
                                );
                                userStore.updateSelectedItems({
                                  ...userStore.selectedItems,
                                  labs: lab,
                                });
                                departmentStore.DepartmentService.findByFields({
                                  input: {filter: {lab: _.map(lab, 'code')}},
                                }).then(res => {
                                  if (!res.findByFieldsDepartments.success)
                                    return Toast.error({
                                      message:
                                        '😔 Technical issue, Please try again !',
                                    });
                                  departmentStore.updateDepartmentList(
                                    res.findByFieldsDepartments.data,
                                  );
                                });
                                labStore.updateLabList(labStore.listLabsCopy);
                              }}
                            />
                          </Form.InputWrapper>
                        )}
                        name="defaultLab"
                        rules={{required: true}}
                        defaultValue={userStore.user?.defaultLab || ''}
                      />
                      <Controller
                        control={control}
                        render={({field: {onChange}}) => (
                          <Form.InputWrapper
                            hasError={errors.defaultDepartment}
                            label="Default Department"
                          >
                            <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                              loader={loading}
                              placeholder="Search by code or name"
                              data={{
                                list: departmentStore.listDepartment.filter(
                                  item =>
                                    item.lab === userStore.user?.defaultLab,
                                ),
                                displayKey: ['code', 'name'],
                              }}
                              displayValue={userStore.user?.defaultDepartment}
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
                                onChange(item.name);
                                userStore.updateUser({
                                  ...userStore.user,
                                  defaultDepartment: item.code,
                                });
                                const department: any =
                                  departmentStore.listDepartment.filter(
                                    e => e.code == item.code,
                                  );
                                setValue('department', department);
                                userStore.updateUser({
                                  ...userStore.user,
                                  department,
                                });
                                userStore.updateSelectedItems({
                                  ...userStore.selectedItems,
                                  department,
                                });
                                labStore.updateLabList(labStore.listLabsCopy);
                              }}
                            />
                          </Form.InputWrapper>
                        )}
                        name="defaultDepartment"
                        rules={{required: true}}
                        defaultValue={userStore.user?.defaultDepartment || ''}
                      />
                    </List>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end  border-t border-solid border-gray-300 rounded-b p-2">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      style={{transition: 'all .15s ease'}}
                      onClick={() => props.onClose && props.onClose()}
                    >
                      Later
                    </button>
                    <button
                      className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      style={{transition: 'all .15s ease'}}
                      onClick={handleSubmit(onSubmitModalChangePassword)}
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        )}
      </>
    );
  },
);
