import React, {useState, useMemo, useEffect} from 'react';
import {observer} from 'mobx-react';
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
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
} from '@/library/components';
import {lookupItems, lookupValue} from '@/library/utils';
import {CommentManagerList} from '../components';
import dayjs from 'dayjs';

import {useForm, Controller} from 'react-hook-form';
import {CommentManagerHoc} from '../hoc';
import {useStores} from '@/stores';
import {RouterFlow} from '@/flows';
import {toJS} from 'mobx';

const CommentManager = CommentManagerHoc(
  observer(() => {
    const {
      loginStore,
      libraryStore,
      labStore,
      departmentStore,
      masterPanelStore,
      lookupStore,
      routerStore,
      commentManagerStore,
      loading,
    } = useStores();
    const [modalConfirm, setModalConfirm] = useState<any>();
    const [isHideAddView, setIsHideAddView] = useState<boolean>(false);
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
      setValue('status', commentManagerStore.commentManager?.status);
      setValue('enteredBy', commentManagerStore.commentManager?.enteredBy);
      setValue(
        'dateCreation',
        commentManagerStore.commentManager?.dateCreation,
      );
      setValue('dateExpire', commentManagerStore.commentManager?.dateExpire);
      setValue('versions', commentManagerStore.commentManager?.versions);
      setValue('environment', commentManagerStore.commentManager?.environment);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [commentManagerStore.commentManager]);

    const onSubmitCommentManager = data => {
      if (!isExistsRecord) {
        // commentManagerStore.commentManagerService
        //   .create({input: {...commentManagerStore.commentManager}})
        //   .then(res => {
        //     if (res.createCommentManager.success) {
        //       commentManagerStore.commentManagerService.list();
        //       Toast.success({
        //         message: `😊 ${res.createCommentManager.message}`,
        //       });
        //       setIsHideAddView(!isHideAddView);
        //     }
        //   });
        alert('working on');
      } else {
        Toast.error({
          message: '😔 Already some record exists.',
        });
      }
    };

    const tableView = useMemo(
      () => (
        <CommentManagerList
          data={commentManagerStore.commentManagerList || []}
          totalSize={commentManagerStore.commentManagerListCount}
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
            show={isHideAddView}
            onClick={() => setIsHideAddView(!isHideAddView)}
          />
        )}
        <div className='mx-auto flex-wrap'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' + (isHideAddView ? 'hidden' : 'shown')
            }
          >
            <Grid cols={3}>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Library Code'
                      hasError={!!errors.libraryCode}
                    >
                      <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                        loader={loading}
                        data={{
                          list: libraryStore.listLibrary,
                          displayKey: ['code', 'libraryCode'],
                        }}
                        placeholder='Search by library code'
                        hasError={!!errors.libraryCode}
                        onFilter={(value: string) => {
                          libraryStore.libraryService.filterByFields({
                            input: {
                              filter: {
                                fields: ['libraryCode'],
                                srText: value,
                              },
                              page: 0,
                              limit: 10,
                            },
                          });
                        }}
                        onSelect={item => {
                          onChange(item.libraryCode);
                          commentManagerStore.updateCommentManager({
                            ...commentManagerStore.commentManager,
                            libraryCode: item.libraryCode,
                          });
                          libraryStore.updateLibraryList(
                            libraryStore.listLibraryCopy,
                          );
                        }}
                      />
                    </Form.InputWrapper>
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
                          commentManagerStore.updateCommentManager({
                            ...commentManagerStore.commentManager,
                            lab,
                          });
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
                          commentManagerStore.updateCommentManager({
                            ...commentManagerStore.commentManager,
                            department,
                          });
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
                      label='Investigation Type'
                      hasError={!!errors.investigationType}
                    >
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.investigationType
                            ? 'border-red  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const investigationType = e.target.value;
                          onChange(investigationType);
                          commentManagerStore.updateCommentManager({
                            ...commentManagerStore.commentManager,
                            investigationType,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(
                          routerStore.lookupItems,
                          'INVESTIGATION-TYPE',
                        ).map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
                          </option>
                        ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='investigationType'
                  rules={{required: true}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Investigation Code'
                      hasError={!!errors.investigationCode}
                    >
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.investigationCode
                            ? 'border-red  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const investigationCode = e.target.value;
                          onChange(investigationCode);
                          commentManagerStore.updateCommentManager({
                            ...commentManagerStore.commentManager,
                            investigationCode,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(
                          routerStore.lookupItems,
                          'INVESTIGATION-CODE',
                        ).map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
                          </option>
                        ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='investigationCode'
                  rules={{required: true}}
                  defaultValue=''
                />

                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Investigation Name'
                      hasError={!!errors.investigationName}
                    >
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.investigationName
                            ? 'border-red  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const investigationName = e.target.value;
                          onChange(investigationName);
                          commentManagerStore.updateCommentManager({
                            ...commentManagerStore.commentManager,
                            investigationName,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(
                          routerStore.lookupItems,
                          'INVESTIGATION-NAME',
                        ).map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
                          </option>
                        ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='investigationName'
                  rules={{required: false}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Species'
                      hasError={!!errors.species}
                    >
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.species ? 'border-red  ' : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const species = e.target.value;
                          onChange(species);
                          commentManagerStore.updateCommentManager({
                            ...commentManagerStore.commentManager,
                            species,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(routerStore.lookupItems, 'SPECIES').map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ),
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='species'
                  rules={{required: true}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper label='Sex' hasError={!!errors.sex}>
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.sex ? 'border-red  ' : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const sex = e.target.value;
                          onChange(sex);
                          commentManagerStore.updateCommentManager({
                            ...commentManagerStore.commentManager,
                            sex,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(routerStore.lookupItems, 'SEX').map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ),
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='sex'
                  rules={{required: true}}
                  defaultValue=''
                />
              </List>
              <List direction='col' space={4} justify='stretch' fill>
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Inst Type'
                      hasError={!!errors.instType}
                    >
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.instType ? 'border-red  ' : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const instType = e.target.value;
                          onChange(instType);
                          commentManagerStore.updateCommentManager({
                            ...commentManagerStore.commentManager,
                            instType,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(routerStore.lookupItems, 'INST-TYPE').map(
                          (item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ),
                        )}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='instType'
                  rules={{required: true}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Comments Type'
                      hasError={!!errors.commentsType}
                    >
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.commentsType
                            ? 'border-red  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const commentsType = e.target.value;
                          onChange(commentsType);
                          commentManagerStore.updateCommentManager({
                            ...commentManagerStore.commentManager,
                            commentsType,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(
                          routerStore.lookupItems,
                          'COMMENTS-TYPE',
                        ).map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
                          </option>
                        ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='commentsType'
                  rules={{required: true}}
                  defaultValue=''
                />
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.InputWrapper
                      label='Comments For'
                      hasError={!!errors.commentsFor}
                    >
                      <select
                        value={value}
                        className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                          errors.commentsFor
                            ? 'border-red  '
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={e => {
                          const commentsFor = e.target.value;
                          onChange(commentsFor);
                          commentManagerStore.updateCommentManager({
                            ...commentManagerStore.commentManager,
                            commentsFor,
                          });
                        }}
                      >
                        <option selected>Select</option>
                        {lookupItems(
                          routerStore.lookupItems,
                          'COMMENTS-FOR',
                        ).map((item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {lookupValue(item)}
                          </option>
                        ))}
                      </select>
                    </Form.InputWrapper>
                  )}
                  name='commentsFor'
                  rules={{required: true}}
                  defaultValue=''
                />
                <div className='grid grid-cols-2 gap-2'>
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Input
                        label='Age From'
                        type='number'
                        placeholder='Age From'
                        onChange={ageFrom => {
                          onChange(ageFrom);
                          commentManagerStore.updateCommentManager({
                            ...commentManagerStore.commentManager,
                            ageFrom,
                          });
                        }}
                      />
                    )}
                    name='ageFrom'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.InputWrapper label='Age From Unit'>
                        <select
                          value={value}
                          className={
                            'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  border-gray-300 rounded-md'
                          }
                          onChange={e => {
                            const ageFromUnit = e.target.value;
                            onChange(ageFromUnit);
                            commentManagerStore.updateCommentManager({
                              ...commentManagerStore.commentManager,
                              ageFromUnit,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {lookupItems(
                            routerStore.lookupItems,
                            'AGE-FROM-UNIT',
                          ).map((item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ))}
                        </select>
                      </Form.InputWrapper>
                    )}
                    name='ageFromUnit'
                    rules={{required: false}}
                    defaultValue=''
                  />
                </div>

                <div className='grid grid-cols-2 gap-2'>
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Input
                        label='Age To'
                        type='number'
                        placeholder='Age To'
                        onChange={ageTo => {
                          onChange(ageTo);
                          commentManagerStore.updateCommentManager({
                            ...commentManagerStore.commentManager,
                            ageTo,
                          });
                        }}
                      />
                    )}
                    name='ageTo'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.InputWrapper label='Age To Unit'>
                        <select
                          value={value}
                          className={
                            'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2  border-gray-300 rounded-md'
                          }
                          onChange={e => {
                            const ageToUnit = e.target.value;
                            onChange(ageToUnit);
                            commentManagerStore.updateCommentManager({
                              ...commentManagerStore.commentManager,
                              ageToUnit,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {lookupItems(
                            routerStore.lookupItems,
                            'AGE-TO-UNIT',
                          ).map((item: any, index: number) => (
                            <option key={index} value={item.code}>
                              {lookupValue(item)}
                            </option>
                          ))}
                        </select>
                      </Form.InputWrapper>
                    )}
                    name='ageToUnit'
                    rules={{required: false}}
                    defaultValue=''
                  />
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Input
                        label='Low'
                        type='number'
                        placeholder='Low'
                        onChange={low => {
                          onChange(low);
                          commentManagerStore.updateCommentManager({
                            ...commentManagerStore.commentManager,
                            low,
                          });
                        }}
                      />
                    )}
                    name='low'
                    rules={{required: false}}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Form.Input
                        label='High'
                        type='number'
                        placeholder='High'
                        onChange={high => {
                          onChange(high);
                          commentManagerStore.updateCommentManager({
                            ...commentManagerStore.commentManager,
                            high,
                          });
                        }}
                      />
                    )}
                    name='high'
                    rules={{required: false}}
                    defaultValue=''
                  />
                </div>
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Form.Input
                      label='Alpha'
                      type='number'
                      placeholder='Alpha'
                      onChange={alpha => {
                        onChange(alpha);
                        commentManagerStore.updateCommentManager({
                          ...commentManagerStore.commentManager,
                          alpha,
                        });
                      }}
                    />
                  )}
                  name='alpha'
                  rules={{required: false}}
                  defaultValue=''
                />
              </List>
              <List direction='col' space={4} justify='stretch' fill>
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
                          commentManagerStore.updateCommentManager({
                            ...commentManagerStore.commentManager,
                            status,
                          });
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
                          commentManagerStore.updateCommentManager({
                            ...commentManagerStore.commentManager,
                            environment,
                          });
                        }}
                      >
                        <option selected>
                          {loginStore.login &&
                          loginStore.login.role !== 'SYSADMIN'
                            ? 'Select'
                            : commentManagerStore.commentManager?.environment ||
                              'Select'}
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
                onClick={handleSubmit(onSubmitCommentManager)}
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
                  setIsHideAddView(!isHideAddView);
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
                  setIsHideAddView(!isHideAddView);
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
export default CommentManager;
