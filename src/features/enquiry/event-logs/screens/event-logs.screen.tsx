import React, { useState } from 'react';
import { observer } from 'mobx-react';
import {
  Toast,
  Header,
  PageHeading,
  PageHeadingLabDetails,
  ModalConfirm,
} from '@/library/components';
import { EventLogsList } from '../components';
import { useForm } from 'react-hook-form';
import { useStores } from '@/stores';

import { RouterFlow } from '@/flows';
export const EventLogs = observer(() => {
  const { loginStore, eventLogsStore, routerStore } = useStores();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const [modalConfirm, setModalConfirm] = useState<any>();
  const [hideAddSection, setHideAddSection] = useState<boolean>(true);
  const [isImport, setIsImport] = useState<boolean>(false);
  const [arrImportRecords, setArrImportRecords] = useState<Array<any>>([]);

  return (
    <>
      <Header>
        <PageHeading title={routerStore.selectedComponents?.title || ''} />
        <PageHeadingLabDetails store={loginStore} />
      </Header>

      <div className=' mx-auto flex-wrap'>
        <div className={'p-2 rounded-lg shadow-xl shown'}>
          <div className='p-2 rounded-lg shadow-xl overflow-auto'>
            <EventLogsList
              data={eventLogsStore.eventLogsList || []}
              totalSize={eventLogsStore.eventLogsListCount}
              isDelete={RouterFlow.checkPermission(
                routerStore.userPermission,
                'Delete',
              )}
              isEditModify={RouterFlow.checkPermission(
                routerStore.userPermission,
                'Edit/Modify',
              )}
              // isEditModify={false}
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
              onUpdateItem={(value: any, dataField: string, id: string) => {
                setModalConfirm({
                  show: true,
                  type: 'Update',
                  data: { value, dataField, id },
                  title: 'Are you sure?',
                  body: 'Update Section!',
                });
              }}
              onPageSizeChange={(page, limit) => {
                //eventLogsStore.eventLogsService.filter(page, limit);
                global.filter = { mode: 'pagination', page, limit };
              }}
              onFilter={(type, filter, page, limit) => {
                // eventLogsStore.eventLogsService.filter({
                //   input: { type, filter, page, limit },
                // });
                // global.filter = {
                //   mode: 'filter',
                //   type,
                //   filter,
                //   page,
                //   limit,
                // };
              }}
            />
          </div>
          <ModalConfirm
            {...modalConfirm}
            click={(action: string) => {
              switch (action) {
                case 'Delete': {
                  eventLogsStore.eventLogsService
                    .deleteEventLogs({
                      input: { id: modalConfirm.id },
                    })
                    .then((res: any) => {
                      setModalConfirm({ show: false });
                      if (res.removeEventLog.success) {
                        Toast.success({
                          message: `😊 ${res.removeEventLog.message}`,
                        });
                        if (global?.filter?.mode == 'pagination')
                          return eventLogsStore.eventLogsService.listEventLogs(
                            global?.filter?.page,
                            global?.filter?.limit,
                          );
                        else if (global?.filter?.mode == 'filter') return;
                        eventLogsStore.eventLogsService.listEventLogs();
                      }
                    });
                  break;
                }
                // case 'Update': {
                //   EventLogs.EventLogsService.updateSingleFiled({
                //     input: {
                //       _id: modalConfirm.data.id,
                //       [modalConfirm.data.dataField]: modalConfirm.data.value,
                //     },
                //   }).then((res: any) => {
                //     setModalConfirm({ show: false });
                //     if (res.updateAdministrativeDivision.success) {
                //       Toast.success({
                //         message: `😊 ${res.updateAdministrativeDivision.message}`,
                //       });
                //       if (global?.filter?.mode == 'pagination')
                //         EventLogs.fetchAdministrativeDiv(
                //           global?.filter?.page,
                //           global?.filter?.limit,
                //         );
                //       else if (global?.filter?.mode == 'filter')
                //         EventLogs.EventLogsService.filter({
                //           input: {
                //             type: global?.filter?.type,
                //             filter: global?.filter?.filter,
                //             page: global?.filter?.page,
                //             limit: global?.filter?.limit,
                //           },
                //         });
                //       else EventLogs.fetchAdministrativeDiv();
                //     }
                //   });
                //   break;
                // }
              }
            }}
            close={() => setModalConfirm({ show: false })}
          />
        </div>
      </div>
    </>
  );
});
export default EventLogs;
