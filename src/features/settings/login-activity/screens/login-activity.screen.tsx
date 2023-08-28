import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {
  Header,
  PageHeading,
  PageHeadingLabDetails,
  TableBootstrap,
  DateFilter,
  textFilter,
  customFilter,
  sortCaret,
} from '@/library/components';
import dayjs from 'dayjs';
import {useStores} from '@/stores';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

let userId;
let systemInfo;
let ipInfo;

const LoginActivity = observer(() => {
  const {loginStore, loginActivityStore, routerStore} = useStores();
  const [statusWiseFilter, setStatusWiseFilter] = useState({});

  useEffect(() => {
    loginActivityStore.fetchLoginActivity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header>
        <PageHeading title={routerStore.selectedComponents?.title || ''} />
        <PageHeadingLabDetails store={loginStore} />
      </Header>
      <div className='mx-auto  flex-wrap'>
        <div className='p-2 rounded-lg shadow-xl overflow-auto'>
          <div style={{position: 'relative'}}>
            <TableBootstrap
              id='_id'
              data={loginActivityStore.listLoginActivity || []}
              totalSize={loginActivityStore.listLoginActivityCount}
              columns={[
                {
                  dataField: '_id',
                  text: 'Id',
                  hidden: true,
                  csvExport: false,
                },
                {
                  dataField: 'userId',
                  text: 'User details',
                  sort: true,
                  headerStyle: {
                    fontSize: 0,
                  },
                  sortCaret: (order, column) => sortCaret(order, column),
                  csvFormatter: (cell, row, rowIndex) =>
                    `UserId: ${row.user.userId}, User Name: ${row.user.fullName},  Lab: ${row.user.lab}, Role: ${row.user.role}`,
                  filter: textFilter({
                    getFilter: filter => {
                      userId = filter;
                    },
                  }),
                  headerClasses: 'textHeader5',
                  editable: false,
                  formatter: (cell, row) => {
                    return (
                      <div>
                        <h6>{`UserId: ${row.user?.userId}`} </h6>
                        <h6>{`User Name: ${row.user?.fullName}`}</h6>
                        <h6>{`Lab: ${row.user?.lab}`}</h6>
                        <h6>{`Role: ${row.user?.role}`}</h6>
                      </div>
                    );
                  },
                },
                {
                  dataField: 'systemInfo',
                  text: 'System info',
                  sort: true,
                  headerStyle: {
                    fontSize: 0,
                  },
                  sortCaret: (order, column) => sortCaret(order, column),
                  filter: textFilter({
                    getFilter: filter => {
                      systemInfo = filter;
                    },
                  }),
                  csvFormatter: (cell, row, rowIndex) =>
                    `Device:${row.systemInfo.device}, OS, name:${row.systemInfo?.workstation?.os?.name},  version:${row.systemInfo?.workstation?.os?.version}, Browser,name: ${row.systemInfo?.workstation?.browser?.name}
                    version:${row.systemInfo?.workstation?.browser?.version}`,
                  headerClasses: 'textHeader5',
                  formatter: (cell, row) => {
                    return (
                      <div>
                        <h6>{`Device: ${row.systemInfo?.device}`} </h6>
                        <h6> OS:</h6>
                        <h6 className='ml-4'>
                          {`name: ${row.systemInfo?.workstation?.os?.name}
                                      version:${row.systemInfo?.workstation?.os?.version}`}
                        </h6>
                        <h6> Browser:</h6>
                        <h6 className='ml-4'>
                          {`name: ${row.systemInfo?.workstation?.browser?.name}
                                      version:${row.systemInfo?.workstation?.browser?.version}`}
                        </h6>
                      </div>
                    );
                  },
                },
                {
                  dataField: 'ipInfo',
                  text: 'Ip Information',
                  sort: true,
                  headerStyle: {
                    fontSize: 0,
                  },
                  sortCaret: (order, column) => sortCaret(order, column),
                  filter: textFilter({
                    getFilter: filter => {
                      ipInfo = filter;
                    },
                  }),
                  headerClasses: 'textHeader4',
                  csvFormatter: (cell, row, rowIndex) =>
                    `Ip:${row.systemInfo.ipInfo.ip}, Address:${row.systemInfo.ipInfo.city}, ${row.systemInfo.ipInfo.region}, ${row.systemInfo.ipInfo.country}, Location:${row.systemInfo.ipInfo.ll}`,
                  formatter: (cell, row) => {
                    return (
                      <>
                        <div>
                          <h6>Ip: {row.systemInfo?.ipInfo?.ip}</h6>
                          {row.systemInfo.ipInfo.city && (
                            <>
                              <h6>
                                Address:{' '}
                                {`${row.systemInfo.ipInfo.city}, ${row.systemInfo.ipInfo.region}, ${row.systemInfo.ipInfo.country}`}
                              </h6>
                              <h6>
                                Location: {`${row.systemInfo?.ipInfo?.ll}`}
                              </h6>
                            </>
                          )}
                        </div>
                      </>
                    );
                  },
                },
                {
                  dataField: 'dateOfEntry',
                  text: 'In',
                  headerClasses: 'textHeader11',
                  sort: true,
                  headerStyle: {
                    fontSize: 0,
                  },
                  sortCaret: (order, column) => sortCaret(order, column),
                  csvFormatter: (cell, row, rowIndex) =>
                    row.dateOfEntry
                      ? dayjs(row.dateOfEntry).format('YYYY-MM-DD h:mm:ss a')
                      : '',
                  filter: customFilter(),
                  filterRenderer: (onFilter, column) => (
                    <DateFilter onFilter={onFilter} column={column} />
                  ),
                  formatter: (cell, row) => {
                    return dayjs(
                      dayjs(row.dateOfEntry).format('YYYY-MM-DD h:mm:ss a'),
                    ).fromNow();
                  },
                },
                {
                  dataField: 'lastUpdated',
                  text: 'Out',
                  headerClasses: 'textHeader5',
                  sort: true,
                  headerStyle: {
                    fontSize: 0,
                  },
                  sortCaret: (order, column) => sortCaret(order, column),
                  csvFormatter: (cell, row, rowIndex) =>
                    row.lastUpdated
                      ? dayjs(row.lastUpdated).format('YYYY-MM-DD h:mm:ss a')
                      : '',
                  filter: customFilter(),
                  filterRenderer: (onFilter, column) => (
                    <>
                      <DateFilter
                        onFilter={onFilter}
                        column={column}
                        isStatus={true}
                        onStatus={status => {
                          const input = {
                            type: 'options-filter',
                            filter: {status},
                            page: 0,
                            limit: 10,
                          };
                          loginActivityStore.LoginActivityService.filter({
                            input,
                          });
                          setStatusWiseFilter({input});
                        }}
                      />
                    </>
                  ),
                  formatter: (cell, row) => {
                    return row.lastUpdated ? (
                      <>
                        {dayjs(
                          dayjs(row.lastUpdated).format('YYYY-MM-DD h:mm:ss a'),
                        ).fromNow()}
                      </>
                    ) : (
                      'Active User'
                    );
                  },
                },
              ]}
              onPageSizeChange={(page, size) => {
                if (_.isEmpty(statusWiseFilter)) {
                  loginActivityStore.fetchLoginActivity(page, size);
                } else {
                  loginActivityStore.fetchLoginActivity(
                    page,
                    size,
                    statusWiseFilter,
                  );
                }
              }}
              onFilter={(type, filter, page, limit) => {
                if (_.isEmpty(statusWiseFilter)) {
                  loginActivityStore.LoginActivityService.filter({
                    input: {type, filter, page, limit},
                  });
                } else {
                  loginActivityStore.LoginActivityService.filter({
                    ...statusWiseFilter,
                    page,
                    limit,
                  });
                }
              }}
              clearAllFilter={() => {
                userId('');
                systemInfo('');
                ipInfo('');
                setStatusWiseFilter({});
                setTimeout(() => {
                  loginActivityStore.fetchLoginActivity(0, 10);
                }, 2000);
              }}
              isEditModify={false}
              isSelectRow={false}
              fileName='Login Activity'
              dynamicStylingFields={[]}
              hideExcelSheet={['_id']}
            />
          </div>
        </div>
      </div>
    </>
  );
});

export default LoginActivity;
