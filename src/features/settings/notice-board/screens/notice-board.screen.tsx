import React, { useState, useMemo, useEffect } from 'react';
import { observer } from 'mobx-react';
import {
  Buttons,
  Form,
  List,
  Grid,
  Svg,
  Toast,
  ModalConfirm,
  AutoCompleteFilterSingleSelect,
  MainPageHeading,
} from '@/library/components';
import { NoticeBoardsList } from '../components';
import '@/library/assets/css/accordion.css';
import { useForm, Controller } from 'react-hook-form';
import { NoticeBoardHoc } from '../hoc';
import { useStores } from '@/stores';
import _ from 'lodash';
import { RouterFlow } from '@/flows';
import { toJS } from 'mobx';
import { resetNoticeBoard } from '../startup';
import * as XLSX from 'xlsx';
import { lookupItems, lookupValue } from '@/library/utils';

const NoticeBoard = NoticeBoardHoc(
  observer(() => {
    const { loginStore, labStore, noticeBoardStore, routerStore, loading } =
      useStores();
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      reset,
    } = useForm();

    const [modalConfirm, setModalConfirm] = useState<any>();
    const [isHideView, setIsHideView] = useState<boolean>(true);
    const [isImport, setIsImport] = useState<boolean>(false);
    const [arrImportRecords, setArrImportRecords] = useState<Array<any>>([]);
    const [isExistsRecord, setIsExistsRecord] = useState(false);

    useEffect(() => {
      // Default value initialization
      setValue('lab', loginStore.login.lab);
      setValue('status', noticeBoardStore.noticeBoard?.status);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginStore.login, noticeBoardStore.noticeBoard]);

    const onNoticeBoardSubmit = async () => {
      if (!isExistsRecord) {
        const isExists = await checkExistsRecords();
        if (!isExists) {
          noticeBoardStore.NoticeBoardService.addNoticeBoard({
            input: {
              ...noticeBoardStore.noticeBoard,
            },
          }).then(res => {
            if (res.createNoticeBoard.success) {
              Toast.success({
                message: `😊 ${res.createNoticeBoard.message}`,
              });
              reset();
              resetNoticeBoard();
              setIsImport(false);
            }
          });
        } else {
          Toast.warning({
            message: '😔 Duplicate record found',
          });
        }
      } else {
        Toast.warning({
          message: '😔 Duplicate record found',
        });
      }
    };

    const tableView = useMemo(
      () => (
        <NoticeBoardsList
          data={noticeBoardStore.noticeBoardList || []}
          totalSize={noticeBoardStore.noticeBoardListCount}
          extraData={{
            listLabs: labStore.listLabs,
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
          onDelete={selectedUser => setModalConfirm(selectedUser)}
          onSelectedRow={rows => {
            setModalConfirm({
              show: true,
              type: 'Delete',
              id: rows,
              title: 'Are you sure?',
              body: 'Do you want to delete selected record?',
            });
          }}
          onUpdateItem={(value: any, dataField: string, id: string) => {
            setModalConfirm({
              show: true,
              type: 'Update',
              data: { value, dataField, id },
              title: 'Are you sure?',
              body: 'Do you want to update this record?',
            });
          }}
          onPageSizeChange={(page, limit) => {
            noticeBoardStore.fetchNoticeBoards(page, limit);
            global.filter = { mode: 'pagination', page, limit };
          }}
          onFilter={(type, filter, page, limit) => {
            noticeBoardStore.NoticeBoardService.filter({
              input: { type, filter, page, limit },
            });
            global.filter = { mode: 'filter', type, filter, page, limit };
          }}
          onApproval={async records => {
            const isExists = await checkExistsRecords({
              ...records,
              status: 'A',
            });
            if (!isExists) {
              setModalConfirm({
                show: true,
                type: 'Update',
                data: { value: 'A', dataField: 'status', id: records._id },
                title: 'Are you sure?',
                body: 'Do you want to update this record?',
              });
            }
          }}
        />
      ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [noticeBoardStore.noticeBoardList],
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
            lab: item.Labs,
            header: item.Header,
            message: item.Message,
            action: item.Action,
            environment: item.Environment,
            companyCode: item['Company Code'],
            status: 'D',
          };
        });
        setArrImportRecords(list);
      });
      reader.readAsBinaryString(file);
    };
    const checkExistsRecords = async (
      fields: any = noticeBoardStore.noticeBoard,
      isSingleCheck = false,
    ) => {
      const requiredFields = ['lab', 'header', 'action', 'status'];
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
      return noticeBoardStore.NoticeBoardService.findByFields({
        input: {
          filter: isSingleCheck
            ? { ...fields }
            : {
                ..._.pick({ ...fields }, requiredFields),
              },
        },
      }).then(res => {
        if (res.findByFieldsNoticeBoard?.success) {
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
    return (
      <>
        <MainPageHeading
          title={routerStore.selectedComponents?.title || ''}
          store={loginStore}
        />
        <div
          className='flex justify-end'
          style={{
            position: 'fixed',
            right: '30px',
            top: '135px',
            zIndex: 9999,
          }}
        >
          {RouterFlow.checkPermission(routerStore.userPermission, 'Add') && (
            <Buttons.ButtonCircleAddRemoveBottom
              show={isHideView}
              onClick={() => setIsHideView(!isHideView)}
            />
          )}
        </div>
        <div
          className={
            'p-2 rounded-lg shadow-xl ' + (isHideView ? 'hidden' : 'shown')
          }
        >
          <Grid cols={2}>
            <List direction='col' space={4} justify='stretch' fill>
              {labStore.listLabs && (
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Form.InputWrapper
                      label='Lab'
                      id='labs'
                      hasError={!!errors.lab}
                    >
                      <AutoCompleteFilterSingleSelect
                        loader={loading}
                        placeholder='Search by name'
                        disable={
                          loginStore.login &&
                          loginStore.login.role !== 'ADMINISTRATOR'
                            ? true
                            : false
                        }
                        data={{
                          list: labStore.listLabs,
                          displayKey: 'name',
                          findKey: 'name',
                        }}
                        // displayValue={value}
                        hasError={!!errors.name}
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
                          onChange(item.name);
                          noticeBoardStore.updateNoticeBoard({
                            ...noticeBoardStore.noticeBoard,
                            lab: item.code,
                          });
                          labStore.updateLabList(labStore.listLabsCopy);
                        }}
                      />
                    </Form.InputWrapper>
                  )}
                  name='lab'
                  rules={{ required: true }}
                  defaultValue=''
                />
              )}

              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Form.Input
                    label='Header'
                    name='lblHeader'
                    placeholder={
                      errors.header ? 'Please Enter Header' : 'Header'
                    }
                    hasError={!!errors.header}
                    value={value}
                    onChange={header => {
                      onChange(header);
                      noticeBoardStore.updateNoticeBoard({
                        ...noticeBoardStore.noticeBoard,
                        header,
                      });
                    }}
                  />
                )}
                name='header'
                rules={{ required: true }}
                defaultValue=''
              />
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Form.InputWrapper
                    label='Action'
                    id='lblAction'
                    hasError={!!errors.action}
                  >
                    <select
                      name='action'
                      value={value}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.action ? 'border-red' : 'border-gray-300'
                      } rounded-md`}
                      onChange={e => {
                        const action = e.target.value as 'login' | 'logout';
                        onChange(action);
                        noticeBoardStore.updateNoticeBoard({
                          ...noticeBoardStore.noticeBoard,
                          action,
                        });
                      }}
                    >
                      <option>Select</option>
                      {['login', 'logout'].map((item: any, index: number) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </Form.InputWrapper>
                )}
                name='action'
                rules={{ required: true }}
                defaultValue=''
              />
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Form.InputWrapper label='Status' hasError={!!errors.status}>
                    <select
                      value={value}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.status ? 'border-red  ' : 'border-gray-300'
                      } rounded-md`}
                      onChange={e => {
                        const status = e.target.value;
                        onChange(status);
                        noticeBoardStore.updateNoticeBoard({
                          ...noticeBoardStore.noticeBoard,
                          status,
                        });
                      }}
                    >
                      <option>Select</option>
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
                rules={{ required: false }}
                defaultValue=''
              />
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Form.MultilineInput
                    rows={7}
                    label='Message'
                    name='lblMessage'
                    hasError={!!errors.message}
                    placeholder={
                      errors.message ? 'Please Enter Message' : 'Message'
                    }
                    value={value}
                    onChange={message => {
                      onChange(message);
                      noticeBoardStore.updateNoticeBoard({
                        ...noticeBoardStore.noticeBoard,
                        message,
                      });
                    }}
                  />
                )}
                name='message'
                rules={{ required: false }}
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
              onClick={handleSubmit(onNoticeBoardSubmit)}
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
        <div
          className='p-2 rounded-lg shadow-xl overflow-scroll'
          style={{ overflowX: 'scroll' }}
        >
          {tableView}
        </div>
        <ModalConfirm
          {...modalConfirm}
          click={(action?: string) => {
            if (action === 'Delete') {
              noticeBoardStore.NoticeBoardService.deleteNoticeBoards({
                input: { id: modalConfirm.id },
              }).then((res: any) => {
                if (res.removeNoticeBoard.success) {
                  setModalConfirm({ show: false });
                  Toast.success({
                    message: `😊 ${res.removeNoticeBoard.message}`,
                  });
                  if (global?.filter?.mode == 'pagination')
                    noticeBoardStore.fetchNoticeBoards(
                      global?.filter?.page,
                      global?.filter?.limit,
                    );
                  else if (global?.filter?.mode == 'filter')
                    noticeBoardStore.NoticeBoardService.filter({
                      input: {
                        type: global?.filter?.type,
                        filter: global?.filter?.filter,
                        page: global?.filter?.page,
                        limit: global?.filter?.limit,
                      },
                    });
                  else noticeBoardStore.fetchNoticeBoards();
                }
              });
            } else if (action === 'Update') {
              noticeBoardStore.NoticeBoardService.updateSingleFiled({
                input: {
                  _id: modalConfirm.data.id,
                  [modalConfirm.data.dataField]: modalConfirm.data.value,
                },
              }).then((res: any) => {
                setModalConfirm({ show: false });
                if (res.updateNoticeBoard.success) {
                  Toast.success({
                    message: `😊 ${res.updateNoticeBoard.message}`,
                  });
                  if (global?.filter?.mode == 'pagination')
                    noticeBoardStore.fetchNoticeBoards(
                      global?.filter?.page,
                      global?.filter?.limit,
                    );
                  else if (global?.filter?.mode == 'filter')
                    noticeBoardStore.NoticeBoardService.filter({
                      input: {
                        type: global?.filter?.type,
                        filter: global?.filter?.filter,
                        page: global?.filter?.page,
                        limit: global?.filter?.limit,
                      },
                    });
                  else noticeBoardStore.fetchNoticeBoards();
                }
              });
            }
          }}
          onClose={() => setModalConfirm({ show: false })}
        />
      </>
    );
  }),
);
export default NoticeBoard;
