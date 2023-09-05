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
  AutoCompleteFilterSingleSelectMultiFieldsDisplay,
  ManualImportTabs,
  StaticInputTable,
  ImportFile,
} from '@/library/components';
import {lookupItems, lookupValue} from '@/library/utils';
import {
  CommentManagerList,
  InvestigationDetails,
  InstType,
} from '../components';
import dayjs from 'dayjs';

import {useForm, Controller} from 'react-hook-form';
import {CommentManagerHoc} from '../hoc';
import {useStores} from '@/stores';
import {RouterFlow} from '@/flows';
import {toJS} from 'mobx';
import {FormHelper} from '@/helper';
import * as XLSX from 'xlsx';
const CommentManager = CommentManagerHoc(
  observer(() => {
    const {
      loginStore,
      libraryStore,
      departmentStore,
      lookupStore,
      routerStore,
      commentManagerStore,
      loading,
    } = useStores();
    const [modalConfirm, setModalConfirm] = useState<any>();
    const [isHideAddView, setIsHideAddView] = useState<boolean>(true);
    const [departmentList, setDepartmentList] = useState([]);
    const [isExistsRecord, setIsExistsRecord] = useState(false);
    const [isImport, setIsImport] = useState<boolean>(false);
    const [arrImportRecords, setArrImportRecords] = useState<Array<any>>([]);
    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
      reset,
      setError,
      clearErrors,
    } = useForm({mode: 'all'});

    useEffect(() => {
      // Default value initialization\
      setValue('libraryCode', commentManagerStore.commentManager?.libraryCode);
      setValue('lab', commentManagerStore.commentManager?.lab);
      setValue('department', commentManagerStore.commentManager?.department);
      setValue(
        'investigationType',
        commentManagerStore.commentManager?.investigationType,
      );
      setValue(
        'investigationCode',
        commentManagerStore.commentManager?.investigationCode,
      );
      setValue(
        'investigationName',
        commentManagerStore.commentManager?.investigationName,
      );
      setValue('species', commentManagerStore.commentManager?.species);
      setValue('sex', commentManagerStore.commentManager?.sex);
      setValue('instType', commentManagerStore.commentManager?.instType);
      setValue(
        'commentsType',
        commentManagerStore.commentManager?.commentsType,
      );
      setValue('commentsFor', commentManagerStore.commentManager?.commentsFor);
      setValue('ageFromUnit', commentManagerStore.commentManager?.ageFromUnit);
      setValue('ageFrom', commentManagerStore.commentManager?.ageFrom);
      setValue('ageToUnit', commentManagerStore.commentManager?.ageToUnit);
      setValue('ageTo', commentManagerStore.commentManager?.ageTo);
      setValue('low', commentManagerStore.commentManager?.low);
      setValue('high', commentManagerStore.commentManager?.high);
      setValue('alpha', commentManagerStore.commentManager?.alpha);
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
        commentManagerStore.commentManagerService
          .create({
            input: isImport
              ? {isImport, arrImportRecords}
              : {isImport, ...commentManagerStore.commentManager},
          })
          .then(res => {
            if (res.createCommentManager.success) {
              commentManagerStore.commentManagerService.list();
              Toast.success({
                message: `😊 ${res.createCommentManager.message}`,
              });
              setIsHideAddView(!isHideAddView);
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
        <CommentManagerList
          data={commentManagerStore.commentManagerList || []}
          totalSize={commentManagerStore.commentManagerListCount}
          extraData={{
            loginDetails: loginStore.login,
            listLookup: lookupStore.listLookup,
            listDepartment: departmentStore.listDepartment,
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
            commentManagerStore.commentManagerService.list(page, limit);
            global.filter = {mode: 'pagination', page, limit};
          }}
          onFilter={(type, filter, page, limit) => {
            commentManagerStore.commentManagerService.filter({
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
          onApproval={async records => {
            const isExists = await checkExistsRecord(records);
            if (!isExists) {
              setModalConfirm({
                show: true,
                type: 'Update',
                data: {value: 'A', dataField: 'status', id: records._id},
                title: 'Are you sure?',
                body: 'Update Comment Manager!',
              });
            }
          }}
        />
      ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [commentManagerStore.commentManagerList],
    );

    const checkExistsRecords = filed => {
      commentManagerStore.commentManagerService
        .findByFields({
          input: {
            filter: {
              ..._.pick(commentManagerStore.commentManager, [
                'libraryCode',
                'lab',
                'department',
                'investigationType',
                'investigationCode',
                'species',
                'sex',
                'instType',
                'commentsType',
                'commentsFor',
                'status',
                'versions',
                'environment',
              ]),
              ...filed,
            },
          },
        })
        .then(res => {
          if (res.findByFieldsCommentManger?.success) {
            setIsExistsRecord(true);
            Toast.error({
              message: '😔 Already some record exists.',
            });
          }
        });
    };

    const handleFileUpload = (file: any) => {
      const reader = new FileReader();
      reader.addEventListener('load', (evt: any) => {
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, {type: 'binary'});
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws, {raw: true});
        const list = data.map((item: any) => {
          return {
            code: item.Code,
            libraryCode: item['Library Code'],
            lab: item.Lab,
            department: item.Department,
            investigationType: item['Investigation Type'],
            investigationCode: item['Investigation Code'],
            investigationName: item['Investigation Name'],
            species: item.Species,
            sex: item.Sex,
            instType: item['Inst Type'],
            commentsType: item['Comments Type'],
            commentsFor: item['Comments For'],
            ageFrom: item['Age From'],
            ageFromUnit: item['Age From Unit'],
            ageTo: item['Age To'],
            ageToUnit: item['Age To Unit'],
            low: item.Low,
            high: item.High,
            alpha: item.Alpha,
            enteredBy: loginStore.login.userId,
            dateCreation: new Date(),
            dateActive: new Date(),
            dateExpire: new Date(
              dayjs(new Date()).add(365, 'days').format('YYYY-MM-DD hh:mm:ss'),
            ),
            version: item.Version,
            environment: item?.Environment,
            status: 'D',
          };
        });
        setArrImportRecords(list);
      });
      reader.readAsBinaryString(file);
    };

    const checkExistsRecord = async (
      fields = commentManagerStore.commentManager,
      length = 0,
      status = 'A',
    ) => {
      //Pass required Field in Array
      return commentManagerStore.commentManagerService
        .findByFields({
          input: {
            filter: {
              ..._.pick({...fields, status}, [
                'libraryCode',
                'lab',
                'department',
                'investigationType',
                'investigationCode',
                'species',
                'sex',
                'instType',
                'commentsType',
                'commentsFor',
                'status',
                'environment',
              ]),
            },
          },
        })
        .then(res => {
          if (
            res.findByFieldsCommentManger?.success &&
            res.findByFieldsCommentManger.data?.length > length
          ) {
            //setIsExistsRecord(true);
            Toast.error({
              message: '😔 Already some record exists.',
            });
            return true;
          } else return false;
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
            <ManualImportTabs
              isImport={isImport}
              onClick={flag => {
                setIsImport(flag);
              }}
            />
            {!isImport ? (
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
                            list: _.uniqBy(
                              libraryStore.listLibrary?.filter(item => {
                                if (item.status == 'A') return item;
                              }),
                              'libraryCode',
                            ),
                            displayKey: ['code', 'libraryCode'],
                          }}
                          placeholder='Search by library code'
                          displayValue={value}
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
                            checkExistsRecords({
                              libraryCode: item.libraryCode,
                            });
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
                            checkExistsRecords({
                              lab,
                            });
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
                            errors.department
                              ? 'border-red  '
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const department = e.target.value;
                            onChange(department);
                            checkExistsRecords({
                              department,
                            });
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
                            checkExistsRecords({
                              investigationType,
                            });
                            commentManagerStore.updateCommentManager({
                              ...commentManagerStore.commentManager,
                              investigationType,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {lookupItems(
                            routerStore.lookupItems,
                            'INVESTIGATION_TYPE',
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
                        <InvestigationDetails
                          investigationType={
                            commentManagerStore.commentManager.investigationType
                          }
                          isError={!!errors.investigationCode}
                          onSelect={items => {
                            onChange(items.investigationCode);
                            setValue(
                              'investigationName',
                              items.investigationName,
                            );
                            checkExistsRecords({
                              investigationCode: items.investigationCode,
                            });
                            commentManagerStore.updateCommentManager({
                              ...commentManagerStore.commentManager,
                              investigationCode: items.investigationCode,
                              investigationName: items.investigationName,
                            });
                          }}
                        />
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
                        <Form.Input
                          value={value}
                          disabled
                          placeholder='Investigation Name'
                        />
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
                            checkExistsRecords({
                              species,
                            });
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
                            checkExistsRecords({
                              sex,
                            });
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
                        <InstType
                          hasError={!!errors.instType}
                          onSelect={instType => {
                            onChange(instType);
                            checkExistsRecords({
                              instType,
                            });
                            commentManagerStore.updateCommentManager({
                              ...commentManagerStore.commentManager,
                              instType,
                            });
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name='instType'
                    rules={{required: false}}
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
                            checkExistsRecords({
                              commentsType,
                            });
                            commentManagerStore.updateCommentManager({
                              ...commentManagerStore.commentManager,
                              commentsType,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {lookupItems(
                            routerStore.lookupItems,
                            'COMMENTS_TYPE',
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
                            checkExistsRecords({
                              commentsFor,
                            });
                            commentManagerStore.updateCommentManager({
                              ...commentManagerStore.commentManager,
                              commentsFor,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {lookupItems(
                            routerStore.lookupItems,
                            'COMMENTS_FOR',
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

                  {commentManagerStore.commentManager.commentsType !==
                    'RESULTS' &&
                  commentManagerStore.commentManager.commentsFor !== 'VALUE' &&
                  commentManagerStore.commentManager.commentsFor !==
                    'ALPHA' ? null : (
                    <>
                      {commentManagerStore.commentManager.commentsType ==
                        'RESULTS' &&
                        commentManagerStore.commentManager.commentsFor ==
                          'VALUE' && (
                          <>
                            <div className='grid grid-cols-2 gap-2'>
                              <Controller
                                control={control}
                                render={({field: {onChange, value}}) => (
                                  <Form.Input
                                    label='Age From'
                                    type='number'
                                    placeholder='Age From'
                                    value={value?.toString()}
                                    onChange={ageFrom => {
                                      onChange(ageFrom);
                                      commentManagerStore.updateCommentManager({
                                        ...commentManagerStore.commentManager,
                                        ageFrom: Number.parseFloat(ageFrom),
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
                                        commentManagerStore.updateCommentManager(
                                          {
                                            ...commentManagerStore.commentManager,
                                            ageFromUnit,
                                          },
                                        );
                                      }}
                                    >
                                      <option selected>Select</option>
                                      {lookupItems(
                                        routerStore.lookupItems,
                                        'AGE_FROM_UNIT',
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
                                    value={value?.toString()}
                                    onChange={ageTo => {
                                      onChange(ageTo);
                                      commentManagerStore.updateCommentManager({
                                        ...commentManagerStore.commentManager,
                                        ageTo: Number.parseFloat(ageTo),
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
                                        commentManagerStore.updateCommentManager(
                                          {
                                            ...commentManagerStore.commentManager,
                                            ageToUnit,
                                          },
                                        );
                                      }}
                                    >
                                      <option selected>Select</option>
                                      {lookupItems(
                                        routerStore.lookupItems,
                                        'AGE_TO_UNIT',
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
                                    placeholder='Low'
                                    hasError={!!errors.low}
                                    value={value}
                                    onChange={low => {
                                      const regex = new RegExp(
                                        /^[0-9<>=\\-`.+,/"]*$/,
                                      );
                                      if (
                                        regex.test(low) &&
                                        FormHelper.isNumberAvailable(low)
                                      ) {
                                        clearErrors('low');

                                        onChange(low);
                                        commentManagerStore.updateCommentManager(
                                          {
                                            ...commentManagerStore.commentManager,
                                            low,
                                          },
                                        );
                                      } else {
                                        setError('low', {type: 'onBlur'});
                                        Toast.warning({
                                          message:
                                            '😔 Only > and < sign and numbers should be allowed',
                                        });
                                      }
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
                                    placeholder='High'
                                    hasError={!!errors.high}
                                    onChange={high => {
                                      const regex = new RegExp(
                                        /^[0-9<>=\\-`.+,/"]*$/,
                                      );
                                      if (
                                        regex.test(high) &&
                                        FormHelper.isNumberAvailable(high)
                                      ) {
                                        clearErrors('high');

                                        onChange(high);
                                        commentManagerStore.updateCommentManager(
                                          {
                                            ...commentManagerStore.commentManager,
                                            high,
                                          },
                                        );
                                      } else {
                                        setError('high', {type: 'onBlur'});
                                        Toast.warning({
                                          message:
                                            '😔 Only > and < sign and numbers should be allowed',
                                        });
                                      }
                                    }}
                                  />
                                )}
                                name='high'
                                rules={{required: false}}
                                defaultValue=''
                              />
                            </div>
                          </>
                        )}
                      {commentManagerStore.commentManager.commentsType ==
                        'RESULTS' &&
                        commentManagerStore.commentManager.commentsFor ==
                          'ALPHA' && (
                          <Controller
                            control={control}
                            render={({field: {onChange, value}}) => (
                              <Form.Input
                                label='Alpha'
                                type='number'
                                placeholder='Alpha'
                                value={value?.toString()}
                                onChange={alpha => {
                                  onChange(alpha);
                                  commentManagerStore.updateCommentManager({
                                    ...commentManagerStore.commentManager,
                                    alpha: Number.parseFloat(alpha),
                                  });
                                }}
                              />
                            )}
                            name='alpha'
                            rules={{required: false}}
                            defaultValue=''
                          />
                        )}
                    </>
                  )}
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
                            checkExistsRecords({
                              status,
                            });
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
                                ?.toString()
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
                                ?.toString()
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
                            checkExistsRecords({
                              environment,
                            });
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
                              : commentManagerStore.commentManager
                                  ?.environment || 'Select'}
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
            ) : (
              <>
                {arrImportRecords?.length > 0 ? (
                  <StaticInputTable data={arrImportRecords} />
                ) : (
                  <ImportFile
                    onClick={file => {
                      handleFileUpload(file[0]);
                    }}
                  />
                )}
              </>
            )}
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
                  commentManagerStore.commentManagerService
                    .delete({input: {id: modalConfirm.id}})
                    .then((res: any) => {
                      if (res.removeCommentManager.success) {
                        Toast.success({
                          message: `😊 ${res.removeCommentManager.message}`,
                        });
                        commentManagerStore.commentManagerService.list();
                        // if (global?.filter?.mode == 'pagination')
                        //   libraryStore.fetchLibrary(
                        //     global?.filter?.page,
                        //     global?.filter?.limit,
                        //   );
                        // else if (global?.filter?.mode == 'filter')
                        //   libraryStore.libraryService.filter({
                        //     input: {
                        //       type: global?.filter?.type,
                        //       filter: global?.filter?.filter,
                        //       page: global?.filter?.page,
                        //       limit: global?.filter?.limit,
                        //     },
                        //   });
                        // else libraryStore.fetchLibrary();
                      }
                    });
                  break;
                }
                case 'Update': {
                  commentManagerStore.commentManagerService
                    .update({
                      input: {
                        ...modalConfirm.data.fields,
                        _id: modalConfirm.data.id,
                      },
                    })
                    .then((res: any) => {
                      if (res.updateCommentManager.success) {
                        Toast.success({
                          message: `😊 ${res.updateCommentManager.message}`,
                        });
                        commentManagerStore.commentManagerService.list();
                        // if (global?.filter?.mode == 'pagination')
                        //   libraryStore.fetchLibrary(
                        //     global?.filter?.page,
                        //     global?.filter?.limit,
                        //   );
                        // else if (global?.filter?.mode == 'filter')
                        //   libraryStore.libraryService.filter({
                        //     input: {
                        //       type: global?.filter?.type,
                        //       filter: global?.filter?.filter,
                        //       page: global?.filter?.page,
                        //       limit: global?.filter?.limit,
                        //     },
                        //   });
                        // else libraryStore.fetchLibrary();
                      }
                    });
                  break;
                }
                case 'versionUpgrade': {
                  commentManagerStore.updateCommentManager({
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
                  commentManagerStore.updateCommentManager({
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
