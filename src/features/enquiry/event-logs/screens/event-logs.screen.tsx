import React, { useState, useEffect } from 'react';
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

import * as Realm from 'realm-web';

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

  const reloadEventLog = async () => {
    const appId = 'limsplus-portal-prod-fezny';
    const appConfig = {
      id: appId,
      timeout: 100_000,
    };
    const app: any = new Realm.App(appConfig);
    const credentials = Realm.Credentials.anonymous();
    await app.logIn(credentials);
    const mongodb = app.currentUser.mongoClient('mongodb-atlas');
    const collection = mongodb.db('limsplus-prod').collection('eventlogs');
    for await (const change of collection.watch()) {
      if (
        change?.operationType == 'insert' &&
        window.location.pathname === '/enquiry/event-log'
      ) {
        eventLogsStore.eventLogsService.listEventLogs();
      }
    }
  };

  useEffect(() => {
    if (window.location.pathname === '/enquiry/event-log') reloadEventLog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                'Update',
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
                eventLogsStore.eventLogsService.listEventLogs(page, limit);
                global.filter = { mode: 'pagination', page, limit };
              }}
              onFilter={(type, filter, page, limit) => {
                eventLogsStore.eventLogsService.filter({
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
                        // else if (global?.filter?.mode == 'filter') return;
                        eventLogsStore.eventLogsService.listEventLogs();
                      }
                    });
                  break;
                }
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
