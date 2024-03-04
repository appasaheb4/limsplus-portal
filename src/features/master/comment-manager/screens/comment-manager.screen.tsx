import React, { useState, useMemo, useEffect } from 'react';
import { observer } from 'mobx-react';
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
  MainPageHeading,
} from '@/library/components';
import { lookupItems, lookupValue } from '@/library/utils';
import {
  CommentManagerList,
  InvestigationDetails,
  InstType,
} from '../components';
import dayjs from 'dayjs';
import { useForm, Controller } from 'react-hook-form';
import { CommentManagerHoc } from '../hoc';
import { useStores } from '@/stores';
import { RouterFlow } from '@/flows';
import { toJS } from 'mobx';
import { FormHelper } from '@/helper';
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
    const [isVersionUpgrade, setIsVersionUpgrade] = useState<boolean>(false);

    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      reset,
      setError,
      clearErrors,
    } = useForm({ mode: 'all' });

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
      // setValue('environment', commentManagerStore.commentManager?.environment);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [commentManagerStore.commentManager]);

    const onSubmitCommentManager = async data => {
      if (!isExistsRecord) {
        if (!_.isEmpty(commentManagerStore.commentManager.existsRecordId)) {
          const isExists = await checkExistsRecord();
          if (isExists) {
            return;
          }
        }
        commentManagerStore.commentManagerService
          .create({
            input: isImport
              ? { isImport, arrImportRecords }
              : { isImport, ...commentManagerStore.commentManager },
          })
          .then(res => {
            if (res.createCommentManager.success) {
              commentManagerStore.commentManagerService.list();
              Toast.success({
                message: `😊 ${res.createCommentManager.message}`,
              });
              setIsHideAddView(!isHideAddView);
              setArrImportRecords([]);
              setIsImport(false);
              setIsVersionUpgrade(false);
            }
          });
      } else {
        return Toast.error({
          message: '😔 Already some record exists.',
        });
      }
    };

    const onUpdateSingleField = payload => {
      commentManagerStore.commentManagerService
        .update({
          input: {
            ...payload,
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
          isView={RouterFlow.checkPermission(
            routerStore.userPermission,
            'View',
          )}
          isDelete={RouterFlow.checkPermission(
            routerStore.userPermission,
            'Delete',
          )}
          isUpdate={RouterFlow.checkPermission(
            routerStore.userPermission,
            'Update',
          )}
          isExport={RouterFlow.checkPermission(
            routerStore.userPermission,
            'Export',
          )}
          isVersionUpgrade={RouterFlow.checkPermission(
            routerStore.userPermission,
            'Version Upgrade',
          )}
          isDuplicate={RouterFlow.checkPermission(
            routerStore.userPermission,
            'Duplicate',
          )}
          onDelete={selectedItem => setModalConfirm(selectedItem)}
          onSelectedRow={rows => {
            setModalConfirm({
              show: true,
              type: 'Delete',
              id: rows,
              title: 'Are you sure?',
              body: 'Do you want to delete selected record?',
            });
          }}
          onUpdateItem={(fields: any, id: string) => {
            setModalConfirm({
              show: true,
              type: 'Update',
              data: { fields, id },
              title: 'Are you sure?',
              body: 'Do you want to update this record?',
            });
          }}
          onVersionUpgrade={item => {
            setModalConfirm({
              show: true,
              type: 'versionUpgrade',
              data: item,
              title: 'Are you sure?',
              body: 'Do you want to upgrade version for this record?',
            });
          }}
          onDuplicate={item => {
            setModalConfirm({
              show: true,
              type: 'duplicate',
              data: item,
              title: 'Are you sure?',
              body: 'Do you want to Do you want to duplicate this record?',
            });
          }}
          onPageSizeChange={(page, limit) => {
            commentManagerStore.commentManagerService.list(page, limit);
            global.filter = { mode: 'pagination', page, limit };
          }}
          onFilter={(type, filter, page, limit) => {
            commentManagerStore.commentManagerService.filter({
              input: { type, filter, page, limit },
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
                data: { fields: { status: 'A' }, id: records._id },
                title: 'Are you sure?',
                body: 'Do you want to update this record?',
              });
            }
          }}
          onSingleDirectUpdateField={(value, dataField, id) => {
            onUpdateSingleField({
              _id: id,
              [dataField]: value,
            });
          }}
          isHideAddView={isHideAddView}
          setIsHideAddView={setIsHideAddView}
        />
      ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [commentManagerStore.commentManagerList, isHideAddView],
    );

    const handleFileUpload = (file: any) => {
      const reader = new FileReader();
      reader.addEventListener('load', (evt: any) => {
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws, { raw: true });
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
            versions: item.Versions,
            environment: item?.Environment,
            companyCode: item['Company Code'],
            status: 'D',
          };
        });
        setArrImportRecords(list);
      });
      reader.readAsBinaryString(file);
    };

    const checkExistsRecord = async (
      fields = commentManagerStore.commentManager as any,
      isSingleCheck = false,
    ) => {
      const requiredFields = [
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
      ];
      const isEmpty = requiredFields.find(item => {
        if (_.isEmpty({ ...fields }[item])) return item;
      });
      if (isEmpty && !isSingleCheck) {
        Toast.error({
          message: `😔 Required ${isEmpty} value missing. Please enter correct value`,
        });
        return true;
      }
      //Pass required Field in Array
      return commentManagerStore.commentManagerService
        .findByFields({
          input: {
            filter: isSingleCheck
              ? { ...fields }
              : {
                  ..._.pick({ ...fields }, requiredFields),
                },
          },
        })
        .then(res => {
          if (res.findByFieldsCommentManger?.success) {
            setIsExistsRecord(true);
            Toast.error({
              message: '😔 Already some record exists.',
            });
            return true;
          } else {
            setIsExistsRecord(false);
            return false;
          }
        });
    };

    const commentForValueRender = () => {
      const commentType = commentManagerStore.commentManager.commentsType;
      switch (commentType) {
        case 'Normal': {
          return lookupItems(routerStore.lookupItems, 'COMMENTS_FOR')
            .filter(item => item.value === 'All')
            .map((item: any, index: number) => (
              <option key={index} value={item.code}>
                {lookupValue(item)}
              </option>
            ));
        }
        case 'Status': {
          return lookupItems(routerStore.lookupItems, 'COMMENTS_FOR')
            .filter(
              item =>
                item.value === 'Abnormal' ||
                item.value === 'Normal' ||
                item.value === 'Critical',
            )
            .map((item: any, index: number) => (
              <option key={index} value={item.code}>
                {lookupValue(item)}
              </option>
            ));
        }
        case 'Results': {
          return lookupItems(routerStore.lookupItems, 'COMMENTS_FOR')
            .filter(item => item.value === 'Value' || item.value === 'Alpha')
            .map((item: any, index: number) => (
              <option key={index} value={item.code}>
                {lookupValue(item)}
              </option>
            ));
        }
        default:
          break;
      }
    };

    return (
      <>
        <MainPageHeading
          title={routerStore.selectedComponents?.title || ''}
          store={loginStore}
        />

        <div className='mx-auto flex-wrap'>
          <div
            className={
              'p-2 rounded-lg shadow-xl ' + (isHideAddView ? 'hidden' : 'shown')
            }
          >
            <ManualImportTabs
              isImportDisable={
                !RouterFlow.checkPermission(
                  toJS(routerStore.userPermission),
                  'Import',
                )
              }
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
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper
                        label='Library Code'
                        hasError={!!errors.libraryCode}
                      >
                        <AutoCompleteFilterSingleSelectMultiFieldsDisplay
                          loader={loading}
                          disable={isVersionUpgrade}
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
                            checkExistsRecord(
                              {
                                libraryCode: item.libraryCode,
                                lab: commentManagerStore.commentManager?.lab,
                                department:
                                  commentManagerStore.commentManager
                                    ?.department,
                                investigationType:
                                  commentManagerStore.commentManager
                                    ?.investigationType,
                                investigationCode:
                                  commentManagerStore.commentManager
                                    ?.investigationCode,
                                investigationName:
                                  commentManagerStore.commentManager
                                    ?.investigationName,
                                species:
                                  commentManagerStore.commentManager?.species,
                                sex: commentManagerStore.commentManager?.sex,
                                instType:
                                  commentManagerStore.commentManager?.instType,
                                commentsType:
                                  commentManagerStore.commentManager
                                    ?.commentsType,
                                commentsFor:
                                  commentManagerStore.commentManager
                                    ?.commentsFor,
                                status:
                                  commentManagerStore.commentManager?.status,
                              },
                              true,
                            );
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
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper label='Lab' hasError={!!errors.lab}>
                        <select
                          value={value}
                          disabled={isVersionUpgrade}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.lab ? 'border-red  ' : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const lab = e.target.value;
                            onChange(lab);
                            checkExistsRecord(
                              {
                                libraryCode:
                                  commentManagerStore.commentManager
                                    .libraryCode,
                                lab: commentManagerStore.commentManager?.lab,
                                department:
                                  commentManagerStore.commentManager
                                    ?.department,
                                investigationType:
                                  commentManagerStore.commentManager
                                    ?.investigationType,
                                investigationCode:
                                  commentManagerStore.commentManager
                                    ?.investigationCode,
                                investigationName:
                                  commentManagerStore.commentManager
                                    ?.investigationName,
                                species:
                                  commentManagerStore.commentManager?.species,
                                sex: commentManagerStore.commentManager?.sex,
                                instType:
                                  commentManagerStore.commentManager?.instType,
                                commentsType:
                                  commentManagerStore.commentManager
                                    ?.commentsType,
                                commentsFor:
                                  commentManagerStore.commentManager
                                    ?.commentsFor,
                                status:
                                  commentManagerStore.commentManager?.status,
                              },
                              true,
                            );
                            commentManagerStore.updateCommentManager({
                              ...commentManagerStore.commentManager,
                              lab,
                            });
                            // fetch department list
                            departmentStore.DepartmentService.findByFields({
                              input: { filter: { lab } },
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
                          {[{ code: 'Default' }]
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
                    rules={{ required: true }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper
                        label='Department'
                        hasError={!!errors.department}
                      >
                        <select
                          value={value}
                          disabled={isVersionUpgrade}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.department
                              ? 'border-red  '
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const department = e.target.value;
                            onChange(department);
                            checkExistsRecord(
                              {
                                libraryCode:
                                  commentManagerStore.commentManager
                                    .libraryCode,
                                lab: commentManagerStore.commentManager?.lab,
                                department,
                                investigationType:
                                  commentManagerStore.commentManager
                                    ?.investigationType,
                                investigationCode:
                                  commentManagerStore.commentManager
                                    ?.investigationCode,
                                investigationName:
                                  commentManagerStore.commentManager
                                    ?.investigationName,
                                species:
                                  commentManagerStore.commentManager?.species,
                                sex: commentManagerStore.commentManager?.sex,
                                instType:
                                  commentManagerStore.commentManager?.instType,
                                commentsType:
                                  commentManagerStore.commentManager
                                    ?.commentsType,
                                commentsFor:
                                  commentManagerStore.commentManager
                                    ?.commentsFor,
                                status:
                                  commentManagerStore.commentManager?.status,
                              },
                              true,
                            );
                            commentManagerStore.updateCommentManager({
                              ...commentManagerStore.commentManager,
                              department,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {[{ name: '', code: 'Default' }]
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
                    rules={{ required: true }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper
                        label='Investigation Type'
                        hasError={!!errors.investigationType}
                      >
                        <select
                          value={value}
                          disabled={isVersionUpgrade}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.investigationType
                              ? 'border-red  '
                              : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const investigationType = e.target.value;
                            onChange(investigationType);
                            checkExistsRecord(
                              {
                                libraryCode:
                                  commentManagerStore.commentManager
                                    .libraryCode,
                                lab: commentManagerStore.commentManager?.lab,
                                department:
                                  commentManagerStore.commentManager
                                    ?.department,
                                investigationType,
                                investigationCode:
                                  commentManagerStore.commentManager
                                    ?.investigationCode,
                                investigationName:
                                  commentManagerStore.commentManager
                                    ?.investigationName,
                                species:
                                  commentManagerStore.commentManager?.species,
                                sex: commentManagerStore.commentManager?.sex,
                                instType:
                                  commentManagerStore.commentManager?.instType,
                                commentsType:
                                  commentManagerStore.commentManager
                                    ?.commentsType,
                                commentsFor:
                                  commentManagerStore.commentManager
                                    ?.commentsFor,
                                status:
                                  commentManagerStore.commentManager?.status,
                              },
                              true,
                            );
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
                    rules={{ required: true }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper
                        label='Investigation Code'
                        hasError={!!errors.investigationCode}
                      >
                        <InvestigationDetails
                          displayValue={
                            commentManagerStore.commentManager.investigationCode
                          }
                          investigationType={
                            commentManagerStore.commentManager.investigationType
                          }
                          disable={isVersionUpgrade}
                          isError={!!errors.investigationCode}
                          onSelect={items => {
                            onChange(items.investigationCode);
                            setValue(
                              'investigationName',
                              items.investigationName,
                            );
                            checkExistsRecord(
                              {
                                libraryCode:
                                  commentManagerStore.commentManager
                                    .libraryCode,
                                lab: commentManagerStore.commentManager?.lab,
                                department:
                                  commentManagerStore.commentManager
                                    ?.department,
                                investigationType:
                                  commentManagerStore.commentManager
                                    ?.investigationType,
                                investigationCode: items.investigationCode,
                                investigationName: items.investigationName,
                                species:
                                  commentManagerStore.commentManager?.species,
                                sex: commentManagerStore.commentManager?.sex,
                                instType:
                                  commentManagerStore.commentManager?.instType,
                                commentsType:
                                  commentManagerStore.commentManager
                                    ?.commentsType,
                                commentsFor:
                                  commentManagerStore.commentManager
                                    ?.commentsFor,
                                status:
                                  commentManagerStore.commentManager?.status,
                              },
                              true,
                            );
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
                    rules={{ required: true }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
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
                    rules={{ required: false }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
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
                            checkExistsRecord(
                              {
                                libraryCode:
                                  commentManagerStore.commentManager
                                    .libraryCode,
                                lab: commentManagerStore.commentManager?.lab,
                                department:
                                  commentManagerStore.commentManager
                                    ?.department,
                                investigationType:
                                  commentManagerStore.commentManager
                                    ?.investigationType,
                                investigationCode:
                                  commentManagerStore.commentManager
                                    ?.investigationCode,
                                investigationName:
                                  commentManagerStore.commentManager
                                    ?.investigationName,
                                species,
                                sex: commentManagerStore.commentManager?.sex,
                                instType:
                                  commentManagerStore.commentManager?.instType,
                                commentsType:
                                  commentManagerStore.commentManager
                                    ?.commentsType,
                                commentsFor:
                                  commentManagerStore.commentManager
                                    ?.commentsFor,
                                status:
                                  commentManagerStore.commentManager?.status,
                              },
                              true,
                            );
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
                    rules={{ required: true }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper label='Sex' hasError={!!errors.sex}>
                        <select
                          value={value}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.sex ? 'border-red  ' : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const sex = e.target.value;
                            onChange(sex);
                            checkExistsRecord(
                              {
                                libraryCode:
                                  commentManagerStore.commentManager
                                    .libraryCode,
                                lab: commentManagerStore.commentManager?.lab,
                                department:
                                  commentManagerStore.commentManager
                                    ?.department,
                                investigationType:
                                  commentManagerStore.commentManager
                                    ?.investigationType,
                                investigationCode:
                                  commentManagerStore.commentManager
                                    ?.investigationCode,
                                investigationName:
                                  commentManagerStore.commentManager
                                    ?.investigationName,
                                species:
                                  commentManagerStore.commentManager?.species,
                                sex,
                                instType:
                                  commentManagerStore.commentManager?.instType,
                                commentsType:
                                  commentManagerStore.commentManager
                                    ?.commentsType,
                                commentsFor:
                                  commentManagerStore.commentManager
                                    ?.commentsFor,
                                status:
                                  commentManagerStore.commentManager?.status,
                              },
                              true,
                            );
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
                    rules={{ required: true }}
                    defaultValue=''
                  />
                </List>
                <List direction='col' space={4} justify='stretch' fill>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper
                        label='Inst Type'
                        hasError={!!errors.instType}
                      >
                        <InstType
                          hasError={!!errors.instType}
                          onSelect={instType => {
                            onChange(instType);
                            checkExistsRecord(
                              {
                                libraryCode:
                                  commentManagerStore.commentManager
                                    .libraryCode,
                                lab: commentManagerStore.commentManager?.lab,
                                department:
                                  commentManagerStore.commentManager
                                    ?.department,
                                investigationType:
                                  commentManagerStore.commentManager
                                    ?.investigationType,
                                investigationCode:
                                  commentManagerStore.commentManager
                                    ?.investigationCode,
                                investigationName:
                                  commentManagerStore.commentManager
                                    ?.investigationName,
                                species:
                                  commentManagerStore.commentManager?.species,
                                sex: commentManagerStore.commentManager?.sex,
                                instType:
                                  commentManagerStore.commentManager?.instType,
                                commentsType:
                                  commentManagerStore.commentManager
                                    .commentsType,
                                commentsFor:
                                  commentManagerStore.commentManager
                                    ?.commentsFor,
                                status:
                                  commentManagerStore.commentManager?.status,
                              },
                              true,
                            );
                            commentManagerStore.updateCommentManager({
                              ...commentManagerStore.commentManager,
                              instType,
                            });
                          }}
                        />
                      </Form.InputWrapper>
                    )}
                    name='instType'
                    rules={{ required: false }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
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
                            checkExistsRecord(
                              {
                                libraryCode:
                                  commentManagerStore.commentManager
                                    .libraryCode,
                                lab: commentManagerStore.commentManager?.lab,
                                department:
                                  commentManagerStore.commentManager
                                    ?.department,
                                investigationType:
                                  commentManagerStore.commentManager
                                    ?.investigationType,
                                investigationCode:
                                  commentManagerStore.commentManager
                                    ?.investigationCode,
                                investigationName:
                                  commentManagerStore.commentManager
                                    ?.investigationName,
                                species:
                                  commentManagerStore.commentManager?.species,
                                sex: commentManagerStore.commentManager?.sex,
                                instType:
                                  commentManagerStore.commentManager?.instType,
                                commentsType,
                                commentsFor:
                                  commentManagerStore.commentManager
                                    ?.commentsFor,
                                status:
                                  commentManagerStore.commentManager?.status,
                              },
                              true,
                            );
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
                    rules={{ required: true }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
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
                            checkExistsRecord(
                              {
                                libraryCode:
                                  commentManagerStore.commentManager
                                    .libraryCode,
                                lab: commentManagerStore.commentManager?.lab,
                                department:
                                  commentManagerStore.commentManager
                                    ?.department,
                                investigationType:
                                  commentManagerStore.commentManager
                                    ?.investigationType,
                                investigationCode:
                                  commentManagerStore.commentManager
                                    ?.investigationCode,
                                investigationName:
                                  commentManagerStore.commentManager
                                    ?.investigationName,
                                species:
                                  commentManagerStore.commentManager?.species,
                                sex: commentManagerStore.commentManager?.sex,
                                instType:
                                  commentManagerStore.commentManager?.instType,
                                commentsType:
                                  commentManagerStore.commentManager
                                    ?.commentsType,
                                commentsFor,
                                status:
                                  commentManagerStore.commentManager?.status,
                              },
                              true,
                            );
                            commentManagerStore.updateCommentManager({
                              ...commentManagerStore.commentManager,
                              commentsFor,
                            });
                          }}
                        >
                          <option selected>Select</option>
                          {commentForValueRender()}
                        </select>
                      </Form.InputWrapper>
                    )}
                    name='commentsFor'
                    rules={{ required: true }}
                    defaultValue=''
                  />

                  {commentManagerStore.commentManager.commentsType !==
                    'Results' &&
                  commentManagerStore.commentManager.commentsFor !== 'Value' &&
                  commentManagerStore.commentManager.commentsFor !==
                    'Alpha' ? null : (
                    <>
                      {commentManagerStore.commentManager.commentsType ==
                        'Results' &&
                        commentManagerStore.commentManager.commentsFor ==
                          'Value' && (
                          <>
                            <div className='grid grid-cols-2 gap-2'>
                              <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
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
                                rules={{ required: false }}
                                defaultValue=''
                              />
                              <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
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
                                rules={{ required: false }}
                                defaultValue=''
                              />
                            </div>

                            <div className='grid grid-cols-2 gap-2'>
                              <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
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
                                rules={{ required: false }}
                                defaultValue=''
                              />
                              <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
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
                                rules={{ required: false }}
                                defaultValue=''
                              />
                            </div>
                            <div className='grid grid-cols-2 gap-2'>
                              <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
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
                                        setError('low', { type: 'onBlur' });
                                        Toast.warning({
                                          message:
                                            '😔 Only > and < sign and numbers should be allowed',
                                        });
                                      }
                                    }}
                                  />
                                )}
                                name='low'
                                rules={{ required: false }}
                                defaultValue=''
                              />
                              <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
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
                                        setError('high', { type: 'onBlur' });
                                        Toast.warning({
                                          message:
                                            '😔 Only > and < sign and numbers should be allowed',
                                        });
                                      }
                                    }}
                                  />
                                )}
                                name='high'
                                rules={{ required: false }}
                                defaultValue=''
                              />
                            </div>
                          </>
                        )}
                      {commentManagerStore.commentManager.commentsType ==
                        'Results' &&
                        commentManagerStore.commentManager.commentsFor ==
                          'Alpha' && (
                          <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
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
                            rules={{ required: false }}
                            defaultValue=''
                          />
                        )}
                    </>
                  )}
                </List>
                <List direction='col' space={4} justify='stretch' fill>
                  {/* <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <AutoCompleteCompanyList
                        hasError={!!errors.companyCode}
                        onSelect={companyCode => {
                          onChange(companyCode);
                          commentManagerStore.updateCommentManager({
                            ...commentManagerStore.commentManager,
                            companyCode,
                          });
                        }}
                      />
                    )}
                    name='companyCode'
                    rules={{ required: true }}
                    defaultValue=''
                  /> */}
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Form.InputWrapper
                        label='Status'
                        hasError={!!errors.status}
                      >
                        <select
                          value={value}
                          disabled={isVersionUpgrade}
                          className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                            errors.status ? 'border-red  ' : 'border-gray-300'
                          } rounded-md`}
                          onChange={e => {
                            const status = e.target.value;
                            onChange(status);
                            checkExistsRecord(
                              {
                                libraryCode:
                                  commentManagerStore.commentManager
                                    .libraryCode,
                                lab: commentManagerStore.commentManager?.lab,
                                department:
                                  commentManagerStore.commentManager
                                    ?.department,
                                investigationType:
                                  commentManagerStore.commentManager
                                    ?.investigationType,
                                investigationCode:
                                  commentManagerStore.commentManager
                                    ?.investigationCode,
                                investigationName:
                                  commentManagerStore.commentManager
                                    ?.investigationName,
                                species:
                                  commentManagerStore.commentManager?.species,
                                sex: commentManagerStore.commentManager?.sex,
                                instType:
                                  commentManagerStore.commentManager?.instType,
                                commentsType:
                                  commentManagerStore.commentManager
                                    ?.commentsType,
                                commentsFor:
                                  commentManagerStore.commentManager
                                    ?.commentsFor,
                                status,
                              },
                              true,
                            );
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
                    rules={{ required: true }}
                    defaultValue=''
                  />

                  <Controller
                    control={control}
                    render={({ field: { value } }) => (
                      <Form.Input
                        label='Enter By'
                        disabled
                        hasError={!!errors.enteredBy}
                        value={value}
                      />
                    )}
                    name='enteredBy'
                    rules={{ required: false }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { value } }) => (
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
                    rules={{ required: false }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { value } }) => (
                      <Form.Input
                        label='Date Expiry'
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
                    rules={{ required: false }}
                    defaultValue=''
                  />
                  <Controller
                    control={control}
                    render={({ field: { value } }) => (
                      <Form.Input label='Versions' disabled value={value} />
                    )}
                    name='versions'
                    rules={{ required: false }}
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
              setModalConfirm({ show: false });
              switch (action) {
                case 'Delete': {
                  commentManagerStore.commentManagerService
                    .delete({ input: { id: modalConfirm.id } })
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
                  onUpdateSingleField({
                    ...modalConfirm.data.fields,
                    _id: modalConfirm.data.id,
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
                    dateCreation: new Date(),
                    dateActive: new Date(),
                    dateExpire: new Date(
                      dayjs(new Date())
                        .add(365, 'days')
                        .format('YYYY-MM-DD hh:mm:ss'),
                    ),
                  });
                  setIsHideAddView(!isHideAddView);
                  setIsVersionUpgrade(true);
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
                    versions: 1,
                    investigationCode: modalConfirm.data.investigationCode,
                    investigationName: modalConfirm.data.investigationName,
                    dateCreation: new Date(),
                    dateActive: new Date(),
                    dateExpire: new Date(
                      dayjs(new Date())
                        .add(365, 'days')
                        .format('YYYY-MM-DD hh:mm:ss'),
                    ),
                  });
                  setIsHideAddView(!isHideAddView);
                  break;
                }
              }
            }}
            onClose={() => {
              setModalConfirm({ show: false });
            }}
          />
        </div>
      </>
    );
  }),
);
export default CommentManager;
