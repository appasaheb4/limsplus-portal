import React, {useState, useMemo} from 'react';
import {observer} from 'mobx-react';
import {
  Header,
  PageHeading,
  PageHeadingLabDetails,
  Buttons,
  Form,
  List,
  Grid,
  Svg,
  Toast,
  ModalConfirm,
  AutoCompleteFilterSingleSelect,
} from '@/library/components';
import {NoticeBoardsList} from '../components';
import '@/library/assets/css/accordion.css';
import {useForm, Controller} from 'react-hook-form';
import {NoticeBoardHoc} from '../hoc';
import {useStores} from '@/stores';

import {RouterFlow} from '@/flows';
import {toJS} from 'mobx';
import {resetNoticeBoard} from '../startup';

const NoticeBoard = NoticeBoardHoc(
  observer(() => {
    const {loginStore, labStore, noticeBoardStore, routerStore, loading} =
      useStores();
    const {
      control,
      handleSubmit,
      formState: {errors},
      setValue,
      reset,
    } = useForm();
    setValue('lab', loginStore.login.lab);
    const [modalConfirm, setModalConfirm] = useState<any>();
    const onNoticeBoardSubmit = () => {
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
        } else {
          Toast.warning({
            message: '😔 Notice not create.Please try again',
          });
        }
      });
    };

    const tableView = useMemo(
      () => (
        <NoticeBoardsList
          data={noticeBoardStore.noticeBoardList || []}
          totalSize={noticeBoardStore.noticeBoardListCount}
          extraData={{
            listLabs: labStore.listLabs,
          }}
          isDelete={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
            'Delete',
          )}
          isEditModify={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
            'Edit/Modify',
          )}
          onDelete={selectedUser => setModalConfirm(selectedUser)}
          onSelectedRow={rows => {
            setModalConfirm({
              show: true,
              type: 'Delete',
              id: rows,
              title: 'Are you sure?',
              body: 'Delete selected items!',
            });
          }}
          onUpdateItem={(value: any, dataField: string, id: string) => {
            setModalConfirm({
              show: true,
              type: 'Update',
              data: {value, dataField, id},
              title: 'Are you sure?',
              body: 'Update recoard!',
            });
          }}
          onPageSizeChange={(page, limit) => {
            noticeBoardStore.fetchNoticeBoards(page, limit);
            global.filter = {mode: 'pagination', page, limit};
          }}
          onFilter={(type, filter, page, limit) => {
            noticeBoardStore.NoticeBoardService.filter({
              input: {type, filter, page, limit},
            });
            global.filter = {mode: 'filter', type, filter, page, limit};
          }}
        />
      ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [noticeBoardStore.noticeBoardList],
    );

    return (
      <>
        <Header>
          <PageHeading title={routerStore.selectedComponents?.title || ''} />
          <PageHeadingLabDetails store={loginStore} />
        </Header>
        <div className='p-2 rounded-lg shadow-xl'>
          <Grid cols={2}>
            <List direction='col' space={4} justify='stretch' fill>
              {labStore.listLabs && (
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
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
                          loginStore.login.role !== 'SYSADMIN'
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
                  rules={{required: true}}
                  defaultValue=''
                />
              )}

              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
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
                rules={{required: true}}
                defaultValue=''
              />
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
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
                      <option selected>Select</option>
                      {['login', 'logout'].map((item: any, index: number) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </Form.InputWrapper>
                )}
                name='action'
                rules={{required: true}}
                defaultValue=''
              />
            </List>
            <List direction='col' space={4} justify='stretch' fill>
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
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
                rules={{required: false}}
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
          style={{overflowX: 'scroll'}}
        >
          {tableView}
        </div>

        <ModalConfirm
          {...modalConfirm}
          click={(action?: string) => {
            if (action === 'Delete') {
              noticeBoardStore.NoticeBoardService.deleteNoticeBoards({
                input: {id: modalConfirm.id},
              }).then((res: any) => {
                if (res.removeNoticeBoard.success) {
                  setModalConfirm({show: false});
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
                setModalConfirm({show: false});
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
          onClose={() => setModalConfirm({show: false})}
        />
      </>
    );
  }),
);
export default NoticeBoard;
