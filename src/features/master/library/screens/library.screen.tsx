import React, {useState, useMemo, useEffect} from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {
  Toast,
  Header,
  PageHeading,
  PageHeadingLabDetails,
  Buttons,
  Grid,
  List,
  Form,
  Svg,
  ModalConfirm,
} from '@/library/components';
import {lookupItems, lookupValue} from '@/library/utils';
import {LibraryList} from '../components';
import dayjs from 'dayjs';

import {useForm, Controller} from 'react-hook-form';
import {LibraryHoc} from '../hoc';
import {useStores} from '@/stores';
import {RouterFlow} from '@/flows';
import {toJS} from 'mobx';
import {resetLibrary} from '../startup';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{header: '1'}, {header: '2'}, {font: []}],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{list: 'ordered'}, {list: 'bullet'}, {indent: '-1'}, {indent: '+1'}],
    ['link'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

export const Library = LibraryHoc(
  observer(() => {
    const {
      loginStore,
      libraryStore,
      labStore,
      departmentStore,
      masterPanelStore,
      lookupStore,
      routerStore,
      loading,
    } = useStores();
    const [modalConfirm, setModalConfirm] = useState<any>();
    const [hideAddLab, setHideAddLab] = useState<boolean>(true);
    const [departmentList, setDepartmentList] = useState([]);
    const [isExistsRecord, setIsExistsRecord] = useState(false);

    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
      reset,
    } = useForm({mode: 'all'});

    useEffect(() => {
      // Default value initialization\
      setValue('libraryCode', libraryStore.library?.libraryCode);
      setValue('lab', libraryStore.library?.lab);
      setValue('department', libraryStore.library?.department);
      setValue('position', libraryStore.library?.position);
      setValue('groups', libraryStore.library?.groups);
      setValue('libraryType', libraryStore.library?.libraryType);
      setValue('parameter', libraryStore.library?.parameter);
      setValue('editable', libraryStore.library.editable);
      setValue('details', libraryStore.library.details);
      setValue('status', libraryStore.library?.status);
      setValue('enteredBy', libraryStore.library?.enteredBy);
      setValue('dateCreation', libraryStore.library?.dateCreation);
      setValue('dateExpire', libraryStore.library?.dateExpire);
      setValue('versions', libraryStore.library?.versions);
      setValue('environment', libraryStore.library?.environment);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [libraryStore.library]);

    const onSubmitLibrary = data => {
      if (!isExistsRecord) {
        libraryStore.libraryService
          .addLibrary({input: {...libraryStore.library}})
          .then(res => {
            if (res.createLibrary.success) {
              libraryStore.libraryService.listLibrary();
              Toast.success({
                message: `😊 ${res.createLibrary.message}`,
              });
              setHideAddLab(!hideAddLab);
              reset();
              resetLibrary();
            }
          });
      } else {
        Toast.error({
          message: '😔 Already some record exists.',
        });
      }
    };

    const tableView = useMemo(
      () => (
        <LibraryList
          data={libraryStore.listLibrary || []}
          totalSize={libraryStore.listLibraryCount}
          extraData={{
            loginDetails: loginStore.login,
            listLookup: lookupStore.listLookup,
            library: libraryStore.library,
            listLabs: labStore.listLabs,
            listDepartment: departmentStore.listDepartment,
            listMasterPanel: masterPanelStore.listMasterPanel,
            updateLibraryStore: libraryStore.updateLibrary,
            lookupItems: routerStore.lookupItems,
          }}
          isDelete={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
            'Delete',
          )}
          isEditModify={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
            'Edit/Modify',
          )}
          onDelete={selectedItem => setModalConfirm(selectedItem)}
          onSelectedRow={rows => {
            setModalConfirm({
              show: true,
              type: 'Delete',
              id: rows,
              title: 'Are you sure?',
              body: 'Delete selected items!',
            });
          }}
          onUpdateItem={(fields: any, id: string) => {
            setModalConfirm({
              show: true,
              type: 'Update',
              data: {fields, id},
              title: 'Are you sure?',
              body: 'Update item!',
            });
          }}
          onVersionUpgrade={item => {
            setModalConfirm({
              show: true,
              type: 'versionUpgrade',
              data: item,
              title: 'Are you version upgrade?',
              body: 'Version upgrade this record',
            });
          }}
          onDuplicate={item => {
            setModalConfirm({
              show: true,
              type: 'duplicate',
              data: item,
              title: 'Are you duplicate?',
              body: 'Duplicate this record',
            });
          }}
          onPageSizeChange={(page, limit) => {
            libraryStore.fetchLibrary(page, limit);
            global.filter = {mode: 'pagination', page, limit};
          }}
          onFilter={(type, filter, page, limit) => {
            libraryStore.libraryService.filter({
              input: {type, filter, page, limit},
            });
            global.filter = {
              mode: 'filter',
              type,
              filter,
              page,
              limit,
            };
          }}
        />
      ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [libraryStore.listLibrary],
    );

    const checkExistsRecords = filed => {
      libraryStore.libraryService
        .findByFields({
          input: {
            filter: {
              ..._.pick(libraryStore.library, [
                'libraryCode',
                'lab',
                'department',
                'position',
                'parameter',
                'status',
                'versions',
                'environment',
              ]),
              ...filed,
            },
          },
        })
        .then(res => {
          if (res.findByFieldsLibrarys?.success) {
            setIsExistsRecord(true);
            Toast.error({
              message: '😔 Already some record exists.',
            });
          }
        });
    };

    return (
      <>
        <Header>
          <PageHeading title={routerStore.selectedComponents?.title || ''} />
          <PageHeadingLabDetails store={loginStore} />
        </Header>
        {RouterFlow.checkPermission(
          toJS(routerStore.userPermission),
          'Add',
        ) && (
          <Buttons.ButtonCircleAddRemove
            show={hideAddLab}
            onClick={() => setHideAddLab(!hideAddLab)}
          />
        )}
        <div className='mx-auto flex-wrap'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' + (hideAddLab ? 'hidden' : 'shown')
            }
          >
            <Grid cols={2}>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Library Code'
                      placeholder={
                        !!errors.libraryCode ? 'Please Enter code' : 'Code'
                      }
                      hasError={!!errors.libraryCode}
                      value={value?.toString()}
                      onChange={libraryCode => {
                        onChange(libraryCode);
                        libraryStore.updateLibrary({
                          ...libraryStore.library,
                          libraryCode: libraryCode?.toUpperCase(),
                        });
                      }}
                      onBlur={libraryCode => {
                        if (libraryCode) {
                          checkExistsRecords({
                            libraryCode: libraryCode?.toUpperCase(),
                          });
                        }
                      }}
                    />
                  )}
                  name='libraryCode'
                  rules={{
                    required: true,
                    maxLength: 10,
                  }}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper label='Lab' hasError={!!errors.lab}>
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.lab ? 'border-red  ' : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const lab = e.target.value;
                          onChange(lab);
                          libraryStore.updateLibrary({
                            ...libraryStore.library,
                            lab,
                          });
                          if (lab) {
                            checkExistsRecords({lab});
                          }
                          // fetch department list
                          departmentStore.DepartmentService.findByFields({
                            input: {filter: {lab}},
                          }).then(res => {
                            if (res.findByFieldsDepartments.success) {
                              setDepartmentList(
                                res.findByFieldsDepartments?.data,
                              );
                            }
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {[{code: 'Default'}]
                          .concat(loginStore?.login?.labList)
                          ?.map((item: any, index: number) => (
                            <option key={index} value={item?.code}>
                              {item?.code}
                            </option>
                          ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='lab'
                  rules={{required: true}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Department'
                      hasError={!!errors.department}
                    >
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.department ? 'border-red  ' : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const department = e.target.value;
                          onChange(department);
                          libraryStore.updateLibrary({
                            ...libraryStore.library,
                            department,
                          });
                          if (department) {
                            checkExistsRecords({department});
                          }
                        }}
                      >
                        <option selected>Select</option>
                        {[{name: '', code: 'Default'}]
                          .concat(departmentList)
                          ?.map((item: any, index: number) => (
                            <option key={index} value={item?.code}>
                              {item.code != 'Default'
                                ? item?.name + ' - ' + item?.code
                                : item.code}
                            </option>
                          ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='department'
                  rules={{required: true}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Position'
                      hasError={!!errors.position}
                    >
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.position ? 'border-red  ' : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const position = e.target.value;
                          onChange(position);
                          libraryStore.updateLibrary({
                            ...libraryStore.library,
                            position,
                          });
                          if (position) {
                            checkExistsRecords({position});
                          }
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(routerStore.lookupItems, 'POSITION').map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ),
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='position'
                  rules={{required: true}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Groups'
                      hasError={!!errors.groups}
                    >
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.groups ? 'border-red  ' : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const groups = e.target.value;
                          onChange(groups);
                          libraryStore.updateLibrary({
                            ...libraryStore.library,
                            groups,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(routerStore.lookupItems, 'GROUPS').map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ),
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='groups'
                  rules={{required: false}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Library Type'
                      hasError={!!errors.libraryType}
                    >
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.libraryType
                            ? 'border-red  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const libraryType = e.target.value;
                          onChange(libraryType);
                          libraryStore.updateLibrary({
                            ...libraryStore.library,
                            libraryType,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(routerStore.lookupItems, 'LIBRARY_TYPE')
                          ?.filter(item =>
                            item.code?.match(libraryStore.library.groups),
                          )
                          .map((item: any, index: number) => (
                            <option key={index} value={item.value}>
                              {lookupValue(item)}
                            </option>
                          ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='libraryType'
                  rules={{required: false}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Parameter'
                      hasError={!!errors.parameter}
                    >
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.parameter ? 'border-red  ' : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const parameter = e.target.value;
                          onChange(parameter);
                          libraryStore.updateLibrary({
                            ...libraryStore.library,
                            parameter,
                          });
                          if (parameter) {
                            checkExistsRecords({parameter});
                          }
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(routerStore.lookupItems, 'PARAMETER').map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ),
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='parameter'
                  rules={{required: false}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Toggle
                      label='Editable'
                      hasError={!!errors.editable}
                      value={value}
                      onChange={editable => {
                        onChange(editable);
                        libraryStore.updateLibrary({
                          ...libraryStore.library,
                          editable,
                        });
                      }}
                    />
                  )}
                  name='editable'
                  rules={{required: false}}
                  defaultValue=''
                />
              </List>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <>
                      <Form.InputWrapper
                        label='Details'
                        hasError={!!errors.details}
                      >
                        <ReactQuill
                          placeholder='Type here'
                          theme='snow'
                          value={value}
                          modules={modules}
                          onChange={details => {
                            onChange(details);
                            libraryStore.updateLibrary({
                              ...libraryStore.library,
                              details,
                            });
                          }}
                        />
                      </Form.InputWrapper>
                    </>
                  )}
                  name='details'
                  rules={{required: false}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Status'
                      hasError={!!errors.status}
                    >
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.status ? 'border-red  ' : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const status = e.target.value;
                          onChange(status);
                          libraryStore.updateLibrary({
                            ...libraryStore.library,
                            status,
                          });
                          if (status) {
                            checkExistsRecords({status});
                          }
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(routerStore.lookupItems, 'STATUS').map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ),
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='status'
                  rules={{required: true}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {value}}) => (
                    <Form.Input
                      label='Enter By'
                      disabled
                      hasError={!!errors.enteredBy}
                      value={value}
                    />
                  )}
                  name='enteredBy'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {value}}) => (
                    <Form.Input
                      label='Date Creation'
                      disabled
                      value={
                        value
                          ? dayjs(value)
                              ?.format('DD-MM-YYYY HH:mm:ss')
                              .toString()
                          : ''
                      }
                    />
                  )}
                  name='dateCreation'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {value}}) => (
                    <Form.Input
                      label='Date Expire'
                      disabled
                      value={
                        value
                          ? dayjs(value)
                              ?.format('DD-MM-YYYY HH:mm:ss')
                              .toString()
                          : ''
                      }
                    />
                  )}
                  name='dateExpire'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {value}}) => (
                    <Form.Input label='Versions' disabled value={value} />
                  )}
                  name='versions'
                  rules={{required: false}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Environment'
                      hasError={!!errors.environment}
                    >
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.environment
                            ? 'border-red  '
                            : 'border-gray-300'
                        } rounded-md`}
                        disabled={true}
                        onChange={e => {
                          const environment = e.target.value;
                          onChange(environment);
                          libraryStore.updateLibrary({
                            ...libraryStore.library,
                            environment,
                          });
                          if (environment) {
                            checkExistsRecords({environment});
                          }
                        }}
                      >
                        <option selected>
                          {loginStore.login &&
                          loginStore.login.role !== 'SYSADMIN'
                            ? 'Select'
                            : libraryStore.library?.environment || 'Select'}
                        </option>
                        {lookupItems(
                          routerStore.lookupItems,
                          'ENVIRONMENT',
                        ).map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
                          </option>
                        ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='environment'
                  rules={{required: true}}
                  defaultValue=''
                />
              </List>
            </Grid>
            <br />
            <List direction='row' space={3} align='center'>
              <Buttons.Button
                size='medium'
                type='solid'
                icon={Svg.Save}
                onClick={handleSubmit(onSubmitLibrary)}
              >
                Save
              </Buttons.Button>
              <Buttons.Button
                size='medium'
                type='outline'
                icon={Svg.Remove}
                onClick={() => {
                  window.location.reload();
                }}
              >
                Clear
              </Buttons.Button>
            </List>
          </div>
          <div className='p-2 rounded-lg shadow-xl overflow-auto'>
            {tableView}
          </div>
          <ModalConfirm
            {...modalConfirm}
            click={(action?: string) => {
              setModalConfirm({show: false});
              switch (action) {
                case 'Delete': {
                  libraryStore.libraryService
                    .deleteLibrary({input: {id: modalConfirm.id}})
                    .then((res: any) => {
                      if (res.removeLibrary.success) {
                        Toast.success({
                          message: `😊 ${res.removeLibrary.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          libraryStore.fetchLibrary(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          libraryStore.libraryService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else libraryStore.fetchLibrary();
                      }
                    });
                  break;
                }

                case 'Update': {
                  libraryStore.libraryService
                    .updateSingleFiled({
                      input: {
                        ...modalConfirm.data.fields,
                        _id: modalConfirm.data.id,
                      },
                    })
                    .then((res: any) => {
                      if (res.updateLibrary.success) {
                        Toast.success({
                          message: `😊 ${res.updateLibrary.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          libraryStore.fetchLibrary(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter')
                          libraryStore.libraryService.filter({
                            input: {
                              type: global?.filter?.type,
                              filter: global?.filter?.filter,
                              page: global?.filter?.page,
                              limit: global?.filter?.limit,
                            },
                          });
                        else libraryStore.fetchLibrary();
                      }
                    });
                  break;
                }
                case 'versionUpgrade': {
                  libraryStore.updateLibrary({
                    ...modalConfirm.data,
                    __typename: undefined,
                    _id: undefined,
                    code: undefined,
                    existsVersionId: modalConfirm.data._id,
                    existsRecordId: undefined,
                    versions: Number.parseInt(modalConfirm.data.versions + 1),
                    dateActive: new Date(),
                  });
                  setHideAddLab(!hideAddLab);
                  break;
                }
                case 'duplicate': {
                  libraryStore.updateLibrary({
                    ...modalConfirm.data,
                    __typename: undefined,
                    _id: undefined,
                    code: undefined,
                    existsVersionId: undefined,
                    existsRecordId: modalConfirm.data._id,
                    versions: Number.parseInt(modalConfirm.data.versions),
                    dateActive: new Date(),
                  });
                  setHideAddLab(!hideAddLab);
                  break;
                }
              }
            }}
            onClose={() => {
              setModalConfirm({show: false});
            }}
          />
        </div>
      </>
    );
  }),
);

export default Library;
