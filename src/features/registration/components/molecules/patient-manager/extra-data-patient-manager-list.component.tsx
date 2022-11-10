import React from 'react';
import {observer} from 'mobx-react';
import {
  TableBootstrap,
  textFilter,
  Form,
  Icons,
  Tooltip,
  Type,
} from '@/library/components';
import {Confirm} from '@/library/models';
import {lookupItems, lookupValue} from '@/library/utils';
import {
  AutoCompleteFilterSingleSelectCountry,
  AutoCompleteFilterSingleSelectCity,
  AutoCompleteFilterSingleSelectState,
  AutoCompleteFilterSingleSelectPostalCode,
} from '../../index';
interface ExtraDataPatientManagerProps {
  data: any;
  totalSize: number;
  extraData: any;
  isDelete?: boolean;
  isEditModify?: boolean;
  onDelete?: (selectedItem: Confirm) => void;
  onSelectedRow?: (selectedItem: any) => void;
  onUpdateItem?: (value: any, dataField: string, id: string) => void;
  onUpdateFileds?: (fileds: any, id: string) => void;
  onPageSizeChange?: (page: number, totalSize: number) => void;
  onFilter?: (
    type: string,
    filter: any,
    page: number,
    totalSize: number,
  ) => void;
}

let address;
let postCode;
let city;
let country;
let state;
let email;
let whatsappNumber;
let bloodGroup;
let followUp;
let comments;
let fyiLine;
let balance;
let enteredBy;
let status;
let environment;
export const ExtraDataPatientManagerList = observer(
  (props: ExtraDataPatientManagerProps) => {
    return (
      <>
        <div style={{position: 'relative'}}>
          <TableBootstrap
            id='_id'
            data={props.data}
            totalSize={props.totalSize}
            columns={[
              {
                dataField: '_id',
                text: 'Id',
                hidden: true,
                csvExport: false,
              },
              {
                dataField: 'postcode',
                text: 'PostCode',
                headerClasses: 'textHeader3',
                sort: true,
                csvFormatter: (col, row) =>
                  row.extraData?.postcode ? row.extraData?.postcode : '',
                filter: textFilter({
                  getFilter: filter => {
                    state = filter;
                  },
                }),
                formatter: (cell, row) => {
                  return <span>{row.extraData?.postcode}</span>;
                },
                editorRenderer: (
                  editorProps,
                  value,
                  row,
                  column,
                  rowIndex,
                  columnIndex,
                ) => (
                  <>
                    <AutoCompleteFilterSingleSelectPostalCode
                      onSelect={item => {
                        props.onUpdateFileds &&
                          props.onUpdateFileds(
                            {
                              ...item,
                            },
                            row._id,
                          );
                      }}
                    />
                  </>
                ),
              },
              {
                dataField: 'country',
                text: 'Country',
                headerClasses: 'textHeader3',
                sort: true,
                csvFormatter: (col, row) =>
                  row.extraData?.country ? row.extraData?.country : '',
                filter: textFilter({
                  getFilter: filter => {
                    address = filter;
                  },
                }),
                formatter: (cell, row) => {
                  return <span>{row.extraData.country}</span>;
                },
                editable: false,
              },
              {
                dataField: 'state',
                text: 'State',
                headerClasses: 'textHeader3',
                sort: true,
                csvFormatter: (col, row) =>
                  row.extraData?.state ? row.extraData.state : '',
                filter: textFilter({
                  getFilter: filter => {
                    postCode = filter;
                  },
                }),
                formatter: (cell, row) => {
                  return <span>{row.extraData.state}</span>;
                },
                editable: false,
              },
              {
                dataField: 'district',
                text: 'District',
                headerClasses: 'textHeader3',
                sort: true,
                csvFormatter: (col, row) =>
                  row.extraData?.district ? row.extraData.district : '',
                formatter: (cell, row) => {
                  return <span>{row.extraData.district}</span>;
                },
                editable: false,
              },
              {
                dataField: 'city',
                text: 'City',
                headerClasses: 'textHeader3',
                sort: true,
                csvFormatter: (col, row) =>
                  row.extraData?.city ? row.extraData?.city : '',
                filter: textFilter({
                  getFilter: filter => {
                    city = filter;
                  },
                }),
                formatter: (cell, row) => {
                  return <span>{row.extraData.city}</span>;
                },
                editable: false,
              },
              {
                dataField: 'area',
                text: 'Area',
                headerClasses: 'textHeader3',
                sort: true,
                csvFormatter: (col, row) =>
                  row.extraData?.area ? row.extraData?.area : '',
                formatter: (cell, row) => {
                  return <span>{row.extraData?.area}</span>;
                },
                editable: false,
              },
              {
                dataField: 'address',
                text: 'Address',
                headerClasses: 'textHeader3',
                sort: true,
                csvFormatter: (col, row) =>
                  row.extraData.address ? row.extraData.address : '',
                filter: textFilter({
                  getFilter: filter => {
                    country = filter;
                  },
                }),
                formatter: (cell, row) => {
                  return <span>{row.extraData.address}</span>;
                },
                editor: {
                  type: Type.TEXTAREA,
                },
              },

              {
                dataField: 'email',
                text: 'Email',
                headerClasses: 'textHeader3',
                sort: true,
                csvFormatter: (col, row) =>
                  row.extraData.email ? row.extraData.email : '',
                filter: textFilter({
                  getFilter: filter => {
                    email = filter;
                  },
                }),
                formatter: (cell, row) => {
                  return <span>{row.extraData.email}</span>;
                },
              },
              {
                dataField: 'isMobileAndWhatsApp',
                text: 'IsMobileAndWhatsapp',
                sort: true,
                csvFormatter: (col, row) =>
                  `${
                    row.isMobileAndWhatsApp
                      ? row.isMobileAndWhatsApp
                        ? 'Yes'
                        : 'No'
                      : 'No'
                  }`,
                formatter: (cell, row) => {
                  return (
                    <>
                      <Form.Toggle
                        value={row.extraData.isMobileAndWhatsApp}
                        onChange={isMobileAndWhatsApp => {
                          props.onUpdateItem &&
                            props.onUpdateItem(
                              isMobileAndWhatsApp,
                              'isMobileAndWhatsApp',
                              row._id,
                            );
                        }}
                      />
                    </>
                  );
                },
              },
              {
                dataField: 'confidental',
                text: 'Confidental',
                sort: true,
                csvFormatter: (col, row) =>
                  `${
                    row.confidental ? (row.confidental ? 'Yes' : 'No') : 'No'
                  }`,
                formatter: (cell, row) => {
                  return (
                    <>
                      <Form.Toggle
                        value={row.extraData.confidental}
                        onChange={confidental => {
                          props.onUpdateItem &&
                            props.onUpdateItem(
                              confidental,
                              'confidental',
                              row._id,
                            );
                        }}
                      />
                    </>
                  );
                },
              },
              {
                dataField: 'permanent',
                text: 'Permanent',
                sort: true,
                csvFormatter: (col, row) =>
                  `${row.permanent ? (row.permanent ? 'Yes' : 'No') : 'No'}`,
                formatter: (cell, row) => {
                  return (
                    <>
                      <Form.Toggle
                        value={row.extraData.permanent}
                        onChange={permanent => {
                          props.onUpdateItem &&
                            props.onUpdateItem(permanent, 'permanent', row._id);
                        }}
                      />
                    </>
                  );
                },
              },
              {
                dataField: 'photograph',
                text: 'PhotoGraph',
                csvExport: false,
                headerClasses: 'textHeader3',
                formatter: (cell, row) => {
                  return (
                    row.extraData.photograph && (
                      <div>
                        <div
                          style={{
                            background: `transparent url(${row.extraData.photograph}) no-repeat`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                          }}
                          className='object-cover h-20 w-20 rounded-md'
                        />
                      </div>
                    )
                  );
                },
              },
              {
                dataField: 'signature',
                text: 'Signature',
                csvExport: false,
                headerClasses: 'textHeader3',
                formatter: (cell, row) => {
                  return (
                    row.extraData.signature && (
                      <div>
                        <div
                          style={{
                            background: `transparent url(${row.extraData.signature}) no-repeat`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                          }}
                          className='object-cover h-20 w-20 rounded-md'
                        />
                      </div>
                    )
                  );
                },
              },
              {
                dataField: 'bloodGroup',
                text: 'BloodGroup',
                headerClasses: 'textHeader3',
                sort: true,
                csvFormatter: (col, row) =>
                  row.extraData.bloodGroup ? row.extraData.bloodGroup : '',
                filter: textFilter({
                  getFilter: filter => {
                    bloodGroup = filter;
                  },
                }),
                formatter: (cell, row) => {
                  return <span>{row.extraData.bloodGroup}</span>;
                },
              },
              {
                dataField: 'followUp',
                text: 'FollowUp',
                headerClasses: 'textHeader3',
                sort: true,
                csvFormatter: (col, row) =>
                  row.extraData.followUp ? row.extraData.followUp : '',
                filter: textFilter({
                  getFilter: filter => {
                    followUp = filter;
                  },
                }),
                formatter: (cell, row) => {
                  return <span>{row.extraData.followUp}</span>;
                },
              },
              {
                dataField: 'comments',
                text: 'Comments',
                headerClasses: 'textHeader3',
                sort: true,
                csvFormatter: (col, row) =>
                  row.extraData.comments ? row.extraData.comments : '',
                filter: textFilter({
                  getFilter: filter => {
                    comments = filter;
                  },
                }),
                formatter: (cell, row) => {
                  return <span>{row.extraData.comments}</span>;
                },
              },
              {
                dataField: 'fyiLine',
                text: 'FyiLine',
                headerClasses: 'textHeader3',
                sort: true,
                csvFormatter: (col, row) =>
                  row.extraData.fyiLine ? row.extraData.fyiLine : '',
                filter: textFilter({
                  getFilter: filter => {
                    fyiLine = filter;
                  },
                }),
                formatter: (cell, row) => {
                  return <span>{row.extraData.fyiLine}</span>;
                },
              },
              {
                dataField: 'balance',
                text: 'Balance',
                headerClasses: 'textHeader3',
                sort: true,
                csvFormatter: (col, row) =>
                  row.extraData.balance ? row.extraData.balance : '',
                filter: textFilter({
                  getFilter: filter => {
                    balance = filter;
                  },
                }),
                formatter: (cell, row) => {
                  return <span>{row.extraData.balance}</span>;
                },
              },
              {
                dataField: 'externalPid',
                text: 'External Pid',
                headerClasses: 'textHeader3',
                sort: true,
                csvFormatter: (col, row) =>
                  row.extraData?.externalPid ? row.extraData?.externalPid : '',
                formatter: (cell, row) => {
                  return <span>{row.extraData?.externalPid}</span>;
                },
                editable: false,
              },
              {
                dataField: 'diagnosis',
                text: 'Diagnosis',
                headerClasses: 'textHeader3',
                sort: true,
                csvFormatter: (col, row) =>
                  row.extraData?.diagnosis ? row.extraData?.diagnosis : '',
                formatter: (cell, row) => {
                  return <span>{row.extraData?.diagnosis}</span>;
                },
                editable: false,
              },
              {
                dataField: 'disease',
                text: 'Disease',
                headerClasses: 'textHeader3',
                sort: true,
                csvFormatter: (col, row) =>
                  row.extraData?.disease ? row.extraData?.disease : '',
                formatter: (cell, row) => {
                  return <span>{row.extraData?.disease}</span>;
                },
                editable: false,
              },
              {
                dataField: 'vip',
                text: 'VIP',
                sort: true,
                csvFormatter: (col, row) =>
                  `${
                    row.extraData?.vip
                      ? row.extraData?.vip
                        ? 'Yes'
                        : 'No'
                      : 'No'
                  }`,
                formatter: (cell, row) => {
                  return (
                    <>
                      <Form.Toggle
                        value={row.extraData.vip}
                        disabled={true}
                        onChange={vip => {
                          props.onUpdateItem &&
                            props.onUpdateItem(vip, 'vip', row._id);
                        }}
                      />
                    </>
                  );
                },
              },
              {
                dataField: 'enteredBy',
                text: 'Entered By',
                headerClasses: 'textHeader3',
                sort: true,
                csvFormatter: (col, row) =>
                  row.extraData.enteredBy ? row.extraData.enteredBy : '',
                filter: textFilter({
                  getFilter: filter => {
                    enteredBy = filter;
                  },
                }),
                formatter: (cell, row) => {
                  return <span>{row.extraData.enteredBy}</span>;
                },
                editable: false,
              },
              {
                dataField: 'status',
                text: 'Status',
                headerClasses: 'textHeader3',
                sort: true,
                csvFormatter: (col, row) =>
                  row.extraData.status ? row.extraData.status : '',
                filter: textFilter({
                  getFilter: filter => {
                    status = filter;
                  },
                }),
                formatter: (cell, row) => {
                  return <span>{row.extraData.status}</span>;
                },
                editorRenderer: (
                  editorProps,
                  value,
                  row,
                  column,
                  rowIndex,
                  columnIndex,
                ) => (
                  <>
                    <select
                      value={row.extraData?.status}
                      className={
                        'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md'
                      }
                      onChange={e => {
                        const status = e.target.value;
                        props.onUpdateItem &&
                          props.onUpdateItem(status, column.dataField, row._id);
                      }}
                    >
                      <option selected>Select</option>
                      {lookupItems(
                        props.extraData.lookupItems,
                        'PATIENT MANAGER - STATUS',
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      ))}
                    </select>
                  </>
                ),
              },
              {
                dataField: 'environment',
                text: 'Environment',
                headerClasses: 'textHeader3',
                sort: true,
                csvFormatter: (col, row) =>
                  row.extraData.environment ? row.extraData.environment : '',
                filter: textFilter({
                  getFilter: filter => {
                    environment = filter;
                  },
                }),
                formatter: (cell, row) => {
                  return <span>{row.extraData.environment}</span>;
                },
                editorRenderer: (
                  editorProps,
                  value,
                  row,
                  column,
                  rowIndex,
                  columnIndex,
                ) => (
                  <>
                    <select
                      value={row.extraData?.environment}
                      className={
                        'leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md'
                      }
                      onChange={e => {
                        const environment = e.target.value;
                        props.onUpdateItem &&
                          props.onUpdateItem(
                            environment,
                            column.dataField,
                            row._id,
                          );
                      }}
                    >
                      <option>Select</option>
                      {lookupItems(
                        props.extraData.lookupItems,
                        'PATIENT MANAGER - ENVIRONMENT',
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {lookupValue(item)}
                        </option>
                      ))}
                    </select>
                  </>
                ),
              },
              {
                dataField: 'opration',
                text: 'Action',
                editable: false,
                csvExport: false,
                hidden: !props.isDelete,
                formatter: (cellContent, row) => (
                  <>
                    <div className='flex flex-row'>
                      <Tooltip tooltipText='Delete'>
                        <Icons.IconContext
                          color='#fff'
                          size='20'
                          onClick={() =>
                            props.onDelete &&
                            props.onDelete({
                              type: 'delete',
                              show: true,
                              id: [row._id],
                              title: 'Are you sure?',
                              body: 'Delete record',
                            })
                          }
                        >
                          {Icons.getIconTag(Icons.IconBs.BsFillTrashFill)}
                        </Icons.IconContext>
                      </Tooltip>
                    </div>
                  </>
                ),
                headerClasses: 'sticky right-0  bg-gray-500 text-white z-50',
                classes: (cell, row, rowIndex, colIndex) => {
                  return 'sticky right-0 bg-gray-500';
                },
                style: (cell, row, rowIndex, colIndex) => {
                  return {
                    zIndex: props.data?.length - rowIndex,
                  };
                },
              },
            ]}
            isEditModify={props.isEditModify}
            isSelectRow={true}
            fileName='Patient Manager ExtraData'
            onSelectedRow={rows => {
              props.onSelectedRow &&
                props.onSelectedRow(rows.map((item: any) => item._id));
            }}
            onUpdateItem={(value: any, dataField: string, id: string) => {
              props.onUpdateItem && props.onUpdateItem(value, dataField, id);
            }}
            onPageSizeChange={(page, size) => {
              props.onPageSizeChange && props.onPageSizeChange(page, size);
            }}
            onFilter={(type, filter, page, size) => {
              props.onFilter && props.onFilter(type, filter, page, size);
            }}
            clearAllFilter={() => {
              address('');
              postCode('');
              city('');
              country('');
              state('');
              email('');
              bloodGroup('');
              followUp('');
              comments('');
              fyiLine('');
              balance('');
              enteredBy('');
              status('');
              environment('');
            }}
          />
        </div>
      </>
    );
  },
);
